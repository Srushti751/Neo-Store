import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Row, Form, Container, Card, Button, Nav, Table } from 'react-bootstrap'
import axios from 'axios'
import Popup from './Payment/Popup';
import TextField from '@mui/material/TextField';
import DoneIcon from '@mui/icons-material/Done';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Sidelist from './Myaccount/Sidelist'


function Checkout(props) {
  // const orderId = props.match.params.orderId

  const [orders, setOrders] = useState([])
  const [card, setCard] = useState("")
  const [openPopup, setOpenPopup] = useState(false)
  const [success, setSuccess] = useState(false)
  const [address, setAddress] = useState([])

  const subTotal = orders.reduce((x, item) => x + item.product_cost, 0)
  var cartTotal = 0;

  const orderTotal = subTotal + subTotal * .05
  const userState = useSelector(state => state.loginUserReducer)
  const { currentUser } = userState
  const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
  const username = userData.name





  const getOrder = async () => {
    const userTok = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const config = {
      headers: {
        authorization: `Bearer ${userTok.token}`

      }
    }
    const { data } = await axios.get(`/api/product/getCartData/${username}`, config)
    setOrders(data)

  }

  const getAddress = () => {
    axios.get(`/api/address/getCustAddress/${username}`).then(res => setAddress(res.data))
    // setloading(false);

  }
  useEffect(() => {
    getAddress();
  }, []);

  const removeCart = () => {
    axios.delete(`/api/product/deleteAll/${username}`)

  }

  const submit = (e, card, quantity, orderTotal, name, orderData) => {
    e.preventDefault();
    // if (!card) {
    //   toast("Please fill Card Details")
    //   return;
    // }
    // else 
    if (address.length < 1) {
      toast("Please Add Address")
      return;
    }
    else if (orderData[0].address.length < 1) {
      toast("Please Select One Address")
      return;
    }
    else {
      const payload = {
        card: card,
        quantity: quantity,
        total: orderTotal,
        user: name,
        orderDetails: orderData
      }

      axios({
        url: '/checkout/orderplace',
        method: 'POST',
        data: payload
      })
        .then(() => {
          console.log("data is saved")
          afterClick()
        })
        .catch((err) => {
          console.log("Internal error")
        })
    }
  }


  const afterClick = () => {
    removeCart()
    // window.location.href = "http://localhost:3001/final";
    setSuccess(true)
    setTimeout(() => {
      window.location.href = "http://localhost:3000/commonProducts";

    }, 3000);
  }

  useEffect(() => {
    getOrder()
  }, [])
  return (
    <div>
      <Container>
        <Row>
          {/* {console.log(orders[0].address.length)} */}
          <Col>
            <Card className="m-5 p-3">
              <Card.Title>
                <h2 className="formHead">Check Out</h2>

              </Card.Title>
              <Card.Body>
                <button className="btn btn-info" onClick={() => setOpenPopup(true)}>Pay with card</button>
                <Popup openPopup={openPopup} setOpenPopup={setOpenPopup}>

                  <div className="m-3" >
                    <TextField
                      required
                      onChange={(e) => setCard(e.target.value)}
                      id="standard-textarea"
                      label="Card"
                      value={card}
                    />
                  </div>
                  <div className="m-3">
                    <TextField
                      required
                      id="standard-textarea"
                      label="CVV"
                    />
                    <TextField
                      required
                      id="standard-textarea"
                      label="Expiry "
                    />
                  </div>
                  <div>
                    <button className="btn btn-info " onClick={() => setOpenPopup(false)}>Submit</button>

                  </div>

                </Popup>
               <br/>
               <strong>OR</strong><br/>
                <div className="form-check">

                  <input className="form-check-input" type="radio" />
                  Cash On Delivery
                </div>
                <Form >

                  <Form.Group className="mb-3" >
                    <p style={{ fontSize: "18px", fontWeight: "600", margin: "15px 0" }}> Types of Product</p>
                    <Form.Control type="text" name="quantity" value={orders.length} />

                    <p style={{ fontSize: "18px", fontWeight: "600", margin: "15px 0" }}>   Name of Product:</p>

                    <ol style={{ display: "flex" }}>
                      {orders.map((ord) => {
                        cartTotal += ord.product_cost * ord.quantity

                        return (
                          <>
                            <li className="m-3">{ord.product_name}
                              {/* <img src={ord.product_image} height="60" width="60" /> */}
                              <img src={`http://localhost:8089/` + ord.product_image} height="60" width="60" />
                              <p><span className="fw-bold">₹{ord.product_cost}</span></p></li>
                          </>
                        )
                      })}
                    </ol>

                    <div style={{ display: "flex" }}>
                      <p style={{ fontSize: "18px", fontWeight: "600", margin: "5px 8px" }}>   Sub Total:</p>
                      <p> <span className="fw-bold m-5">Rs.{cartTotal}</span></p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <p style={{ fontSize: "18px", fontWeight: "600", margin: "5px 8px" }}> GST (5%): </p>
                      <p> <span className="fw-bold m-5">Rs.{cartTotal * 0.05}</span></p>
                    </div>

                    <div style={{ display: "flex" }}>
                      <p style={{ fontSize: "18px", fontWeight: "600", margin: "5px 0" }}>   Order Total:</p>
                      <p> <span className="fw-bold m-5">Rs.{cartTotal + cartTotal * 0.05}</span></p>
                    </div>


                  </Form.Group>

                  <a className="btn btn-dark" href={`/getCustAddress`}>Add address</a>


                  <Button onClick={(e) => submit(e, card, orders.length, cartTotal + cartTotal * 0.05, currentUser.name, orders)} variant="warning">Checkout</Button>
                  <Popup setOpenPopup={setSuccess} openPopup={success}>
                    <Card className="p-3 bg-light">
                      <Card.Body >
                        <h3>Your order has been placed Successfully!!</h3>

                      </Card.Body>
                      <Card.Body className="shareIcons" >
                        <DoneIcon className="text-center doneIcon   " />
                      </Card.Body>
                    </Card>
                  </Popup>
                </Form>
                <ToastContainer />
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </Container>

    </div>
  )
}

export default Checkout
