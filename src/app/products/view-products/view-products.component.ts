import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent  implements OnInit{
  product:any={}

  constructor(private viewActivatedRoute:ActivatedRoute , private api:ApiService){}
  
  productId:String=''

  ngOnInit(): void {
    this.viewActivatedRoute.params.subscribe((data:any)=>{
      console.log(data.id);
      this.productId=data.id
    })  

    this.api.viewProduct(this.productId).subscribe((result:any)=>{
     console.log(result);
     this.product=result
     
    },
    (result:any)=>{
      console.log(result.error);
      
    })
  
  }
  addToWishlist(){
   const {id,title,price,image}=this.product
   
   this.api.addToWishlist(id,title,price,image).subscribe((result:any)=>{
    alert(result)
   },
   (result:any)=>{
    alert(result.error)
   }
   )
  }

  addToCart(product:any){
    //add quantity
    Object.assign(product,{quantity:1})
    console.log(product);

    this.api.addToCart(product).subscribe((result:any)=>{
      this.api.cartCount()
      alert(result)
    },(result:any)=>{
      alert(result.error)
    })
    
  }

}
