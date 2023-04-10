import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS, } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { EmployeeComponent } from './employee/employee.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    EmployeeComponent,
    AddEmployeeComponent,
    UpdateEmployeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ApolloModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
        provide: APOLLO_OPTIONS,
        useFactory(httpLink: HttpLink) {
            return {
                cache: new InMemoryCache(),
                link: httpLink.create({
                    uri: "https://troubled-clothes-calf.cyclic.app/graphql",
                }),
            };
        },
        deps: [HttpLink],
    },
],
bootstrap: [AppComponent]
})
export class AppModule { }