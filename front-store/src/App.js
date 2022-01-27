import logo from './logo.svg';
import React, { lazy, Suspense } from 'react';
import './App.css';
import NavBar from './components/NavBar';
// import ProductPage from './components/ProductPage';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'
import Signup from './components/Signup';
// import Allproducts from './components/Allproducts';
import Login from './components/Login';
import { ChakraProvider } from '@chakra-ui/react'
import Reset from './components/Reset';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import Profile from './components/Myaccount/Profile';
import ProfileEdit from './components/Myaccount/ProfileEdit';
import Addaddress from './components/Myaccount/Addaddress';
import Address from './components/Myaccount/Address';
import AddressEdit from './components/Myaccount/AddressEdit';
import Checkout from './components/Checkout';
import Orderdetails from './components/Myaccount/Orderdetails';
import RateProduct from './components/ProductSection/RateProduct';
import NewPassword from './components/NewPassword';
import ChangePassword from './components/Myaccount/ChangePassword';
import Home from './components/Pagination/Home';
import MapComp from './components/Map/MapComp';
import FooterOther from './components/FooterOther';
const ProductPage = lazy(() => import('./components/ProductPage'))
const Allproducts = lazy(() => import('./components/Allproducts'))


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar />

        <Switch>
          <Route exact path="/home">
            {/* <Background /> */}
            <Suspense fallback={<div>Loading....</div>}>
              <ProductPage />

            </Suspense>
            <ChakraProvider>
              <Footer />
            </ChakraProvider>
          </Route>

          <Route exact path="/">
            {/* <Background /> */}
            <Suspense fallback={<div>Loading....</div>}>
              <ProductPage />

            </Suspense>
            <ChakraProvider>
              <Footer />
            </ChakraProvider>
          </Route>

          {/* <Route exact path="/home">
            <Background />
                <Home />

          </Route> */}

          <Route exact path="/commonProducts">
            <Suspense fallback={<div>Loading....</div>}>
              <Allproducts />


            </Suspense>
           
          </Route>
          <Route exact path="/product/:productId" component={ProductDetails} />


          <Route exact path="/editProfile/:profilename" component={ProfileEdit} />
          <Route exact path="/updateAddress/:aid" component={AddressEdit} />
          <Route exact path="/checkout_by_id/:orderId" component={Checkout} />
          <Route exact path="/rateProduct/:productId" component={RateProduct} />

          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/reset">
            <Reset />
          </Route>
          <Route exact path="/reset/:token">
            <NewPassword />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
          <Route exact path="/changePassword">
            <ChangePassword />
          </Route>
          <Route exact path="/address">
            <Addaddress />
          </Route>
          <Route exact path="/checkout">

            <Checkout />
          </Route>
          <Route exact path="/getCustAddress">
            <Address />
          </Route>

          <Route exact path="/locateUs">
            <MapComp />
          </Route>
          <Route exact path="/getOrderDetails">
            <Orderdetails />
          </Route>
          <Route exact path="/signup">
            <ChakraProvider>
              <Signup />

            </ChakraProvider>
          </Route>
          <Route exact path="/login">
            <ChakraProvider>
              <Login />
            </ChakraProvider>
          </Route>

        </Switch>
        <ChakraProvider>
        <FooterOther />
        </ChakraProvider>


      </Router>
    </div>
  );
}

export default App;
