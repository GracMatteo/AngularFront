import { Component, EventEmitter, Output, output } from '@angular/core';
import { AssignmentsService } from '../../../app/shared/assignments-service';
import { Assignment } from '../assignment';
import { MatDatepickerModule, MatDatepickerToggle } from "@angular/material/datepicker";
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { provideNativeDateAdapter } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-assignment',
  imports: [MatDatepickerToggle, MatButtonModule, CommonModule, FormsModule,
    MatDatepickerModule, MatCardModule, MatFormFieldModule, MatIconModule, MatInputModule, MatDividerModule
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-assignment.html',
  styleUrl: './add-assignment.css'
})
export class AddAssignment {
  //@Output() nouvelAssignment = new EventEmitter<Assignment>();

  nomAssignment!: string;
  dateDeRendu!: Date;

  constructor(private assignmentsService: AssignmentsService,
    private router: Router
  ) {
  }

  onAdd(event: any) {
    console.log("Ajout d'un assignment");
    const nouvelAssignment = {
      id: Math.floor(Math.random() * 1000000), // Génère un ID aléatoire
      nom: this.nomAssignment,
      dateDeRendu: this.dateDeRendu,
      rendu: false
    };

    //this.nouvelAssignment.emit(nouvelAssignment);
    this.assignmentsService.addAssignment(nouvelAssignment)
      .subscribe(message => {
        console.log(message)
        this.router.navigate(['/home']);
      });

  }
}
