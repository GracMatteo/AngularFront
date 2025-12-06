import { CommonModule, DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Assignment } from '../assignment';
import { MatCardModule } from "@angular/material/card";
import { MatCheckbox } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { AssignmentsService } from '../../../app/shared/assignments-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../app/shared/auth-service';

@Component({
  selector: 'app-assignment-detail',
  imports: [DatePipe, MatCardModule, CommonModule, MatCheckbox, MatButtonModule, MatIconModule, MatDividerModule],
  templateUrl: './assignment-detail.html',
  styleUrl: './assignment-detail.css'
})
export class AssignmentDetail implements OnInit {
  //@Input() 
  assignment?: Assignment | undefined;

  @Output() deleteAssignment = new EventEmitter<Assignment>();

  constructor(private assignmentsService: AssignmentsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.getAssignment();
    console.log(this.assignment);
  }

  getAssignment() {
    const id = this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(id)
      .subscribe(assignment => {
        console.log(assignment);
        this.assignment = assignment;

      });

  }

  onDeleteAssignment() {
    //this.assignment = null;
    const id = Number(this.route.snapshot.params['id']);

    this.assignmentsService.deleteAssignment(id).
      subscribe(message => {
        this.assignment = undefined;
        console.log(message);
        this.router.navigate(['/list']);
      });
  }

  onAssignmentRendu() {
    if (this.assignment) {
      this.assignment.rendu = !this.assignment.rendu;
    }

    this.assignmentsService.updateAssignment(this.assignment).
      subscribe(message => {
        console.log(message)
        this.router.navigate(['/home']);
      });

  }

  onClickEdit() {
    if (!this.assignment) return;
    this.router.navigate(['/assignment', this.assignment.id, 'edit'],
      { queryParams: { nom: this.assignment.nom }, fragment: 'edition' }
    );
  }

  isLogged(): boolean {
    return this.authService.loggedIn;
  }
}
