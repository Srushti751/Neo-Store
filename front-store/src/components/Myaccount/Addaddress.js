import React,{useState} from 'react'
import { Container, Row, Col, Card ,Form,Button} from 'react-bootstrap'
import { useDispatch,useSelector } from 'react-redux'
import axios from 'axios'
import Sidelist from './Sidelist'

function Addaddress(){
    const [profile, setProfile] = useState([])
    const [homeAddress, setHomeAddress] = useState("")
    const [pincode, setPincode] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const userState = useSelector(state=>state.loginUserReducer)
    const {currentUser} = userState
  
    const submit=(e,homeAddress,pincode,state,country)=>{
        e.preventDefault();
  
        const payload ={
            home_address: homeAddress,pincode,state,country,user:currentUser.name
        }
        
      axios({
        url:'/api/address/address',
        method:'POST',
        data:payload
      })
      .then(()=>{
        console.log("data is saved");
    
        window.location.reload();
      })
      .catch((err)=>{
        console.log("Internal error")
      })
  }

  


    return (
        <div>
            <Container className="m-5">
                <Row>
                    <Col>
                    <Sidelist/>
                    </Col>
                    <Col md={6}>
                        <Card className="bg-light">
                            <Card.Body>
                            <tr>
                                    <th className="profileHead">
                                        Add Address
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
                                        <Form.Control  placeholder="Pincode"type="number" value={pincode} onChange={(e) => setPincode(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    
                                    <Col sm="10">
                                        <Form.Control  placeholder="State" type="text" value={state} onChange={(e) => setState(e.target.value)} />
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                    
                                    <Col sm="10">
                                        <Form.Control placeholder="Country" type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                                    </Col>
                                </Form.Group>
                    <Button onClick={(e)=>submit(e,homeAddress,pincode,state,country)} className="btn btn-dark">Add</Button>

                            </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


            </Container>
 

        </div>
    )
}

export default Addaddress
