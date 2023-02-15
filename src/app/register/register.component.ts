import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AcountService } from '../_services/acount.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model : any ={}

  constructor(private accountService: AcountService, private router: Router, private toastr : ToastrService) { }

  ngOnInit(): void {
  }

  register(){
    this.accountService.register(this.model).subscribe({
      next: () => this.router.navigateByUrl('/members'),
      error: error => {
        this.toastr.error(error.error);
        console.log(error.error);

      }
    });

  }

  cancel(){
    console.log('Cancelled!');

  }

}
