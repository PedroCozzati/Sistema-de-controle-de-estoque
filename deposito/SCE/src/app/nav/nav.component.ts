import { AfterViewInit, Component, ElementRef, HostListener, Input, NgZone, Renderer2, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ModalService } from '../_modal';
import { AppService } from '../shared/service/app.service';
import { LocalStorageService } from '../shared/service/local.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css','./nav.component.scss'],
})

export class NavComponent {
  @ViewChild('el') span:ElementRef;
 
 
  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private ngZone: NgZone,
    public service: AppService,
    private local: LocalStorageService,
    private router: Router,
    ) {}
  
  test = false
  isLogin=true
  is_logged={}
  user:any
  menuItems = [ "pedidos", "clientes", "produtos", "fornecedores","estoques"];
  menuIcons = ["receipt", "people", "redeem", "store","dns"];
  

  ngOnInit(): void {

    var test
    test = this.local.get('is_logged');
    this.user = this.local.get('user');

    console.log(this.local.get('user'))

    this.http.get(`http://localhost:3000/user?email=${this.user.email}&senha=${this.user.password}`, { headers: { "Content-Type": 'application/json' } })
        .subscribe(response => {
         test = response
         console.log(response)
         this.user = response
         this.local.set('user',this.user)

        if(this.user.is_adm==true){
          this.local.set('is_adm',true)
          this.menuItems.push('usuarios')
          this.menuIcons.push("face")
          this.menuItems.splice(0,0,'dashboard')
          this.menuIcons.splice(0,0,"donut_small")
        }
        else{
          this.local.set('is_adm',false)
        }
        
      })

      // if (this.local.get('is_adm')==true)
      // {
      // this.menuItems.push('users')
      // }

      if (!localStorage.getItem('foo')) { 
        localStorage.setItem('foo', 'no reload') 
        location.reload() 
      } else {
        localStorage.removeItem('foo') 
      }

   
    
      

  }

  logoff(){
    this.local.clear()
    this.service.login=false
    this.http.get
    (`http://localhost:3000/logoff?email=${this.user.email}&senha=${this.user.password}`, { headers: { "Content-Type": 'application/json' } })
        
    .subscribe(
      res=>{
       
        this.local.set('is_logged',false)
        this.service.login=false

        // this.http.get(`http://localhost:3000/user?email=${this.user.email}&senha=${this.user.password}`, { headers: { "Content-Type": 'application/json' } })
        // .subscribe(response => {
        //   this.user.is_logged = response
        // })



      
      
      },
      err => {
        // this.service.login=false
        // alert("nao encontrado")
      });

      this.router.navigateByUrl('')


        
       
    
  }
  title = 'vsfd';
  selected_item = ''
  @Input() appHighlight: string;
  private breakpointObserver = inject(BreakpointObserver);
  // nav.component.ts
  



  toggle(){
    this.test = !this.test
      
    // if(this.test==true){
    //  

    // }
    }
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  onChangeItem(){
    this.selected_item =''
  }
}
