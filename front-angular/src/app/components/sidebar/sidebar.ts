import { CommonModule } from '@angular/common';
import { Component, ChangeDetectorRef } from '@angular/core';
import { ConversationService, Conversation } from '../../services/conversation';

@Component({
  selector:'app-sidebar',
  imports:[CommonModule],
  templateUrl:'./sidebar.html',
  styleUrl:'./sidebar.scss',
})
export class Sidebar {

  discussions:Conversation[]=[];
  menuOuvert:Conversation|null = null;

  constructor(
    private conversationService:ConversationService,
    private cd:ChangeDetectorRef
  ){

    this.conversationService.conversations$
    .subscribe(conversations=>{

      console.log("Sidebar reçoit :", conversations);

      this.discussions = conversations;

      this.cd.detectChanges();

    });

  }


  nouvelleDiscussion(){

    this.conversationService.nouvelleConversation();

  }


  selectionnerDiscussion(discussion:Conversation){

    this.conversationService.changerConversation(discussion);

  }

  ouvrirMenu(event:MouseEvent, discussion:Conversation){

      event.stopPropagation();

      if(this.menuOuvert === discussion){

        this.menuOuvert = null;

      }else{

        this.menuOuvert = discussion;

      }

  }

  supprimerDiscussion(event:MouseEvent, discussion:Conversation){

    event.stopPropagation();

    console.log("Suppression demandée :", discussion);
    console.log("ID Mongo :", discussion._id);


    this.conversationService
    .supprimerConversation(discussion._id!)
    .subscribe({

    next:()=>{

      console.log("Supprimée");


      // Enlever la conversation affichée dans le chat
      this.conversationService.changerConversation(null);


      // Recharger la liste depuis MongoDB
      this.conversationService.chargerConversations();


      this.menuOuvert=null;

    },

      error:(err)=>{

        console.error(err);

      }

    });

  }

}