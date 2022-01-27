import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Col, Row, Card } from 'react-bootstrap'
import Sidelist from './Sidelist'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function ChangePassword() {



    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const username = userData.name

   



    const updateInfo = () => {
        const data = { newPassword, oldPassword, username }
      
        axios.post("/api/users/changePassword", data)
        toast("Password updated")
        setOldPassword("")
        setNewPassword("")
        setConfirm("")
    }


    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col md={4}>
                        <Sidelist />
                    </Col>
                    <Col md={8}>
                        <Card className="bg-light">
                            <Card.Body>
                                <tr>
                                    <th className="profileHead">
                                        Change Password
                                    </th>
                                </tr>
                            </Card.Body>
                            <Card.Body>
                                <Form>

                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

                                        <Col sm="10">
                                            <Form.Control placeholder="Old Password" type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

                                        <Col sm="10">
                                            <Form.Control placeholder="New Password" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

                                        <Col sm="10">
                                            <Form.Control placeholder="Confirm Password" type="password" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
                                            <span style={{ color: "#CE0000", fontSize: "16px" }}>{confirm == "" ? "" : newPassword == confirm ? "" : "Password does not match"}</span>

                                        </Col>
                                    </Form.Group>
                                    <button onClick={updateInfo} className="btn btn-dark">Update</button>
                                    <ToastContainer />

                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


            </Container>


        </div>
    )
}

export default ChangePassword
