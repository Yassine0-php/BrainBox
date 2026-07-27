import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ConversationService } from '../../services/conversation';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar {


  constructor(
    private conversationService: ConversationService
  ){}


  nouvelleDiscussion(){

    this.conversationService.nouvelleConversation();

  }


  get discussions(){

    return this.conversationService.getConversations();

  }


}