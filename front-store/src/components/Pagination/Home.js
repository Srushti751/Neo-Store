import React,{useState, useEffect} from 'react'
import axios from 'axios'
// import { Posts } from './Posts'
import { PaginationDemo } from './PaginationDemo'
import ProductPage from '../ProductPage'
import Allproducts from '../Allproducts'
function Home() {
 


    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [postsPerPage, setPostsPerPage] = useState(6)


    const getProducts = () => {
        
    
        axios.get(`/api/product/getProduct`).then(res => setProducts(res.data))
        setLoading(false);
    
      }
      useEffect(() => {
        getProducts();
    
    
      }, []);

    const paginate=(pageNumber)=>setCurrentPage(pageNumber)

    //Getting current page posts
    const indexofLastPost = currentPage * postsPerPage
    const indexofFirstPost = indexofLastPost - postsPerPage
    const currentPosts = products.slice(indexofFirstPost, indexofLastPost)
    return (
        <div>
        
            <ProductPage posts={currentPosts} loading={loading}/>
            {/* <Allproducts posts={currentPosts} loading={loading}/> */}
            <PaginationDemo className="text-center" postsPerPage={postsPerPage} totalPosts={products.length} paginate={paginate}/>
        </div>
    )
}
     
export default Home
