import { Injectable } from '@angular/core';
import { Assignment } from '../../components/assignments/assignment';
import { forkJoin, Observable, of } from 'rxjs';
import { LoggingService } from './logging-service';
import { HttpClient } from '@angular/common/http';
import { bdInitialAssignments } from './data';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {

  backendUrl: string = 'https://angularback-m8kf.onrender.com/api/assignments';

  constructor(private loggingService: LoggingService, private http: HttpClient) {

  }

  //get
  getAssignments(): Observable<any> {
    return this.http.get<any>(this.backendUrl);
  }

  getAssignmentStats(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/stats`);
  }

  getAssignmentPagine(page: number, limit: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}?page=${page}&limit=${limit}`);
  }

  //get assignment by id
  getAssignment(id: number): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/${id}`);
  }
  //delete
  deleteAssignment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.backendUrl}/${id}`);
  }
  //update
  updateAssignment(assignment?: Assignment): Observable<String> {
    this.http.put<Assignment>(`${this.backendUrl}`, assignment).subscribe();
    return of('Assignment updated successfully');
  }

  //post
  addAssignment(assignment: Assignment): Observable<any> {
    this.http.post<Assignment>(this.backendUrl, assignment).subscribe();
    return of("assignment added");
  }

  //generate data
  peuplerBDavecForkJoin(): Observable<any> {
    let appelsVersAddAssignments: Observable<any>[] = [];

    bdInitialAssignments.forEach(a => {
      const nouvelAssignment = new Assignment();
      nouvelAssignment.id = a.id;
      nouvelAssignment.nom = a.nom;
      nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu.$date.$numberLong);
      nouvelAssignment.rendu = a.rendu;


      appelsVersAddAssignments.push(this.addAssignment(nouvelAssignment));
    });
    return forkJoin(appelsVersAddAssignments);
  }

}
