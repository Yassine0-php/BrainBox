import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true,
  imports: [],
  templateUrl: './message.html',
  styleUrl: './message.scss'
})
export class Message {

  @Input() auteur = "";

  @Input() contenu = "";
  @Input() type: string = "TEST";

}