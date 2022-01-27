import React, { useEffect, useState } from 'react'
import { Col, Row, Container, Card, Button, Nav, Table } from 'react-bootstrap'
import { saveAs } from "file-saver";

import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import Sidelist from './Sidelist'

function Orderdetails() {
  const [orders, setOrders] = useState([])
  const [details, setDetails] = useState([])
  const [address, setAddress] = useState([])

  const subTotal = orders.reduce((x, item) => x + item.product_cost, 0)
  const userState = useSelector(state => state.loginUserReducer)
  const { currentUser } = userState
  const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
  const username = userData.name

  useEffect(() => {
    if (localStorage.getItem('currentUser') != undefined) {
    
      getOrderdetails()

    }
  }, [])


  const getAddress = () => {
      axios.get(`/api/address/getCustAddress/${username}`).then(res => setAddress(res.data))
}


  useEffect(() => {
      getAddress();


  }, []);



  const getOrderdetails = () => {
    const userTok = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const config = {
        headers: {
            authorization: `Bearer ${userTok.token}`

        }
    }
    axios.get(`/checkout/getOrderDetails/${username}`,config)
      .then((response) => {
        const data = response.data
        setDetails(data)
      })
      .catch((err) => {
        console.log("Fetch error", err)
      })
  }

  const createAndDownloadPdf = (user,orderDetails,total) => {
    const payload = {
      user: user,
      orderDetails:orderDetails,
      // address:address[0],
      address: orderDetails[0].address[0],
      total:total
    };
    axios
      .post("/api/create-pdf", payload)
      .then(() => axios.get("/api/fetch-pdf", { responseType: "blob" }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: "application/pdf" });

        saveAs(pdfBlob, "invoice.pdf");
      });
    console.log(payload);
  };

  return (
    <div>
      <Container className="mt-5">
        <Row>
          <Col md={4}>
            <Sidelist />
          </Col>
          <Col md={8}>
            <Card >
              <Card.Body>
                <tr>
                  <th className="profileHead">
                    Order Details
                  </th>
                </tr>
              </Card.Body>
              {details.length > 0 ?
                <>
                  {details.map((det) => {
                    return (
                      <Card.Body className="bg-light m-3">

                        <h3>Order Id:<span className="fw-bold mb-2"> {det._id}</span></h3>
                        <p style={{ fontSize: "13px" }} className="mb-3">Placed on: {det.createdAt}</p>
                        <div className="orderImg">
                          {det.orderDetails.map((ord) => {
                            return (
                              <p >
                              
                                <img  src={ord.product_image} height="100" width="100" className="m-2"/>

                              </p>
                            )
                          })}
                        </div>
                        <Button variant="dark" className="m-3"
                          onClick={() =>
                            createAndDownloadPdf(
                              det.user,
                              det.orderDetails,
                              det.total
                            )
                          }
                        >
                          Download
                        </Button>
                      </Card.Body>

                    )
                  })}
                </> : <p className="m-2 fw-bold">"No orders to show"</p>}
            </Card>
          </Col>
        </Row>


        <a href="/commonProducts" className="btn m-2 text-white" style={{ width: "100%", background: "rgb(55,66,107)" }}>Shop More</a>




      </Container>
    </div>
  )
}

export default Orderdetails




