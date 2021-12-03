import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Env } from '../../types';
import { ENV } from '../../env.provider';

@Injectable()
export class SessionsService {
  private readonly sessionsEndpoint = `${this.env.apiUrl}/sessions`;

  constructor(@Inject(ENV) private readonly  env: Env, private readonly httpClient: HttpClient) {}

  createSid(): Observable<string> {
    return this.httpClient.post(this.sessionsEndpoint, null, { responseType: 'text' });
  }
}
