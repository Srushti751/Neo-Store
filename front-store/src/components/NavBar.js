import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee,faSearch, faShoppingCart, faUserCircle} from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../actions/userAction'
import axios from 'axios'
import ProductPage from "./ProductPage";
import Search from "./Search";
import { registerUser } from '../actions/userAction'

function NavBar() {
    const dispatch = useDispatch()
    //   const [orders, setOrders] = useState([]);
    const [user, setUser] = useState(null)
    const [orders, setOrders] = useState([])
    const [search, setSearch] = useState("")
    const [products, setProducts] = useState([])

    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState
    const userData = localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem("currentUser")) : ""
    const username = userData.name



    useEffect(() => {
        const getUser = () => {
            fetch("http://localhost:8089/auth/login/success", {
                method: "GET",
                credentials: "include",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
                .then((response) => {
                    if (response.status === 200) return response.json();
                    throw new Error("authentication has been failed!");
                })
                .then((resObject) => {
                    setUser(resObject.user);
                    localStorage.setItem('currentUser', JSON.stringify({ "name": resObject.user.displayName, "token": resObject.token } || { "name": resObject.user.username }))
            
                    axios.put(`api/product/Loginuser/${resObject.user.displayName}`).then(res=>{
                        console.log("user updated")
                    })
                    // const data = { name: resObject.user.displayName }
                    //   axios.post('/api/users/register',data)

                    // dispatch(registerUser(data))
                    // console.log(user)
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        getUser();
    }, []);

    const logout = () => {
        window.open("http://localhost:8089/auth/logout", "_self")
    }

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
        else{
            const { data } = await axios.get(`/api/product/getLocalData/guest`)

            // let cartItem = localStorage.getItem("cartProd") ? JSON.parse(localStorage.getItem("cartProd")) : []
            setOrders(data)
        }
    }

  



    useEffect(() => {
        getOrder()
    }, [])


    return (

        <div className="navbarStyle">


            {console.log(orders)}
            <Navbar bg="dark" variant="dark" expand="lg">
                {/* <Container> */}
                <Navbar.Brand href="#home" className="fw-bold storeLogo">
                    Neo<span className="text-danger">STORE</span>
                </Navbar.Brand>
                <Nav className="me-auto navLinks">

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" >
                        <Nav.Link href="/home" className="navLink">
                            Home
                        </Nav.Link>
                        <Nav.Link href="/commonProducts" className="navLink">
                            Products
                        </Nav.Link>
                        <Nav.Link href="/getOrderDetails" className="navLink">
                            Order
                        </Nav.Link>

                        <form className="d-flex">

                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                onChange={(e) => { setSearch(e.target.value) }}
                            />
                            <button className="btn btn-warning" type="submit">
                                Search
                            </button>
                        </form>
                        {console.log(search)}
                        <Nav.Link href="/cart" className="navLink btn btn-light btn-sm text-dark ">
                            <span className="cartNum">{orders.length}</span>

                            <FontAwesomeIcon  icon={faShoppingCart} size="lg" />

                        </Nav.Link>
                        <li class="nav-item dropdown ">
                            <a
                                class="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                            >
                                <span className="text-white">{user ? user.displayName : currentUser ? currentUser.name : ""}</span>

                                {/* <AccountBoxIcon /> */}
                            <FontAwesomeIcon  icon={faUserCircle} size="lg" />

                            </a>
                            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                {currentUser || user ?
                                    <>
                                        <li>
                                            {user ?
                                                <a to="/"><button className="btn btn-outline-info m-2" onClick={logout}>Logout</button></a>
                                                :
                                                <a to="/"><button className="btn btn-outline-info m-2" onClick={() => { dispatch(logoutUser()) }}>Logout</button></a>

                                            }
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="/profile">
                                                Profile
                                            </a>
                                        </li>
                                    </> :
                                    <>
                                        <li>
                                            <a class="dropdown-item" href="/login">
                                                Login
                                            </a>
                                        </li>
                                        <li>
                                            <a class="dropdown-item" href="/signup">
                                                Register
                                            </a>
                                        </li>
                                    </>
                                }



                            </ul>
                        </li>
                    </Navbar.Collapse>


                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;
