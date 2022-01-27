import React from 'react'
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';

export const PaginationDemo = ({ postsPerPage, totalPosts, paginate}) => {
    const pageNumber = []

    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage);i++){
        pageNumber.push(i)
    }
    return (
      <nav aria-label="Page navigation example">
          <ul className="pagination paginateStyle">
              {pageNumber.map((number)=>{
                  return(
                      <li className="page-item page-itemStyle pageNumber">
                          <a href="#" className="page-link " onClick={()=>paginate(number)}>{number}</a>

                      </li>
                  )
              })}
          </ul>
       
      </nav>
      
    )
}



