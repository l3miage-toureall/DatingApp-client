import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { take } from 'rxjs';
import { Member } from 'src/app/_model/member';
import { Photo } from 'src/app/_model/photo';
import { User } from 'src/app/_model/user';
import { AcountService } from 'src/app/_services/acount.service';
import { MembersService } from 'src/app/_services/members.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {


  @Input() member: Member | undefined;
  baseurl = environment.apiUrl;
  uploader:FileUploader | undefined;
  hasBaseDropZoneOver = false;

  user : User | undefined;


  constructor(private accountService : AcountService , private memberService : MembersService) {

    this.accountService.currentUser$.pipe(take(1)).subscribe({
      next: user => {
        if(user) this.user = user;
      }
    })
   }

  ngOnInit(): void {
    this.initialiazeUploader();
  }


  initialiazeUploader (){
    this.uploader = new FileUploader({
      url: this.baseurl + 'users/add-photo',
      authToken: 'Bearer ' + this.user?.token,
      isHTML5: true,
      allowedFileType :['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        const photo = JSON.parse(response);
        this.member?.photos.push(photo);
      }
    }
  }

  public fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo){
    this.memberService.setmainPhoto(photo.id).subscribe({
      next: () => {
        if(this.user && this.member){
          this.user.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    })
  }

}
