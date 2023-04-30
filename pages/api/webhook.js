import { useStateContext } from "../context/StateContext";
export default async function webhook(req, res) {

    const { formData } = useStateContext();
    const data = req.body;
    console.log(' form data is : ', formData)
    console.log('Webhook data:', data);
  
    // ...
  }
  