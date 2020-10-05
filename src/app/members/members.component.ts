import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  members = [];

  constructor(public appService: AppService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    console.log("getting members");
    this.appService.getMembers().subscribe(members => {this.members = members;
      console.log(this.members);
    });
    console.log("members fetched");
  }

  goToAddMemberForm() {
    //Navigating to member detail's page
    window.localStorage.removeItem("editMemberId");
    this.router.navigate(['memberdetail']);
  }

  editMemberByID(id: number) {
    //Removing old id if any and setting the new one coming from the target
    window.localStorage.removeItem("editMemberId");
    window.localStorage.setItem("editMemberId", id.toString());
    this.router.navigate(['memberdetail']);
  }

  deleteMemberById(id: number) {
    this.appService.deleteMember(id)
       .subscribe(data => {
        this.members = this.members.filter(m => m.id != id);
       }) ;
    this.toastr.warning('Member Deleted!');
  }
}
