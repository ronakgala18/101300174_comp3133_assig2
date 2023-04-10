import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  static getEmployees(): any {
    throw new Error('Method not implemented.');
  }
  constructor(private apollo: Apollo) {}

  getEmployees(): Observable<Employee[]> {
    return this.apollo
      .watchQuery<any>({
        query: gql`
          query {
            employees {
              id
              firstname
              lastname
              email
              phone
            }
          }
        `,
      })
      .valueChanges.pipe(map((result) => result.data.employees));
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation AddEmployee($input: EmployeeInput!) {
            addEmployee(input: $input) {
              id
              firstname
              lastname
              email
              phone
            }
          }
        `,
        variables: {
          input: {
            firstname: employee.firstname,
            lastname: employee.lastname,
            email: employee.email,
            phone: employee.phone,
          },
        },
      })
      .pipe(map((result) => result.data.addEmployee));
  }

  updateEmployee(id: string, employee: Employee): Observable<Employee> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation UpdateEmployee($id: String!, $input: EmployeeInput!) {
            updateEmployee(id: $id, input: $input) {
              id
              firstname
              lastname
              email
              phone
            }
          }
        `,
        variables: {
          id: id,
          input: {
            firstname: employee.firstname,
            lastname: employee.lastname,
            email: employee.email,
            phone: employee.phone,
          },
        },
      })
      .pipe(map((result) => result.data.updateEmployee));
  }

  deleteEmployee(id: string): Observable<Employee> {
    return this.apollo
      .mutate<any>({
        mutation: gql`
          mutation DeleteEmployee($id: String!) {
            deleteEmployee(id: $id) {
              id
              firstname
              lastname
              email
              phone
            }
          }
        `,
        variables: {
          id: id,
        },
      })
      .pipe(map((result) => result.data.deleteEmployee));
  }
}
