import { Routes } from '@angular/router';
import { Assignments } from '../components/assignments/assignments';
import { AddAssignment } from '../components/assignments/add-assignment/add-assignment';
import { AssignmentDetail } from '../components/assignments/assignment-detail/assignment-detail';
import { EditAssignment } from '../components/assignments/edit-assignment/edit-assignment';
import { AuthGuard } from './shared/auth-guard';
import { AdminGuard } from './shared/admin-guard';
import { Login } from '../components/login/login';
import { Dashboard } from '../components/dashboard/dashboard';
export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'home', component: Dashboard },

    { path: 'list', component: Assignments },

    { path: 'add', component: AddAssignment, canActivate: [AdminGuard] },

    { path: 'assignment/:id', component: AssignmentDetail },

    { path: 'assignment/:id/edit', component: EditAssignment, canActivate: [AuthGuard], },

    { path: 'login', component: Login }
];
