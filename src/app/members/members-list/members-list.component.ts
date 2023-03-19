import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Member } from 'src/app/_model/member';
import { Pagination } from 'src/app/_model/pagination';
import { User } from 'src/app/_model/user';
import { UserParam } from 'src/app/_model/userParam';
import { AcountService } from 'src/app/_services/acount.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-list',
  templateUrl: './members-list.component.html',
  styleUrls: ['./members-list.component.css']
})
export class MembersListComponent implements OnInit {

  // members$ : Observable <Member[]> | undefined;
  members : Member[] =[];
  pagination: Pagination | undefined;
  userParam : UserParam | undefined ;
  genderList = [{value:'male', display:'Males'}, {value:'female', display:'Females'}]

  constructor(private memberService : MembersService) {
    this.userParam = this.memberService.getUserParam();
   }

  ngOnInit(): void {
    // this.members$ =this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers(){
    if(this.userParam) {
      this.memberService.setUserParam(this.userParam);
      this.memberService.getMembers(this.userParam).subscribe({
        next: response => {
          if(response.resutl && response.pagination){
            this.members = response.resutl;
            this.pagination = response.pagination;
          }
        }
      })

    }

  }

  resetFilters(){
      this.userParam = this.memberService.restUserParam();
      this.loadMembers();

  }
  pageChanged(event:any){
    if(this.userParam && this.userParam?.pageNumber!== event.page){

      this.userParam.pageNumber = event.page;
      this.memberService.setUserParam(this.userParam)
      this.loadMembers();
    }

  }

}
