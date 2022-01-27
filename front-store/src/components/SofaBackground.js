import React from 'react'
import { Carousel } from 'react-bootstrap'

function SofaBackground() {
    return (
        // <div className="back-img" >
         <> 
            {/* <img className="back-img" src="images/bgg.jpg"/> */}
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="http://localhost:8089/images/sofabg3.jpg"

                        alt="First slide"
                        height
                    />

                </Carousel.Item>
              
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="http://localhost:8089/images/sofabg2.png"

                        alt="Second slide"
                    />


                </Carousel.Item>

            </Carousel>
        </>

    )
}

export default SofaBackground
