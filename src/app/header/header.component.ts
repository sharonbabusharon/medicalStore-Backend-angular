import { Component, OnInit } from '@angular/core';
import { ApiService } from '../products/services/api.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit{

  cartItem:number=0

constructor(private api:ApiService){}
  ngOnInit(): void {
   this.api.cartItemCount.subscribe((result:any)=>{
    console.log(result);
    this.cartItem=result
    
   })
  }


search(event:any){
  console.log(event.target.value);
  this.api.searchTerm.next(event.target.value)
  //to asign new values to the behaviror object
}

}
