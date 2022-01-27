import React from 'react'
import { Carousel } from 'react-bootstrap'

function ChairBackground() {
    return (

<>        {/* <div> */}
            {/* <img className="back-img" src="images/bgg.jpg"/> */}
            <Carousel>
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="http://localhost:8089/images/chairbg1.jpg"

                        alt="First slide"
                        height
                    />

                </Carousel.Item>
              
                <Carousel.Item>
                    <img
                        className="d-block w-100"
                        src="http://localhost:8089/images/chairbg2.jpg"

                        alt="Second slide"
                    />


                </Carousel.Item>

            </Carousel>
        </>

    )
}

export default ChairBackground
