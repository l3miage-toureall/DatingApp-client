import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorComponent } from './errors/test-error/test-error.component';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MembersDetailComponent } from './members/members-detail/members-detail.component';
import { MembersListComponent } from './members/members-list/members-list.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthGuard } from './_guard/auth.guard';
import { PreventUnsavedChangesGuard } from './_guard/prevent-unsaved-changes.guard';

const routes: Routes = [
  {path:'', component:HomeComponent },
  {path:'',
   runGuardsAndResolvers:'always',
   canActivate: [AuthGuard],
   children :
      [
       {path:'members', component:MembersListComponent, canActivate: [AuthGuard] },
       {path:'members/:username', component:MembersDetailComponent },
       {path:'member/edit', component:MemberEditComponent, canDeactivate : [PreventUnsavedChangesGuard]},
       {path:'lists', component:ListsComponent},
       {path:'messages', component:MessagesComponent},
      ]
  },
  {path:'errors', component:TestErrorComponent},
  {path:'server-error', component:ServerErrorComponent},
  {path:'not-found', component:NotFoundComponent},
  {path:'**', component:NotFoundComponent, pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
