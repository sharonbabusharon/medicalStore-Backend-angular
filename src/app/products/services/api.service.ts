import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  //to hold search value
  searchTerm=new BehaviorSubject('')

  //to hold cart item count
  cartItemCount=new BehaviorSubject(0)

  constructor(private http:HttpClient) {
    this.cartCount()
   }

  BASEURL='https://medicalstore.onrender.com'
    //api call for get all products
    getAllProducts(){
      return this.http.get(`${this.BASEURL}/products/all-products`)
    }

    viewProduct(id:any){
      return this.http.get(`${this.BASEURL}/products/view-product/${id}`)
    }

    //api call for add to wishlsit
    addToWishlist(id:any,title:any,price:any,image:any){
      const body={
        id,
        title,
        price,
        image
      }
      return this.http.post(`${this.BASEURL}/wishlist/add-to-wishlist`,body)
    }

    //api to get all wishlist
    getWishlistItems(){
      return this.http.get(`${this.BASEURL}/wishlist/get-wishlist`)
    }


    //api to remove wishliist items
    removeWishlistItems(id:any){
      return this.http.delete(`${this.BASEURL}/wishlist/remove-wishlist-item/${id}`)
    }

    //api to remobve cart item
    removeCartItem(id:any){
      return this.http.delete(`${this.BASEURL}/cart/remove-cart-item/${id}`)
    }

    //api to add to cart
    addToCart(product:any){
      const body={
        id:product.id,
        title:product.title,
        price:product.price,
        image:product.image,
        quantity:product.quantity,
        grandTotal:product.grandTotal
      }
      return this.http.post(`${this.BASEURL}/cart/add-to-cart`,body)
    }


    //api to get all cart ietsm
    getCart(){
      return this.http.get(`${this.BASEURL}/cart/get-cart`)
    }

    cartCount(){
      this.getCart().subscribe((result:any)=>{
        this.cartItemCount.next(result.length);
      })
    }

    //api to increment cart data
   incrementCount(id:any){
    return this.http.get(`${this.BASEURL}/cart/incrementCount/${id}`)
   }

   //api to increse cartr item count
   decreseCount(id:any){
    return this.http.get(`${this.BASEURL}/cart/decreseCount/${id}`)
   }
}

