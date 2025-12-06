import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../../app/shared/assignments-service';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard implements OnInit {
  totalAssignments: number = 0;
  assignmentsRendu: number = 0;
  assignmentsNonRendu: number = 0;
  completionRate: number = 0;

  constructor(private assignmentsService: AssignmentsService) { }

  ngOnInit(): void {
    this.assignmentsService.getAssignmentStats().subscribe(stats => {
      this.totalAssignments = stats.totalAssignments;
      this.assignmentsRendu = stats.assignmentsRendu;
      this.assignmentsNonRendu = stats.assignmentsNonRendu;

      if (this.totalAssignments > 0) {
        this.completionRate = Math.round((this.assignmentsRendu / this.totalAssignments) * 100);
      }
    });
  }
}
