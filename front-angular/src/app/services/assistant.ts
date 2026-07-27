import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AssistantService {


  private apiUrl = "http://localhost:3000/api/assistant/question";


  constructor(private http: HttpClient) {}


  envoyerQuestion(question: string) {

    return this.http.post<any>(
      this.apiUrl,
      {
        question: question
      }
    );

  }


}