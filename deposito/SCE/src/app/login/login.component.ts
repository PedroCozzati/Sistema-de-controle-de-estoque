import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../_modal';
import { AppService } from '../shared/service/app.service';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { LocalStorageService } from '../shared/service/local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css', 'login.component.scss']
})
export class LoginComponent {
  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private ngZone: NgZone,
    public service: AppService,
    private local: LocalStorageService,

    private router: Router,
  ) { }

  ngOnInit(): void {
    this.user = this.local.get('user');
    var logged = this.local.get('is_logged')
    console.log(this.user)

    // this.http.get(`http://localhost:3000/user?email=${this.user.email}&senha=${this.user.password}`, { headers: { "Content-Type": 'application/json' } })
    // .subscribe(response => {
    //   this.system_user = response
    // })

    if (logged == true) {
      this.service.login = true
    }
    else {
      this.service.login = false
    }
  }
  user: any = {}

  system_user: any = {}






  produto: any = {}
  produtos: any = []

  consultaUsuario() {
    this.http.get(`http://localhost:3000/user?email=${this.user.email}&senha=${this.user.password}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.system_user = response
      })
  }

  login() {
    this.http.post
      (`http://localhost:3000/login?email=${this.user.email}&senha=${this.user.password}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(
        res => {
          this.system_user = res
          this.service.login = this.system_user
          this.local.set('user', this.user)
          this.local.set('is_logged', true)
          // this.http.get(`http://localhost:3000/user?email=${this.user.email}&senha=${this.user.password}`, { headers: { "Content-Type": 'application/json' } })
          // .subscribe(response => {
          //   this.user.is_logged = response
          // }  
        },
        err => {
          this.service.login = false
          alert("Usuario não ativo, entre em contato com o ADM")
        });
  }

  openModalRegister(){
    this.modalService.open("register")
  }
  register(user: string, email: string, pwd: string,) {
    this.http.post
      (`http://localhost:3000/user`,
        {
          user_name: user,
          email: email,
          password: pwd
        },
        { headers: { "Content-Type": 'application/json' } })

      .subscribe(
        res => {
          alert("cadastrado com sucesso")
        },
        err => {
          // this.service.login = false
          alert("algo deu errado")
        });





  }


  // login2(){

  //     // this.http.get(`http://localhost:3000/user?email=${this.user.email}&senha=${this.user.password}`, { headers: { "Content-Type": 'application/json' } })
  //     // .subscribe(response => {
  //     //   this.system_user = response
  //     // })

  //     // console.log(this.system_user)

  //     // if(this.system_user){
  //         this.log()

  //     // }


  // }


}
