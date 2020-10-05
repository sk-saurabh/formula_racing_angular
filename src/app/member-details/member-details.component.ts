import { Component, OnInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { AppService } from '../services/app.service';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { ToastrService } from 'ngx-toastr';

// This interface may be useful in the times ahead...
interface Member {
  firstName: string;
  lastName: string;
  jobTitle: string;
  team: string;
  status: string;
}

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit, OnChanges {
  memberModel: Member;
  memberForm: FormGroup;
  submitted = false;
  alertType: String;
  alertMessage: String;
  teams = [];

  memberId = window.localStorage.getItem("editMemberId");
    

  constructor(private fb: FormBuilder, private appService: AppService, private router: Router, private toastr: ToastrService) {}

  ngOnInit() {
    //Intializing Form group 
    this.memberForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      jobTitle: ['', Validators.required],
      team: ['', Validators.required],
      status: ['', Validators.required]
    });
    if(this.memberId) {
      this.appService.getMemberById(this.memberId)
      .subscribe(member => {
        this.memberForm.patchValue({
          firstName: member.firstName,
          lastName: member.lastName,
          jobTitle: member.jobTitle,
          team: member.team,
          status: member.status
        });
      });
    }
    //Loading option values for teams
    this.appService.getTeams().subscribe(teams => this.teams = teams);
    // this.teams = this.appService.getTeams();
    // .subscribe(teams => this.teams = teams);
   

  }

  ngOnChanges() {}

  // TODO: Add member to members
  onSubmit() {
    this.memberModel = this.memberForm.value;
    //If an update request, update by id
    if(this.memberId) {
      this.appService.updateMember(this.memberId,this.memberModel);
      this.toastr.success("Member Updated!");
    } else {
      //Calling addMember function to post the new member
      this.appService.addMember(this.memberModel);
      this.toastr.success("Member Added!");
    }
    //Redirecting to members page after adding members
    this.router.navigate(['members']);
  }
}
