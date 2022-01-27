import React, { useEffect, useState } from 'react'
import { Form, Button, Container, Col, Row } from 'react-bootstrap';
import { useToast } from "@chakra-ui/toast"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import { loginUser,registerUser } from '../actions/userAction'
import GoogleIcon from '@mui/icons-material/Google';
import { useHistory } from "react-router-dom";


const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForPass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);

function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState("")
  const dispatch = useDispatch()
  const history = useHistory();



  const toast = useToast();
  const [loading, setLoading] = useState(false);




  const submitHandler = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }

    else {

      const user = { email, password }
      dispatch(loginUser(user))
      setEmail("")
      setPassword("")
      // history.push("/home");


    }


  };


  const google = () => {
    window.open("http://localhost:8089/auth/google", "_self");
   
  }

  const github = () => {
    window.open("http://localhost:8089/auth/github", "_self");
    // localStorage.setItem('currentUser',JSON.stringify(response.data))
  }
  const facebook = () => {
    window.open("http://localhost:8089/auth/facebook", "_self");
    // localStorage.setItem('currentUser',JSON.stringify(response.data))
  }

  return (
    <div>
      <Container className="bg-light">
        <Row>

          <Col md={5} className="socialLogin">
            <Button className="p-3" variant="danger" onClick={google} >
              Google
            </Button>
            <Button className="p-3 " onClick={google} >
              Facebook
            </Button>
            <Button className="p-3 github text-white" variant="secondary" onClick={google} >
              Github
            </Button>
          </Col>

          <Col className="bg-light" md={7}>
            <Container className="p-5 registerStyle  " >
              <h2 className="formHead">Login</h2>
              <Form className="registerForm">

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                  <span style={{ color: "#CE0000", fontSize: "16px" }}>{email == "" ? "" : regForEmail.test(email) ? "" : "Email is not valid, abc@gm.com"}</span>
                </Form.Group>


                <Form.Group className="mb-3" >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                  <span style={{ color: "#CE0000", fontSize: "16px" }}>{password == "" ? "" : regForPass.test(password) ? "" : "Password should contain 1 uppercase, digit , special char and should be 8 characters long"}</span>

                </Form.Group>


                <Button variant="primary" onClick={submitHandler} >
                  Submit
                </Button><br />
                <div style={{ display: "flex" }}>
                  <a href="/signup " className=" regisLink">Register Now </a>
                  <a href="/reset " className=" regisLink"> | Forgot Password?</a>
                </div>
              </Form>



            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login

