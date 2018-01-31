import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable()
export class MediaService {

  username: string;
  password: string;
  email: string;
  fullName: string;


  apiUrl = 'http://media.mw.metropolia.fi/wbma';

  constructor(public http: HttpClient, private router: Router) {
  }


  public login() {
    console.log('uname: ' + this.username);
    console.log('pwd: ' + this.password);

    const body = {
      username: this.username,
      password: this.password,
    };

    const settings = {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    };

    this.http.post(this.apiUrl + '/login', body, settings).subscribe(response => {
      console.log(response['token']);
      localStorage.setItem('token', response['token']);
      this.router.navigate(['front']);
    }, (error: HttpErrorResponse) => {
      console.log(error.statusText);
    });
  }

  public register() {

    const body = {
      username: this.username,
      password: this.password,
      full_name: this.fullName,
      email: this.email
    };

    this.http.post(this.apiUrl + '/users', body).subscribe(data => {
      console.log(data);
      this.login();
    });
  }


}
