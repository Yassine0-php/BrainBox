import {
  Component,
  ChangeDetectorRef,
  ElementRef,
  ViewChild
} from '@angular/core';
import { Message } from '../message/message';
import { AssistantService } from '../../services/assistant';
import { FormsModule } from '@angular/forms';
import { ConversationService } from '../../services/conversation';
import { Subscription } from 'rxjs';

interface ChatMessage {
  auteur: string;
  contenu: string;
  type: "user" | "ia";
}

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    Message,
    FormsModule
  ],
  templateUrl: './chat.html',
  styleUrl: './chat.scss'
})
export class ChatComponent {

  @ViewChild('messagesContainer')
  messagesContainer!: ElementRef<HTMLDivElement>;

  subscription!: Subscription;

  question = "";
  enCours = false;

 messages: ChatMessage[] = [];

  constructor(
    private assistantService: AssistantService,
    private conversationService: ConversationService,
    private cd: ChangeDetectorRef
  ) {
        this.subscription =
      this.conversationService.conversationActive$
      .subscribe(conversation => {


        
        if(conversation){

          this.messages = conversation.messages;

          this.cd.detectChanges();
          this.scrollVersLeBas();

        }
        


      });
    }

  sauvegarderMessages(){

    const conversation =
    this.conversationService.getConversationActive();


    if(conversation){

      conversation.messages = this.messages;
      this.conversationService
      .sauvegarderConversation(conversation)
      .subscribe();

    }

  }

  envoyer() {

    if (this.enCours || this.question.trim() === "") {
      return;
    }

    this.enCours = true;

    const questionEnvoyee = this.question;

    this.messages.push({
      auteur: "Utilisateur",
      contenu: questionEnvoyee,
      type: "user"
    });
    this.sauvegarderMessages();

    const conversation =this.conversationService.getConversationActive();


    if(conversation){

      this.conversationService.mettreAJourTitre(
        conversation,
        questionEnvoyee
      );

    }

    this.question = "";

    const messageAttente: ChatMessage = {
      auteur: "BrainBox",
      contenu: "Réflexion en cours...",
      type: "ia"
    };

    this.messages.push(messageAttente);

    this.cd.detectChanges();
    this.scrollVersLeBas();

    const timer = "Temps IA " + Date.now();
    console.time(timer);

    this.assistantService
      .envoyerQuestion(questionEnvoyee)
      .subscribe({

        next: (response) => {

          console.timeEnd(timer);
          console.log("Réponse complète :", response);

          const index = this.messages.indexOf(messageAttente);

          if (index !== -1) {

            this.messages[index].contenu = "";
            this.sauvegarderMessages();
            if (response.reponse) {

              this.afficherProgressivement(
                response.reponse,
                this.messages[index]
              );

            

            } else {

              this.messages[index].contenu =
                "Aucune réponse reçue.";

              this.enCours = false;

            }

          }

          this.cd.detectChanges();
          this.scrollVersLeBas();

        },

        error: (err: any) => {

          console.error(err);

          this.enCours = false;

          const index = this.messages.indexOf(messageAttente);

          if (index !== -1) {

            this.messages[index].contenu =
              "Une erreur est survenue.";

          }

          this.cd.detectChanges();

        }

      });
      

  }

    afficherProgressivement(
        texte: string,
        message: ChatMessage
        ) {

      let index = 0;

      const interval = setInterval(() => {

        message.contenu += texte.charAt(index);

        index++;

        this.cd.detectChanges();
        this.scrollVersLeBas();


        if(index >= texte.length){

          clearInterval(interval);

          this.enCours = false;
          
          this.sauvegarderMessages();
          this.cd.detectChanges();

        }

      }, 30);

    }

    private scrollVersLeBas() {

      setTimeout(() => {

        const element = this.messagesContainer?.nativeElement;

        if (element) {

          element.scrollTop = element.scrollHeight;

        }

      });

    }

    arreter() {

      this.enCours = false;

    }
  

}