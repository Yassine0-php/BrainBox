import { Injectable } from '@angular/core';

export interface Conversation {
  id:number;
  titre:string;
  messages:any[];
}

@Injectable({
  providedIn:'root'
})
export class ConversationService {

  conversations:Conversation[] = [];
  conversationActive:Conversation|null = null;

  nouvelleConversation(){

    const nouvelle:Conversation = {
      id:Date.now(),
      titre:"Nouvelle discussion",
      messages:[]
    };

    this.conversations.unshift(nouvelle);
    this.conversationActive = nouvelle;
  }

  getConversations(){
    return this.conversations;
  }

  getConversationActive(){
    return this.conversationActive;
  }

}