import axios from 'axios';
import React, { useState,useEffect } from 'react'
import { Card, Container } from 'react-bootstrap';
import StarRating from '../StarComponent/StarRating';
import { useHistory } from "react-router-dom";

function RateProduct(props) {
    const productId = props.match.params.productId
    let history = useHistory();

   
    const [rating, setRating] = useState(null);
    const getdetails=()=>{
        axios.get(`/api/product/products_by_id?id=${productId}`)
        .then(response => {
            setRating(response.data[0].rating)
        })
    }
    useEffect(() => {
       getdetails()

    },[])

    const rateProd=()=>{
        const data = {rating}
        axios.put(`/api/product/rateProduct/${productId}`,data).then((res)=>{
            history.goBack()
        })
    }

    const handleChange = (value) => {
        setRating(value);

    }
    return (
        <Container className="p-5">
            <Card className="text-center"> 
                <Card.Body>
               Rate this product: <StarRating
                    count={5}
                    size={40}
                    value={rating}
                    activeColor={'red'}
                    inactiveColor={'#ddd'}
                    onChange={handleChange} />
                    </Card.Body>
                    <Card.Body>
                <button className="btn btn-dark" onClick={rateProd}>Submit</button>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default RateProduct
