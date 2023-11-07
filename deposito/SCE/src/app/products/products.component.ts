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

  file_string:string
  file:any
  url:any
  ngOnInit(): void {
    this.consultaProdutos()
  }

  temp_id=0
  

  openModal(id:string){
    this.modalService.open(id);
  }

  openModalEdit(product:any){
    this.modalService.open('edit-produto');
    this.produto = product
    this.temp_id=product.id
  }
  closeModal(id:string){
    this.modalService.close(id)
  }


  novoProduto(produto: any) {
    this.http.post(`http://localhost:3000/product`, 
    {
      product_name:produto.nome,
      amount: produto.amount,
      image:produto.image,
    }, 
    { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
      })
      this.modalService.close('novo-produto')
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['produtos']);
    }); 

  }

  editProduto(produto: any) {
    this.http.put(`http://localhost:3000/product/${this.temp_id}`, 
    {
      product_name:produto.product_name,
      amount:produto.amount,
    }, 
    { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
      })
      this.modalService.close('edit-produto')
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['produtos']);
    }); 

  }

  removeProduto(id:number) {
    this.http.delete(`http://localhost:3000/product/${id}`, 
    { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
      })
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['produtos']);
    }); 

  }

  consultaProdutos() {
    this.http.get("http://localhost:3000/product", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.produtos = response
      })
  }

  // handleImage(image:any){
  //   image = image.toString("binary")
  //   return image
  // }
  handleClick() {
    document.getElementById('upload-file')!.click();
  }
  
  addAttachment(fileInput: any) {
    this.file = fileInput.files[0];
    var reader = new FileReader();
    reader.onload = (event:any) => {
      this.file = event.target.result.toString("base64");   
      alert(event.target.result)
   }
    reader.readAsDataURL(this.file);

    // this.file_string=this.file.toString()
    // alert(this.file)
  }

    // this.produto.file = fileInput.target.files[0];
    // var reader = new FileReader();
    // reader.onload = (event:any) => {
    //   this.produto.file = event.target.result;   
   }
  //  alert(reader.readAsDataURL(this.produto.file));
 
    // console.log(fileInput.target.files[0].toString())
    // alert(this.produto.file.toString())
  
    //  handle the rest 

