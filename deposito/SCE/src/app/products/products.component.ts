import { HttpClient } from '@angular/common/http';
import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ModalService } from '../_modal';

@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {
  constructor(
    private http: HttpClient,
    private modalService: ModalService,
    private ngZone: NgZone,
    private router: Router,
  ) { }
  produto: any = {}
  produtos: any = []

  ngOnInit(): void {
    this.consultaProdutos()
  }

  temp_id=0
  

  openModal(id:string){
    this.modalService.open(id);
  }

  openModalEdit(id:number){
    this.modalService.open('edit-produto');
    this.temp_id=id
  }
  closeModal(id:string){
    this.modalService.close(id)
  }


  novoProduto(produto: any) {
    this.http.post(`http://localhost:3000/product`, 
    {
      product_name:produto.nome,
      amount:produto.amount,
    }, 
    { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
      })
      this.modalService.close('novo-produto')
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['products']);
    }); 

  }

  editProduto(produto: any) {
    this.http.put(`http://localhost:3000/product/${this.temp_id}`, 
    {
      product_name:produto.nome,
      amount:produto.amount,
    }, 
    { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
      })
      this.modalService.close('edit-produto')
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['products']);
    }); 

  }

  removeProduto(id:number) {
    this.http.delete(`http://localhost:3000/product/${id}`, 
    { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
      })
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['products']);
    }); 

  }

  consultaProdutos() {
    this.http.get("http://localhost:3000/product", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.produtos = response
      })
  }
}
