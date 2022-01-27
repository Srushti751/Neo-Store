import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import Sidelist from './Sidelist'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useHistory } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';


function Address() {
    const [address, setAddress] = useState([])
    const [selAddress, setSelAddress] = useState([])
    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const username = userData.name

    const history = useHistory();

    const getAddress = () => {
        axios.get(`/api/address/getCustAddress/${username}`).then(res => setAddress(res.data))
        // setloading(false);

    }

   
    const selectAddress = (e) => {
        const data = { add: selAddress }
        { console.log("data", data) }

        axios.post(`/api/address/selectAddress/${username}`, data)
      
       
        toast.info("Address selected")
        alert("Address selected")
        history.push('/checkout')

    }


    useEffect(() => {
        getAddress();


    }, []);

    const deleteAddress = (id) => {
        axios.delete(`/api/address/deleteAddress/${id}`)

    }
    return (
        <Container className="mt-5">
            {console.log("add", selAddress)}


            <Row>
                <Col md={4}>
                    <Sidelist />
                </Col>
                <Col md={8}>
                    <Card>
                        <tr>
                            <th className="profileHead p-2">
                                Address
                            </th>
                        </tr>
                        <hr />
                        {address.map((address) => {
                            return (
                                <Card.Body className="">
                                    <div className="form-check">
                                        <input className="form-check-input" type="radio" name="address" onChange={(e) => setSelAddress(address)} />
                                        <button className=" btn btn-dark btn-sm" onClick={selectAddress} >Confirm</button>



                                        <p>{address.home_address}</p>
                                        <p>{address.state}-{address.pincode}</p>
                                        <p>{address.country}</p>

                                        <tr>
                                            <td><a href={`/updateAddress/${address._id}`}><EditIcon /></a></td>
                                            <td><button onClick={() => deleteAddress(address._id)}><DeleteIcon className="hoverColor m-2 " /></button></td>
                                        </tr>
                                        <hr />
                                    </div>
                                </Card.Body>
                            )
                        })}
                        <tr>
                            <td><a href={`/address`}><button className="btn btn-dark m-2 pr-3">Add Address</button></a></td>
                        </tr>
                <ToastContainer/>

                    </Card>
                </Col>

            </Row>
        </Container>

    )
}

export default Address
