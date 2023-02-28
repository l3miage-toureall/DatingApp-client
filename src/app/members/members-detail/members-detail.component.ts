import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/_model/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-members-detail',
  templateUrl: './members-detail.component.html',
  styleUrls: ['./members-detail.component.css']
})
export class MembersDetailComponent implements OnInit {

  member :Member | undefined;

  constructor(private memberService : MembersService, private route :ActivatedRoute ) { }

  ngOnInit(): void {
    this.loadMember();
    console.log(this.member);


    }

  loadMember(){
    const username = this.route.snapshot.paramMap.get('username');
    console.log(username);

    if(!username) return;
    this.memberService.getMember(username).subscribe({
      next:member =>{
        console.log(member.city);

        this.member = member

      } ,


    })
  }

}
