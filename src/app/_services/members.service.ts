import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/member';
import { PaginationResult } from '../_model/pagination';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  members :Member [] = [];
  paginationResult: PaginationResult<Member[]> = new PaginationResult();

  constructor(private http :HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number){
    let params = new HttpParams();

    if(page && itemsPerPage){
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }


    return this.http.get<Member[]>(this.baseUrl+ 'users', {observe: 'response', params}).pipe(
      map(response => {
        if(response.body){
          this.paginationResult.resutl = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if(pagination)
        {
          this.paginationResult.pagination = JSON.parse(pagination);
        }
        return this.paginationResult;

      })

    );
  }

  getMember(username : string){
    const member = this.members.find(x => x.userName === username);
    if(member) return of(member);
    return this.http.get<Member>(this.baseUrl+ 'users/' + username);

  }

  updateMember(member: Member){
    return this.http.put(this.baseUrl + 'users', member).pipe(
      map(()=> {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member}
      })
    )
  }

  setmainPhoto(photoId: number){
    return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId, {});
  }

  deletePhoto(photoId: number){
    return this.http.delete(this.baseUrl + 'users/delete-photo/' + photoId);
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
