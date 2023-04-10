import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { EmployeeService } from './employee.service';

type EmplyeeResponse = {
  getAllEmployees: {
    employees: Employee[];
  };
};

@Component({
  selector: 'app-employees',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  employees!: Employee[];
  selectedEmployee!: Employee;
  showDialog = false;
  showDeleteDialog = false;
  
  constructor(private apollo: Apollo, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit() {
    this.apollo.query<EmplyeeResponse>({
      query: gql`
        query {
          getAllEmployees {
            employees{
            id
            firstname
            lastname
            email
            gender
            salary
          }}
        }
      `,
      fetchPolicy: "network-only" // <-- Add this option
    }).subscribe((result: { data: EmplyeeResponse }) => {
      const data = result.data;
      this.employees=data.getAllEmployees.employees; 
        console.log(data.getAllEmployees.employees)
        this.router.navigate(['/homepage']);
    });
}


deleteEmployee(){
  this.apollo.mutate({
    mutation: gql`
      mutation {
        deleteEmployeeById(id: "${this.selectedEmployee.id}") 
      }
    `,
    fetchPolicy: "network-only" // <-- Add this option
  }).subscribe(result => {
    this.employees = this.employees.filter(employee => employee.id !== this.selectedEmployee.id);
    this.showDeleteDialog = false; 
  });
}


  goToLogin(event: Event) {
    event.preventDefault();
    this.router.navigate(['/']);
  }

  goToAddEmployee(event: Event) {
    event.preventDefault();
    this.router.navigate(['/new-employee']);
  }


  goToUpdate(event: Event, employee: Employee) {
    this.employeeService.setSelectedEmployee(employee);
    event.preventDefault();
    this.router.navigate(['/update-employee']);
  }


}
