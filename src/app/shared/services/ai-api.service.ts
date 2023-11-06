import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import AiRequest from '../_interfaces/airequest.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AiApiService {
  API_AI =
    'https://ai.abchub.com.br/api/v1/prediction/4fb106ee-5214-4616-a7b1-3b48a9e5770d';

  constructor(private http: HttpClient) {}

  send(body: AiRequest) {
    return this.http.post(this.API_AI, body) as Observable<any>;
  }
}
