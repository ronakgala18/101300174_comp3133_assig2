import { LoginComponent } from './../login/login.component';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { SignupResponse } from './signup-response';

const SIGNUP_MUTATION = gql`
  mutation signup($username: String!, $email: String!, $password: String!) {
    signup(username: $username, email: $email, password: $password ) {
      message
    }
  }
`;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  [x: string]: any;
  username = '';
  email = '';
  password = '';

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit(): void {
    this.apollo
      .mutate<SignupResponse>({
        mutation: SIGNUP_MUTATION,
        variables: {
          username: this.username,
          email: this.email,
          password: this.password,
        },
      })
      .subscribe((result) => {
        console.log(result)
        console.log(result?.data?.message);
        this.router.navigate([''])
      });
  }
}
