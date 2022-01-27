import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Card, Button, Nav, Table } from 'react-bootstrap'
import axios from 'axios'
// }
import { ToastContainer, toast } from 'react-toastify';

// import jwt_decode from 'jwt-decode'


function Cart() {
    const [orders, setOrders] = useState([])
    const [quantity, setQuantity] = useState(1)

    const subTotal = orders.reduce((x, item) => x + item.product_cost, 0)
    var cartTotal = 0;
    const [id, setId] = useState("")
    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const username = userData.name

    useEffect(() => {
    
        getOrder()

       
    }, [])

    const notify = () => toast("Login to Checkout");


    const getOrder = async () => {
        const userTok = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : ""
        const config = {
            headers: {
                authorization: `Bearer ${userTok.token}`

            }
        }


        if (userTok.token) {
            const { data } = await axios.get(`/api/product/getCartData/${username}`, config)
            setOrders(data)
        }
        else {
            const { data } = await axios.get(`/api/product/getLocalData/guest`)

            // let cartItem = localStorage.getItem("cartProd") ? JSON.parse(localStorage.getItem("cartProd")) : []
            setOrders(data)
        }

    }

    const deleteorder = (id) => {
        const userTok = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : ""
        const config = {
            headers: {
                authorization: `Bearer ${userTok.token}`

            }
        }
        axios.delete(`/api/product/delete/${id}`, config)
        getOrder()
    }

    const handleDec = (prod_id) => {
        setOrders(cart =>
            cart.map((item) =>
                prod_id === item._id ? { ...item, quantity: item.quantity - (item.quantity>1?1:0) } : item
            )
        );
        updateCartQty(prod_id, "dec")

    }

    const handleInc = (prod_id,stock) => {
        setOrders(cart =>
            cart.map((item) =>
                prod_id === item._id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
        updateCartQty(prod_id, "inc")
    }

    const updateCartQty = (prod_id, scope) => {
        axios.put(`api/product/updateQty/${prod_id}/${scope}`).then(res => {
            if (res.data.success === 200) {
                console.log("success")
            }
        })
    }


    return (
        <div>
            {console.log(orders)}
            <Container className="mt-5">
                <h2 className="formHead mt-5">Shopping Cart</h2>
                <hr className="mb-5 " />
                {orders.length < 1 ?
                    <Card className="p-3">
                        <Card.Title>Your Cart is Empty</Card.Title>
                        <Card.Body>
                            <img src={`http://localhost:8089/images/cart.png`} />
                            To Shop
                            {username ?
                                <a href="/commonProducts" className="btn btn-warning m-2">Click Here</a>
                                :
                                <a href="/login" className="btn btn-warning m-2">Sign In to your account</a>
                            }
                        </Card.Body>
                    </Card> :

                    <Row>

                        <Col xs={3} md={8} >
                            <Table >
                                <thead>
                                    <th>Image</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                    <th>Qty</th>
                                    <th>Action</th>

                                </thead>
                                {orders.map((piz) => {
                                    cartTotal += piz.product_cost* piz.quantity
                                    return (
                                        <thead>
                                            <tr>
                                                {/* <td><img src={piz.product_image} height="100" width="100" /></td> */}
                                                <td><img src={`http://localhost:8089/` + piz.product_image} height="100" width="100" /></td>
                                                <td>{piz.product_name}</td>
                                                <td>{piz.product_cost}</td>
                                                <td>{piz.product_cost*piz.quantity}</td>
                                                <td>
                                                    <button className="btn btn-sm btn-warning"onClick={()=>handleDec(piz._id)}>-</button>
                                                    <span className="p-3">{piz.quantity}</span>
                                                    <button  className="btn btn-sm btn-warning" onClick={()=>handleInc(piz._id,piz.stock)}>+</button>

                                                </td>
                                  
                                                <td><button  onClick={() => deleteorder(piz._id)} className="btn btn-sm  text-white" style={{ width: "100%", background: "rgb(55,66,107)" }}>Delete</button></td>
                                            </tr>
                                           
                                        </thead>)
                                  
                               
                               })}
    

                            </Table>

                        </Col>
                        <Col md={4}>
                            <Card>
                                <tr>
                                    <th className="profileHead p-2">
                                        Review Order
                                    </th>
                                </tr>
                                <hr />
                                <Card.Body>
                                    <table>
                                        <tr>

                                            <td>Sub Total:</td> <td><span className="fw-bold  ">₹ {cartTotal}</span></td></tr>
                                        <tr> <td>GST(5%): </td> <td><span className="fw-bold ">₹ {cartTotal * 0.05}</span></td></tr>
                                        <tr> <td>Order Total: </td> <td><span className="fw-bold ">₹ {cartTotal + cartTotal * 0.05}</span></td></tr>
                                    </table>
                                </Card.Body>
                                <Card.Body>
                                    {/* <a href="/checkout" className="  btnStyle text-white">Checkout</a> */}
                                    {username == undefined ?
                                        <button onClick={notify} className=" btn text-white" style={{ width: "100%", background: "rgb(55,66,107)" }}>Checkout</button> :
                                        <a href="/checkout" className=" btn text-white" style={{ width: "100%", background: "rgb(55,66,107)" }}>Checkout</a>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>}
                <ToastContainer />
            </Container>

        </div>
    )
}

export default Cart




