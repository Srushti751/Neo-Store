import React, { useState, useEffect } from "react";
import axios from "axios";
import { Col, Row, Container, Card, Button, Nav } from "react-bootstrap";
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import products from "./products.json";
import NavBar from "./NavBar";
import Search from "./Search";
import { PaginationDemo } from "./Pagination/PaginationDemo";
import SofaBackground from "./SofaBackground";
import ChairBackground from "./ChairBackground";
// import { Button , Card} from 'react-bootstrap'

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [quantity, setQuantity] = useState(1)
  const [msg, setMsg] = useState("")

  const [loading, setloading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("")


  const userState = useSelector(state => state.loginUserReducer)
  const { currentUser } = userState
  const googleUser = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : ""

  //pagination
  const [currentPage, setCurrentPage] = useState(1)
  const [postsPerPage, setPostsPerPage] = useState(6)
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  //Getting current page products
  const indexofLastProd = currentPage * postsPerPage
  const indexofFirstProd = indexofLastProd - postsPerPage
  const currentProd = products.slice(indexofFirstProd, indexofLastProd)



  const getProducts = async () => {
    // const userTok = localStorage.getItem("currentUser")?JSON.parse(localStorage.getItem("currentUser")):""
    // const config={
    //     headers:{
    //       authorization : `Bearer ${userTok.token}`

    //     }
    // }
    const { data } = await axios.get(`/api/product/getProduct`)
    setProducts(data)
    setloading(false);

    // axios.get(`/api/product/getProduct`).then(res => setProducts(res.data))
    // setloading(false);

  }
  useEffect(() => {
    getProducts();


  }, []);

  const notify = () => toast("Login to Add to cart");

  const submit = (e, name, image, price, quantity) => {
    e.preventDefault();

    const payload = {
      product_name: name,
      product_image: image,
      product_cost: price * quantity,
      quantity: quantity,
      user: currentUser.name || googleUser.name
    }


    axios({
      url: '/api/product/saveOrder',
      method: 'POST',
      data: payload
    })
      .then((res) => {

        console.log("data is saved");
        let cartItem = localStorage.getItem("cartProd") ? JSON.parse(localStorage.getItem("cartProd")) : []
        cartItem.push(payload)
        localStorage.setItem("cartProd", JSON.stringify(cartItem))
        window.location.reload();
      })
      .catch((err) => {
        // console.log("Internal error")
        toast.info("Already exists in cart")
      })
  }

  const addCartNouser = (e, name, image, price, quantity) => {
    e.preventDefault();


    const payload = {
      product_name: name,
      product_image: image,
      product_cost: price,
      quantity: quantity,
      user: "guest"
    }

    let cartItem = localStorage.getItem("cartProd") ? JSON.parse(localStorage.getItem("cartProd")) : []
    cartItem.push(payload)
    localStorage.setItem("cartProd", JSON.stringify(cartItem))

    axios({
      url: '/api/product/saveOrder',
      method: 'POST',
      data: payload
    })
      .then((res) => {
        console.log(res.data)

        console.log("data is saved");
        // let cartItem=localStorage.getItem("cartProd")?JSON.parse(localStorage.getItem("cartProd")):[]
        // cartItem.push(payload)
        // localStorage.setItem("cartProd",JSON.stringify(cartItem))
        window.location.reload();
      })
      .catch((err) => {
        // console.log("Internal error")
        toast.info("Already exists in cart")

      })
  }

  return (
    <>

      <ChairBackground />
      <Container className="text-center">


        <Row className="p-4" >


          {products.filter((prod) => { return prod.category_name == "chair" }).map((piz) => {
            return (
              <Col xs={8} md={6} lg={4}>
                <Card
                  style={{ width: "18rem", margin: "10px", padding: "10px" }}
                >
                  <Card.Img
                    variant="top"
                    // src={piz.product_image}
                    src={`http://localhost:8089/` + piz.product_image}
                    height="200"
                    width="300"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>  <Link to={`/product/${piz._id}`}>{piz.product_name}</Link></Card.Title>
                    <Card.Text >
                      {piz.stock > 1 ? <span style={{ color: "green" }}>In stock</span> : <span style={{ color: "red" }}>Out of stock</span>}
                    </Card.Text>
                    <Card.Text style={{ fontWeight: "600", fontSize: "22px" }}>
                      ₹{piz.product_cost * quantity}
                    </Card.Text>

                    <div style={{ display: "flex", flexDirection: "column" }}>


                      {currentUser || googleUser ? <Button onClick={(e) => submit(e, piz.product_name, piz.product_image, piz.product_cost, quantity)} variant="warning">Add to cart</Button>
                        : <>
                          <Button variant="danger" onClick={(e) => addCartNouser(e, piz.product_name, piz.product_image, piz.product_cost, quantity)}>Add to cart</Button>

                          <ToastContainer />
                        </>
                      }
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <ToastContainer />
      </Container>

      <SofaBackground />
      <Container className="text-center">

        <Row className="p-4" >


          {products.filter((prod) => { return prod.category_name == "sofa" }).map((piz) => {
            return (
              <Col xs={8} md={6} lg={4}>
                <Card
                  style={{ width: "18rem", margin: "10px", padding: "10px" }}
                >
                  <Card.Img
                    variant="top"
                    // src={piz.product_image}
                    src={`http://localhost:8089/` + piz.product_image}
                    height="200"
                    width="300"
                  />
                  <Card.Body className="text-center">
                    <Card.Title>  <Link to={`/product/${piz._id}`}>{piz.product_name}</Link></Card.Title>
                    <Card.Text >
                      {piz.stock > 1 ? <span style={{ color: "green" }}>In stock</span> : <span style={{ color: "red" }}>Out of stock</span>}
                    </Card.Text>
                    <Card.Text style={{ fontWeight: "600", fontSize: "22px" }}>
                      ₹{piz.product_cost * quantity}
                    </Card.Text>

                    <div style={{ display: "flex", flexDirection: "column" }}>


                      {currentUser || googleUser ? <Button onClick={(e) => submit(e, piz.product_name, piz.product_image, piz.product_cost, quantity)} variant="warning">Add to cart</Button>
                        : <>
                          <Button variant="danger" onClick={(e) => addCartNouser(e, piz.product_name, piz.product_image, piz.product_cost, quantity)}>Add to cart</Button>

                          <ToastContainer />
                        </>
                      }
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>

        <ToastContainer />
      </Container>
    </>
  );
}

export default ProductPage;
