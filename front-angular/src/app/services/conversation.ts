import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Conversation {
  _id?:string;
  id:number;
  titre:string;
  messages:any[];
}

@Injectable({
  providedIn:'root'
})
export class ConversationService {

  private apiUrl="http://localhost:3000/api/conversations";

  private conversations:Conversation[]=[];

  

  private conversationsSubject =
  new BehaviorSubject<Conversation[]>([]);

  private conversationActiveSubject =
    new BehaviorSubject<Conversation>({
      id: 0,
      titre: "Nouvelle discussion",
      messages: []
    });
  
  conversationActive$ =
    this.conversationActiveSubject.asObservable();

  conversations$ =
  this.conversationsSubject.asObservable();

  constructor(
    private http:HttpClient
  ){
    this.chargerConversations();
  }

  chargerConversations(){

    this.http
    .get<Conversation[]>(this.apiUrl)
    .subscribe(conversations=>{

      console.log("Conversations reçues :", conversations);

      this.conversations=conversations;
      this.conversationsSubject.next(conversations);

      console.log("Tableau interne :", this.conversations);
      if(conversations.length > 0){

        this.conversationActiveSubject.next(conversations[0]);

      } else {
        this.conversationActiveSubject.next({
          id: 0,
          titre: "Nouvelle discussion",
          messages: []
        });
      }

    });

  }

  nouvelleConversation(){

    const nouvelle:Conversation={
      id:Date.now(),
      titre:"Nouvelle discussion",
      messages:[]
    };

    this.http
    .post<Conversation>(
      this.apiUrl,
      nouvelle
    )
    .subscribe(conversation=>{

      this.conversations.unshift(conversation);

      this.conversationsSubject.next(
        this.conversations
      );

      this.conversationActiveSubject.next(
        conversation
      );

    });

  }

  sauvegarderConversation(conversation:Conversation){

    return this.http.put<Conversation>(
      `${this.apiUrl}/${conversation.id}`,
      conversation
    );

  }

  getConversations(){

    return this.conversations;

  }

  getConversationActive(){

    return this.conversationActiveSubject.value;

  }

  changerConversation(conversation: Conversation | null){

    this.conversationActiveSubject.next(
      conversation ?? {
        id: 0,
        titre: "Nouvelle discussion",
        messages: []
      }
    );

  }

  mettreAJourTitre(
    conversation:Conversation,
    message:string
  ){

    if(conversation.titre==="Nouvelle discussion"){

      conversation.titre=message.substring(0,30);

      this.conversations=[...this.conversations];

    }

  }

  supprimerConversation(id:string){

      return this.http.delete(
        `${this.apiUrl}/${id}`
      );

  }
}