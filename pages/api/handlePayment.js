import { useState } from "react";
import { client } from "../../lib/client";
import Instamojo from 'instamojo-payment-nodejs'



export default async function register(req,res){
    console.log('inside the handlepayment page')

    Instamojo.isSandboxMode(true)
    Instamojo.setKeys('test_b41c7403bd156541494caca0426', 'test_27607b580c5d182ea83da335c50')
    

      const options = {
        purpose: "Product name", // REQUIRED
        amount: 150, // REQUIRED and must be > ₹3 (3 INR)
        currency: "INR",
        buyer_name: "Madan Kumar",
        email: "punitwranz@gmail.com",
        phone: null,
        send_email: true,
        send_sms: false,
        allow_repeated_payments: false,
        webhook: "",
        redirect_url: "http://localhost:3000/api/webhook",
      };
      
      const paymentData = Instamojo.PaymentData(options);
      console.log('before the payment call')
      const response = await Instamojo.createNewPaymentRequest(paymentData);
      console.log('response is : ', response)
    

}