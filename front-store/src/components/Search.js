import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import ProductPage from './ProductPage'

function Search(props) {
    const [search, setSearch] = useState()
    return (
        <div>
            <Container>

                <h3 className="text-center m-4">Popular Products</h3>
                {/* <input className="p-3 mt-3 mb-4 " type="text" placeholder="Search..." onChange={(e)=>{setSearch(e.target.value)}}/> */}

                <input
                    className="form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    onChange={(e)=>props.searchTerm(e.target.value)}
                />
            </Container>
            {/* <ProductPage/> */}
        </div>
    )
}

export default Search
