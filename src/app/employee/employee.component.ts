import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  employees: Employee[] | null = null;
  loading = false;
  error: any = null;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees(): void {
    this.loading = true;
    this.employeeService.getEmployees().subscribe(
      result => {
        this.loading = false;
        this.employees = result.data ? result.data.employees : null;
        this.error = result.errors ? result.errors[0] : null;
      },
      error => {
        this.loading = false;
        this.error = error;
      }
    );
  }

  addEmployee(): void {
    // code to add a new employee
  }

  editEmployee(employee: Employee): void {
    // code to edit an existing employee
  }

  deleteEmployee(employee: Employee): void {
    // code to delete an existing employee
  }
}
