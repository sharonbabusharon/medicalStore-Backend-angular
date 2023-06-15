import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit{
  //to hold wishlist data
allWishlistItems:any=[]
  constructor(private api:ApiService){}
  ngOnInit(): void {
      this.api.getWishlistItems().subscribe((result:any)=>{
        console.log(result);
        this.allWishlistItems=result//assign array of data
        
      },
      (result:any)=>{
        console.log(result.error)
        
      })

      //to remove wishlist item
    
   }
   removeWishlistItem(id:any){
    this.api.removeWishlistItems(id).subscribe((result:any)=>{
      console.log(result);
      alert("item removed")
      this.allWishlistItems=result
      
    },(result:any)=>{
      alert(result.error)
    })
   }


   
  addToCart(product:any){
    //add quantity
    Object.assign(product,{quantity:1})
    console.log(product);

    this.api.addToCart(product).subscribe((result:any)=>{
      this.api.cartCount()
      this.removeWishlistItem(product.id)
      alert(result)
    },(result:any)=>{
      alert(result.error)
    })
    
  }

  }


