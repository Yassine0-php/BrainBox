import { ChatComponent } from './components/chat/chat';
import { Sidebar } from './components/sidebar/sidebar';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [
    ChatComponent,
    Sidebar
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

}