import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface Conversation {
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
  new BehaviorSubject<Conversation|null>(null);

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

      this.conversations=conversations;
      this.conversationsSubject.next(conversations);

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

      this.conversationActiveSubject.next(conversation);
      this.conversationsSubject.next(this.conversations);

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

  changerConversation(conversation:Conversation){

    this.conversationActiveSubject.next(conversation);

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

}