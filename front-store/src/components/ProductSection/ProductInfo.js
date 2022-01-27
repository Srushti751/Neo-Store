import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import axios from 'axios'
import { Button, Card } from 'react-bootstrap';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ShareIcon from '@mui/icons-material/Share';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import StarRating from '../StarComponent/StarRating';
import { FacebookShareButton, WhatsappShareButton, TwitterShareButton } from 'react-share'

function ProductInfo(props) {

    const [Product, setProduct] = useState({})
    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState

    let url =`http://localhost:3000/product/${Product._id}`
    let shareUrl = "https://github.com/"

    useEffect(() => {

        setProduct(props.detail)

    }, [props.detail])



    const notify = () => toast("Login to Add to cart");

    const submit = (e, name, image, price) => {
        e.preventDefault();

        const payload = {
            product_name: name,
            product_image: image,
            product_cost: price,
            quantity: 1,
            user: currentUser.name
        }

        axios({
            url: '/api/product/saveOrder',
            method: 'POST',
            data: payload
        })
            .then(() => {
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

    const addCartNouser = (e, name, image, price, quantity) => {
        e.preventDefault();


        const payload = {
            product_name: name,
            product_image: image,
            product_cost: price,
            quantity: 1,
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
            .then(() => {
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
        <div>
            {console.log(url)}
            <Card>
                <Card.Body><h2 className="fw-bold productName">{Product.product_name}</h2>
                    <StarRating
                        count={5}
                        size={20}
                        value={Product.rating}
                        activeColor={'#FFA91B'}
                        inactiveColor={'#ddd'}
                    />
                </Card.Body>

                <hr />
                <Card.Body>Price: <span className="text-success fw-bold">₹{Product.product_cost}</span><br />
                    Color: <span className="text-info fw-bold">{Product.color}</span><br />
                    Category: <span className=" fw-bold">{Product.category_name}</span><br />
                </Card.Body>

                <Card.Body>Share<ShareIcon /><br />
                    <div className="shareIcons">

                        <FacebookShareButton url={shareUrl} className="facebook svg_icons">
                            <FacebookIcon className="facebook svg_icons " />
                        </FacebookShareButton>

                        <TwitterShareButton url={shareUrl} className="twitter svg_icons" >
                            <TwitterIcon className="twitter svg_icons" />
                        </TwitterShareButton>

                        <WhatsappShareButton url={shareUrl} className="whatsapp svg_icons">
                            <WhatsAppIcon className="whatsapp svg_icons" />
                        </WhatsappShareButton>

                    </div>
                </Card.Body>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {currentUser ? <Button onClick={(e) => submit(e, Product.product_name, Product.product_image, Product.product_cost)} className="btn btn-warning m-3">Add to cart</Button>
                        : <>
                            <Button variant="danger" className="btn btn-danger m-3" onClick={(e) => addCartNouser(e, Product.product_name, Product.product_image, Product.product_cost)}>Add to cart</Button>
                            {/* <Button className="btn btn-danger m-3" onClick={notify}>Add to cart</Button> */}
                            <ToastContainer />
                        </>
                    }
                    <a href={`/rateProduct/${Product._id}`}> <Button className="btn btn-dark m-3"

                    >
                        Rate the product
                    </Button></a>

                </div>
           <ToastContainer/>
            </Card>


        </div>
    )
}

export default ProductInfo
