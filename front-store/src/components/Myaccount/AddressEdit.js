import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Col, Row, Card } from 'react-bootstrap'
import Sidelist from './Sidelist'

function AddressEdit(props) {
    const [profile, setProfile] = useState([])
    const [homeAddress, setHomeAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const aid = props.match.params.aid
    // const [Product, setProduct] = useState([])

    const getAddress = () => {
        axios.get(`/api/address/address_by_id?id=${aid}`)
            .then(response => {
                setProfile(response.data[0]);
                setHomeAddress(response.data[0].home_address)
                setPincode(response.data[0].pincode)
                setState(response.data[0].state)
                setCountry(response.data[0].country)
            })
    }
    useEffect(() => {
        getAddress()

    }, [])

    const updateInfo = () => {
        const address = { homeAddress, pincode, state, country }
      
        axios.put(`/api/address/updateAddress/${aid}`, address)
        alert("Address updated")
        setHomeAddress("")
        setPincode("")
        setState("")
        setCountry("")
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
                                        Update address
                                    </th>
                                </tr>
                            </Card.Body>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">

                                        <Col sm="10">
                                            <Form.Control placeholder="Address" as="textarea" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

                                        <Col sm="10">
                                            <Form.Control placeholder="Pincode" type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

                                        <Col sm="10">
                                            <Form.Control placeholder="State" type="text" value={state} onChange={(e) => setState(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">

                                        <Col sm="10">
                                            <Form.Control placeholder="Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <button onClick={updateInfo} className="btn btn-dark">Update</button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


            </Container>
            
        </div>
    )
}

export default AddressEdit
