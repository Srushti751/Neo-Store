import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col,Row } from 'react-bootstrap';
import { useHistory , useParams} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPassword() {
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [user, setUser] = useState("")
  const history = useHistory();
  const {token} = useParams()

  const [loading, setLoading] = useState(false);


  const notify = () => toast("Link sent to mail");
  const notifyErr = () => toast("Some thing wrongs");

  const submitHandler = () => {
   

    fetch('/api/users/new-password',{
        method:"post",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({
            password,
            token,
            otp
        })
    }).then(res=>res.json())
    .then(data=>{
       if(data.error){
        notifyErr()
       }
       else{
           
       alert("Password updated")
           history.push('/login')
       }
    }).catch(err=>{
        console.log(err)
    })

 
  }


  

  return (
    <div>
      {console.log(token)}
          <Container className="p-5 registerStyle  " >
            <h2 className="formHead">Reset Password</h2>
            <Form className="registerForm">

            <Form.Group className="mb-3" >
                <Form.Label>OTP</Form.Label>
                <Form.Control type="password" value={otp} onChange={(e) => setOtp(e.target.value)} placeholder="Verification Code" />
              </Form.Group>


              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
              </Form.Group>


              <Button variant="primary" onClick={submitHandler} >
                Submit
              </Button><br/>
            
            </Form>
           
           

          </Container>
    </div>
  )
}

export default NewPassword

