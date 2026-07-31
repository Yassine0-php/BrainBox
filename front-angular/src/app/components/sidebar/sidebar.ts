import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConversationService,Conversation } from '../../services/conversation';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {

  discussions:Conversation[]=[];

    constructor(
  private conversationService: ConversationService
  ){
       this.conversationService.chargerConversations();

      this.conversationService.conversations$
      .subscribe(conversations=>{

        this.discussions = conversations;

      });

    }


  nouvelleDiscussion(){

    this.conversationService.nouvelleConversation();

  }


  
  
  selectionnerDiscussion(discussion:any){

    this.conversationService.changerConversation(discussion);

  }


}