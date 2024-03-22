import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../_modal';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private ngZone: NgZone,
    private router: Router,
  ) { }

  active_users:any = []
  inactive_users:any = []

  ngOnInit(): void {
    this.findActiveUsers()
  }

  temp_id=0
  user: any = {}
  

  openModal(id:string){
    this.modalService.open(id);
    this.findInactiveUsers()
  }

  openModalEdit(id:number){
    this.modalService.open('edit-produto');
    this.temp_id=id
  }
  closeModal(id:string){
    this.modalService.close(id)
  }

  findActiveUsers() {
    this.http.get("http://localhost:3000/users-active", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.active_users = response
      })
  }

  findInactiveUsers(){
    this.http.get("http://localhost:3000/users-inactive", { headers: { "Content-Type": 'application/json' } })
    .subscribe(response => {
      this.inactive_users = response
    })
  }

  activateUser(email:string){
    this.http.post("http://localhost:3000/activate",{"email":email}, { headers: { "Content-Type": 'application/json' } })
    .subscribe(response => {
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['usuarios']);

    }); 
    })
  }

  inactivateUser(email:string){
    this.http.post("http://localhost:3000/inactivate",{"email":email}, { headers: { "Content-Type": 'application/json' } })
    .subscribe(response => {
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['usuarios']);

    }); 
    })
  }

  // register(user: string, email: string, pwd: string,) {
  //   this.http.post
  //     (`http://localhost:3000/user`,
  //       {
  //         user_name: user,
  //         email: email,
  //         password: pwd
  //       },
  //       { headers: { "Content-Type": 'application/json' } })

  //     .subscribe(
  //       res => {
  //         alert("cadastrado com sucesso")
  //       },
  //       err => {
  //         // this.service.login = false
  //         alert("algo deu errado")
  //       });





  // }

}
