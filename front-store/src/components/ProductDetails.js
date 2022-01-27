import React, { useState,useEffect } from 'react'
import { Col, Row, Container, Card, Button, Nav } from "react-bootstrap";

import axios from 'axios'
import ProductImage from './ProductSection/ProductImage';
import ProductInfo from './ProductSection/ProductInfo';

function ProductDetails(props) {
    const pid = props.match.params.pid
    const [product, setProduct] = useState([])
    const [toggle, setToggle] = useState(true)
    const productId = props.match.params.productId
    // const [Product, setProduct] = useState([])

    const getdetails=()=>{
        axios.get(`/api/product/products_by_id?id=${productId}`)
        .then(response => {
            setProduct(response.data[0])
        })
    }
    useEffect(() => {
       getdetails()

    },[])


 
    return (
        <div>
            <Container>

            <Row className="m-4">
                <Col md={6}>
                    <ProductImage detail={product}/>
                </Col>
                <Col md={6}>
                    <ProductInfo detail={product}/>
                    <Row>
                        <div style={{display:"flex"}}>
                <button className="fw-bold mt-5" onClick={()=>setToggle(true)}>Description  | </button>
                <button className="fw-bold mt-5" onClick={()=>setToggle(false)}>  Features</button>
                </div>
                {toggle?
                <p  className=" mt-2" >{product.product_desc}</p>:
                <p  className=" mt-2" >{product.product_name}</p>

                
            }
            </Row>
                </Col>
            </Row>
           
            </Container>
        </div>
    )
}

export default ProductDetails
