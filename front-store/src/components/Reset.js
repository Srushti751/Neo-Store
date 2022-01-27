import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col,Row } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Reset() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const history = useHistory();


  const [loading, setLoading] = useState(false);


  const notify = () => toast("Link sent to mail");
  const notifyErr = () => toast("Some thing wrongs");

  const submitHandler = () => {
   

    fetch('/api/users/reset-password',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            email
        })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
        toast("Something went wrong")
        setEmail("")


       }
       else{
        toast("Reset Link sent to mail")
        setEmail("")
      //  alert("Link sent to mail")
       }
    }).catch(err=>{
        console.log(err)
    })

 
  }


  

  return (
    <div>
      
          <Container className="p-5 registerStyle  " >
            <h2 className="formHead text-center">Recover Password</h2>
            <Form className="registerForm">

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
              </Form.Group>


            


              <Button variant="primary" onClick={submitHandler} >
                Submit
              </Button>  
             
              <ToastContainer/>
            
            </Form>
           
           

          </Container>
    </div>
  )
}

export default Reset

