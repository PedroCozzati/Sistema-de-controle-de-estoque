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
  discard_product:any
  is_dump=false
  nome_produto=""

  canDiscard:any
  verification:any

  old_amount:number
  supplier:any
  fornecedores:any=[]
  fornecedor={
    name:"",
    dispatch_time_in_days:0
  }

  estoque={
    id:2,
    image:"",
    name:"",
    adress:"",
    product:[]
  }
  estoques:any=[]


  file_string:string
  file:any
  url:any
  ngOnInit(): void {
    this.consultaProdutos()
    this.getEstoques()
  }

  temp_id=0
  

  openModal(id:string){
    this.modalService.open(id);
    this.getFornecedores()
    this.getEstoques()
  }

  openModalMenu(id:string){
    this.modalService.open(id)
  }
  getFromInventory(estoque:any){
      this.is_dump=false
      this.produtos = estoque.product

  }
  openModalEdit(product:any){
    this.old_amount = product.amount
    this.modalService.open('edit-produto');

    this.http.get(
      `http://localhost:3000/productById?id=${product.id}`
    ).subscribe(response=>{
      this.supplier=  response
    })
    this.produto = product
    this.temp_id=product.id
  }
  closeModal(id:string){
    this.modalService.close(id)
  }

  getFornecedores(){
    this.http.get('http://localhost:3000/suppliers').subscribe(
      response=>{
        this.fornecedores = response
      }
    )
  }

  getEstoques(){
    this.http.get('http://localhost:3000/inventorys').subscribe(
      response=>{
        console.log(response)
        this.estoques = response
      }
    )
  }

  drop_click(fornecedor:any){
    this.fornecedor = fornecedor
    this.modalService.close('select-fornecedor')
  }

  drop_click2(estoque:any){
    
    this.estoque = estoque
    this.modalService.close('select-estoque')

  }

  findProductsByName(nome:string){
    this.http.get(`http://localhost:3000/inventory-products-by-name/${nome}`, { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.is_dump=false
        this.produtos = response
      })
  }

  novoProduto(produto: any) {
    console.log(produto)
    // this.http.post(`http://localhost:3000/product`, 
    // {
    //   product_name:produto.nome,
    //   amount: produto.amount,
    //   image:produto.image,
    //   inventory:[
    //     this.estoque
    //   ],
    //   supplier:[
    //     this.fornecedor
    //   ]
    // }, 
    // { headers: { "Content-Type": 'application/json' } })
      
    this.http.put("http://localhost:3000/inventory",{
      "id":this.estoque.id,
      "image": this.estoque.image,
      "name": this.estoque.name,
      "adress": this.estoque.adress,
      "product": [
          {
            "product_name":produto.nome,
            "image":produto.image,
            "amount":produto.amount,
            "supplier":[
              this.fornecedor
            ],
            "inventory":[
              
            ],
            "productDate":"2023-11-19T01:23:33.000Z"
          }
      ]
    }).subscribe(response=>{
      this.modalService.close('novo-produto')
      alert("O tempo para esse fornecedor despachar esse produto é de:    "+this.fornecedor.dispatch_time_in_days+ " horas")
      this.router.navigateByUrl('', { skipLocationChange: true }).then(() => {
        this.router.navigate(['produtos']);
    }); 
    });
  }
  

  editProduto(produto: any) {
    var old_amount = produto.amount
    // this.http.get(
    //   `http://localhost:3000/productById?id=${produto.id}`
    // ).subscribe(response=>{
    //   full_product =  response
    // })
    
    this.http.put(`http://localhost:3000/product-atualiza-quantidade`, 
    {
      id:produto.id,
      amount:this.supplier.amount,
      new_amount:produto.new_amount<0?0:parseInt(produto.new_amount)
    }, 
    { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        alert("O tempo para esse fornecedor despachar essa quantidade de produtos é de:    "+this.supplier.supplier[0].dispatch_time_in_days+ " horas")
      })
      this.modalService.close('edit-produto')
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['produtos']);
    }); 

  }

  removeProduto(product:any) {
    this.http.post("http://localhost:3000/inventory",{
      
        image: "https://www.novaambiental.com.br/wp-content/uploads/2021/06/Retorno-fiscal-Dedutibilidade-fiscal-produtos-materiais-inserviveis.jpeg",
        name: "Estoque 11 - Produtos Descartados",
        adress: "Avenida 2",
        product: [
          
        ]
        
    
    }).subscribe(response=>{
      
    })
    this.discard_product = product
    this.consultaPedidos()
    this.modalService.open("atencao")
  
  }

  consultaPedidos(){
    this.http.get("http://localhost:3000/orders-all", { headers: { "Content-Type": 'application/json' } })
    .subscribe(response => {
       this.verification = response
      //  console.log(this.verification)
       this.verification.forEach((element: {
         status: string; product: any[]; 
}) => {
        if(element.status!="EM ANDAMENTO"){
          this.canDiscard=true
        }
        else{
         element.product.forEach(e => {
           if (e.id === this.discard_product.id && element.status=="EM ANDAMENTO"){
             this.canDiscard=false
           }
           else{
            this.canDiscard=true

           }
         });
         this.canDiscard=false
        }
       });
    })

  }

  consultaProdutos() {
    this.http.get("http://localhost:3000/inventory-products", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.is_dump=false
        this.produtos = response
        console.log(this.produtos)
      })
  }


  consultaDescartados() {
    this.http.get("http://localhost:3000/inventory-dump", { headers: { "Content-Type": 'application/json' } })
      .subscribe(response => {
        this.is_dump=true
        this.produtos = response
      })
  }


  descartar(){
   
    if(this.canDiscard==true){
      this.http.delete(`http://localhost:3000/product/${this.discard_product.id}`, 
      { headers: { "Content-Type": 'application/json' } })
        .subscribe(response => {
        })
        
      this.http.put("http://localhost:3000/inventory",{
        
          image: "https://www.novaambiental.com.br/wp-content/uploads/2021/06/Retorno-fiscal-Dedutibilidade-fiscal-produtos-materiais-inserviveis.jpeg",
          name: "Estoque 11 - Produtos Descartados",
          adress: "Avenida 2",
          product: [
            this.discard_product
          ]
          
      
      }).subscribe(response=>{
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['produtos']);
      }); 
  
      })
    }

    else{
      alert("Você não pode descartar esse produto, pois ele está sendo usado em um pedido")
    }

   
  }

  getAllProducts(){
    this.produtos = this.consultaProdutos
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['produtos']);
  }); 
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

