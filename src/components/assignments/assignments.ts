import { ChangeDetectionStrategy, Component, model, OnInit } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Assignment } from './assignment';
import { AssignmentDetail } from "./assignment-detail/assignment-detail";
import { MatListModule } from '@angular/material/list';
import { AssignmentsService } from '../../app/shared/assignments-service';
import { AddAssignment } from "./add-assignment/add-assignment";
import { RouterLink } from '@angular/router';
import { OnChanges } from '@angular/core';

@Component({
  selector: 'app-assignments',
  imports: [CommonModule, DatePipe, MatDividerModule, FormsModule, MatButtonModule,
    MatDatepickerModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule,
    MatListModule, RouterLink],
  providers: [provideNativeDateAdapter()],
  templateUrl: './assignments.html',
  styleUrl: './assignments.css',
})
export class Assignments implements OnInit, OnChanges {
  ajoutActive = true;

  nomAssignment!: string;
  dateDeRendu!: Date;

  assignmentSelected?: Assignment;
  assignments: Assignment[] = [];

  page: number = 1;
  limit: number = 8;
  totalDocs!: number;
  nextPages!: number;
  prevPages!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  constructor(private assignmentsService: AssignmentsService,

  ) {
  }

  ngOnInit(): void {
    this.getAssignments();
  }

  ngOnChanges(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService.getAssignmentPagine(this.page, this.limit).subscribe(
      (data) => {
        this.assignments = data.docs;
        this.page = data.page;
        this.limit = data.limit;
        this.totalDocs = data.totalDocs;
        this.nextPages = data.nextPage;
        this.prevPages = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
        console.log("Données paginées reçues : ", data);
      }
    );
  }

  onPageChange(page: number) {
    this.page = page;
    this.getAssignments();
  }

  onNextPage() {
    if (this.hasNextPage) {
      this.page = this.nextPages;
      this.getAssignments();
    }
  }

  onPrevPage() {
    if (this.hasPrevPage) {
      this.page = this.prevPages;
      this.getAssignments();
    }
  }

  /*
  onAddAssignments(event: any) {
    this.assignmentsService.addAssignment(event)
    .subscribe(message => {
      console.log(message)
    });

  }
  */

  onAssignmentsSelected(assignment: Assignment) {
    this.assignmentSelected = assignment;
    //console.log("Assignment sélectionné : " + this.assignmentSelected.nom);
  }

  peuplerBD() {
    this.assignmentsService.peuplerBDavecForkJoin()
      .subscribe(() => {
        console.log("BD peuplée avec succès !");
      });
  }
}
