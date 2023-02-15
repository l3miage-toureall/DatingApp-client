import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  baseUrl = 'https://localhost:5001/api/Users';
  registerMode = false;
  users : any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.GetUsers();
  }
  registerToggle(){
    this.registerMode = !this.registerMode;
  }

  GetUsers(){
    return this.http.get(this.baseUrl).subscribe({
      next: response => this.users = response,
      error: error => console.log(error)

    })
  }

}
