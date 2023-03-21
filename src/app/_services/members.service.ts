import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_model/member';
import { PaginationResult } from '../_model/pagination';
import { User } from '../_model/user';
import { UserParam } from '../_model/userParam';
import { AcountService } from './acount.service';

@Injectable({
  providedIn: 'root'
})
export class MembersService {
  baseUrl = environment.apiUrl;

  members :Member [] = [];
  membersCache =  new Map();
  userParam : UserParam | undefined;
  user : User | undefined;

  constructor(private http :HttpClient,private accountService: AcountService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user){
          this.userParam = new UserParam(user);
          this.user = user;
        }
      }
    })
  }

  getUserParam(){
    return this.userParam;
  }
  setUserParam(userParam :UserParam){
    this.userParam = userParam;
  }
  restUserParam(){
    if(this.user){
      this.userParam = new UserParam(this.user);
      return this.userParam;
    }
    return;
  }


  getMembers(userParam:UserParam){
    const response = this.membersCache.get(Object.values(userParam).join('-'));

    if(response) return of(response);

    let params = this.getPaginationHeaders(userParam.pageNumber, userParam.pageSize);

    params = params.append('minAge', userParam.minAge);
    params = params.append('maxAge', userParam.maxAge);
    params = params.append('gender', userParam.gender);
    params = params.append('orderBy', userParam.orderBy);


    return this.getPaginatedResult<Member[]>( this.baseUrl+ 'users',params).pipe(
      map(response => {
          this.membersCache.set(Object.values(userParam).join('-'), response);
          console.log(this.membersCache);

          return response;

      })
    );
  }

  private getPaginatedResult<T>(url:string, params: HttpParams) {

   const paginationResult: PaginationResult<T> = new PaginationResult<T>;

    return this.http.get<T>(url, { observe: 'response', params }).pipe(
      map(response => {
        if (response.body) {
          paginationResult.resutl = response.body;
        }
        const pagination = response.headers.get('Pagination');
        if (pagination) {
          paginationResult.pagination = JSON.parse(pagination);
        }
        return paginationResult;

      })

    );
  }

  private getPaginationHeaders(pageNumber:number, pageSize:number) {
    let params = new HttpParams();


      params = params.append('pageNumber', pageNumber);
      params = params.append('pageSize', pageSize);

    return params;
  }

  getMember(username : string){

     const member = [...this.membersCache.values()]
    .reduce((arr, elem) => arr.concat(elem.result ), [])
    .find((member: Member) => member.userName = username);

    console.log(member);


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
