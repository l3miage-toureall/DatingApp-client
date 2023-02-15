import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';
import { User } from '../_model/user';
import { AcountService } from '../_services/acount.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  model : any = {};
  currentUser$: Observable<User | null> = of(null);



  constructor(private accountService: AcountService, private router : Router, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
  }

  login(){
    this.accountService.login(this.model).subscribe({
      next : () => {
        this.router.navigateByUrl('/members');
        this.toastr.success('Connected!');
      },
      error : error => this.toastr.error(error.error)


    })
    console.log(this.model);

  }
  logout(){
    this.accountService.logout();
    this.router.navigateByUrl('/')
  }

}
