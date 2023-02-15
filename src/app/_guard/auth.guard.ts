import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AcountService } from '../_services/acount.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private accountService : AcountService, private toastr : ToastrService){

  }
  canActivate(): Observable<boolean> {
    return this.accountService.currentUser$.pipe(
      map( user => {
        if(user) return true;
        else{
          this.toastr.error('Acces denied, You shall be connected!');
          return false;
        }

      })
    )
  }

}
