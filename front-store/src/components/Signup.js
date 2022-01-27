import React, { useState } from 'react'
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useToast } from "@chakra-ui/toast"
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'

import { registerUser } from '../actions/userAction'

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForfName = RegExp(/^[a-zA-Z '.-]*$/);
const regForPass = RegExp(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()+=-\?;,./{}|\":<>\[\]\\\' ~_]).{8,}/);

function Signup() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [phone, setPhone] = useState("")
  const [dob, setDob] = useState("")
  const toast = useToast()
 

  const dispatch = useDispatch()


  const submitHandler = async (e) => {
    e.preventDefault()
    if (!name || !email || !password || !confirm) {
      toast({
        title: "Please Fill all the Feilds",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    else if (password !== confirm) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
      // alert("Password dont match")
    } else {
      const user = { name, email, password,phone,dob }
      dispatch(registerUser(user))
      console.log(user)
      alert("reg")
    }
  }







  return (
    <div>
      {/* <Container> */}
      <Row>
        <Col >
          <img src="images/signup.jpg" width="800px" height="100%" />
        </Col>
        <Col className="bg-light"  >
          <Container className="p-5 registerStyle ">
            <h2 className="mt-2 formHead ">Register</h2>

            <Form className="registerForm">
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
                <span style={{ color: "#CE0000", fontSize: "16px" }}>{name == "" ? "" : regForfName.test(name) ? "" : "Please enter valid name"}</span>

              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
                <span style={{ color: "#CE0000", fontSize: "16px" }}>{email == "" ? "" : regForEmail.test(email) ? "" : "Email is not valid, abc@gm.com"}</span>

              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                <Form.Label >
                  Mobile
                </Form.Label>
                <Col sm="10">
                  <Form.Control type="number" placeholder="Mobile" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label >Date of Birth </Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                <span style={{ color: "#CE0000", fontSize: "16px" }}>{password == "" ? "" : regForPass.test(password) ? "" : "Password should contain 1 uppercase, digit , special char and should be 8 characters long"}</span>

              </Form.Group>
              <Form.Group className="mb-3" >
                <Form.Label>Confirm</Form.Label>
                <Form.Control type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Password" />
                <span style={{ color: "#CE0000", fontSize: "16px" }}>{confirm == "" ? "" : password == confirm ? "" : "Password does not match"}</span>

              </Form.Group>

             

              <Button variant="primary" onClick={submitHandler} type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Col>
      </Row>
{/* </Container> */}

    </div>
  )
}

export default Signup

