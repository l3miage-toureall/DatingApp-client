import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_model/member';
import { Pagination } from 'src/app/_model/pagination';
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
  PageNumber = 1;
  pageSize =5;

  constructor(private memberService : MembersService) { }

  ngOnInit(): void {
    // this.members$ =this.memberService.getMembers();
    this.loadMembers();
  }

  loadMembers(){
    this.memberService.getMembers(this.PageNumber, this.pageSize).subscribe({
      next: response => {
        if(response.resutl && response.pagination){
          this.members = response.resutl;
          this.pagination = response.pagination;
        }
      }
    })
  }

  pageChanged(event:any){
    if(this.PageNumber!== event.page){
      this.PageNumber = event.page;
      this.loadMembers();
    }

  }

}
