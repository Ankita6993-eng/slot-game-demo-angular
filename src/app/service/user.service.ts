import { Injectable } from '@angular/core';
import {Modal} from '../modal/Modal';


import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

   register(user: Modal) {
        return this.http.post(`/users/register`, user);
    }
}
