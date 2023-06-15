import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent  implements OnInit{
  product:any={}

  allProducts:any=[]
  searchTerm:string=''
  constructor(private api:ApiService){}

  ngOnInit(): void {
    this.api.getAllProducts().subscribe((result:any)=>{
      this.allProducts=result
      
    })
      // this.searchTerm=this.api.searchTerm
      this.api.searchTerm.subscribe((result:any)=>{
        this.searchTerm=result
        console.log(this.searchTerm);
      })
    
      
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

}
