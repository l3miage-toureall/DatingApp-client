import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/member';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;


  constructor(private http :HttpClient) { }

  getMembers(){
    return this.http.get<Member[]>(this.baseUrl+ 'users');
  }

  getMember(username : string){
    return this.http.get<Member>(this.baseUrl+ 'users/' + username);
  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'user', member);
  }
  /*getHttpOptions(){
    const userSting = localStorage.getItem('user');
    if(!userSting) return;
    const user = JSON.parse(userSting);
    return{
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + user.token

      })
    }
  }*/
}
