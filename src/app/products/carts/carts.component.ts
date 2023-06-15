import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';

@Component({
  selector: 'app-carts',
  templateUrl: './carts.component.html',
  styleUrls: ['./carts.component.css']
})
export class CartsComponent  implements OnInit{
  totalPrice:number=0
  paymentStatus:boolean=false

  username:string=''
  housenumber:string=''
  streetname:string=''
  pincode:string=''
  state:string=''
  total:string=''


  public payPalConfig?: IPayPalConfig;

  showSuccess:boolean=false

  showPaypal:boolean=false


  constructor(private api:ApiService ,private cartFb:FormBuilder){}
  addressForm=this.cartFb.group({
    username:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    housenumber:['',[Validators.required,Validators.pattern('[0-9]*')]],
    streetname:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]],
    pincode:['',[Validators.required,Validators.pattern('[0-9]*')]],
    state:['',[Validators.required,Validators.pattern('[a-zA-Z]*')]]

  })
  allCartItems:any=[]
  ngOnInit(): void {
    this.initConfig();
        this.api.getCart().subscribe((result:any)=>{
        console.log(result);
        this.allCartItems=result

        //call getcartTotal
        this.getCartTotal()
        
       },(result:any)=>{
        console.log(result.error)
        
  })

  
  }
  removeCartItem(id:any){
    
      alert("item removed from cart")
      this.api.removeCartItem(id).subscribe((result:any)=>{
     
      this.allCartItems=result
      this.api.cartCount()
      this.getCartTotal()
    },(result:any)=>{
      alert(result.error)
    })
  }
 

  //tp get cart total
  getCartTotal(){
    let total=0
    this.allCartItems.forEach((item:any)=>{
      total=total+item.grandTotal
      this.totalPrice=Math.ceil(total)
      console.log(total);
      
    })
  }

  //to increment count
  incrementCount(id:any){
    this.api.incrementCount(id).subscribe((result:any)=>{
      this.allCartItems=result
      this.getCartTotal()
    })
  }


   //to decrement count
   decreseCount(id:any){
    this.api.decreseCount(id).subscribe((result:any)=>{
      this.allCartItems=result
      this.getCartTotal()
    })
  }



  submitform(){
    if(this.addressForm.valid)
    {
      this.paymentStatus=true
      
      console.log(this.addressForm);
      
      this.username=this.addressForm.value.username||''
      this.housenumber=this.addressForm.value.housenumber||''
      this.streetname=this.addressForm.value.streetname||''
      this.pincode=this.addressForm.value.pincode||''
      this.state=this.addressForm.value.state||''
      
    }
    else{
      alert("please provide valid details")
    }
  }




  
  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'sb',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: '9.99',
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: '9.99'
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: '9.99',
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then((details:any) => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


  makepayment(){
    this.showPaypal=true
  }

    //function to close modal
    modalClose(){
      this.addressForm.reset()
      this.showPaypal=false
      this.showSuccess=false
      this.paymentStatus=false
    }
  

}

