import { client } from "../../../lib/client";

export default async function payments(req,res){
    if(req.method=='POST') {
        try {
            const newPayment = {
                _type : 'payments',
                ...req.body
            }

            await client.create(newPayment).then((res)=> {
                console.log(`created ${res}`);
            })

            res.status(200).json({message : 'Payment Received'})
        } catch (error) {
            console.log('error occured inside post catch, error is ', error)
            res.status(500).json({message : error})
        }
    }
    else {
        console.log('this method is not allowed')
        res.status(405).json({message : 'Method not allowed'});
    }
}