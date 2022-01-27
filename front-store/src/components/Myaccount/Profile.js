import React,{useState,useEffect} from 'react'
import { Container, Row, Col, Card,ListGroup } from 'react-bootstrap'
import axios from 'axios'
import { useSelector } from 'react-redux'
import Sidelist from './Sidelist'


function Profile() {
    const [profile, setProfile] = useState("")
    const [dob, setDob] = useState("")

    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState

    
    const getProfile = () => {
        const userTok = localStorage.getItem("currentUser") ? JSON.parse(localStorage.getItem("currentUser")) : ""
        const config = {
            headers: {
                authorization: `Bearer ${userTok.token}`

            }
        }
        axios.get(`/api/users/userData/${currentUser.name}`,config)
            .then(response => {
                setProfile(response.data);
                var datestr=response.data.dob;
                datestr = datestr.substr(0, 10)
                setDob(datestr)
            })
    }
    useEffect(() => {
        getProfile()

    }, [])
    return (
        <div>
            <Container className="mt-5">
                <Row>
                    <Col md={4}>
                       <Sidelist/>
                    </Col>
                    <Col md={8}>
                        <Card>
                            <Card.Body className="">
                                <tr>
                                    <th className="profileHead">
                                        Profile
                                    </th>
                                </tr>
                                <hr />
                                <table className="table table-borderless profileTable">


                                    <tr >
                                        <th className="w-20" >Name</th>
                                        <td >{profile.name || currentUser.name}</td>
                                    </tr>
                                    <tr >
                                        <th>Email</th>
                                        <td>{profile.email}</td>
                                    </tr>
                                    <tr >
                                        <th>Phone</th>
                                        <td>{profile.phone}</td>
                                    </tr>
                                    <tr >
                                        <th>Date of Birth</th>
                                        
                                        <td>{dob}</td>
                                    </tr>
                                </table>
                                <hr />
                                <tr>
                                    <td><a href={`/editProfile/${currentUser.name}`}><button className="btn btn-dark mt-2 pr-3">Edit</button></a></td>
                                </tr>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Profile
