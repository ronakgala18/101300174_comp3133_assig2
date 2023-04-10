import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


type LoginResponse = {
  login: {
    message: string;
  };
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  username = '';
  password = '';

  constructor(private apollo: Apollo, private router: Router) {}

  onSubmit() {
    this.apollo.query<LoginResponse>({
      query: gql`
        query login($username: String!, $password: String!) {
          login(username: $username, password: $password) {
            message
          }
        }
      `,
      variables: {
        username: this.username,
        password: this.password,
      },
    }).subscribe((result: { data: LoginResponse }) => {
      const data = result.data;
      if (data && data.login && data.login.message) {
        console.log(data.login.message)
        //localStorage.setItem('token', data.login.message);
        this.router.navigate(['/homepage']);
      }
    });
  }
  onSignup(){
    this.router.navigate(['/signup']);

  }
}