import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Container, Form, Col, Row, Card } from 'react-bootstrap'
import Sidelist from './Sidelist'



function ProfileEdit(props) {
    const pid = props.match.params.pid
    const [profile, setProfile] = useState([])
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [dob, setDob] = useState("")
    const [profileImg, setProfileImg] = useState("")
    const [uploadedFile, setUploadedFile] = useState(null)
    const profilename = props.match.params.profilename


    // const [Product, setProduct] = useState([])

    const getProfile = () => {
        axios.get(`/api/users/profile_by_name?id=${profilename}`)
            .then(response => {
                setProfile(response.data);
                setName(response.data[0].name)
                setEmail(response.data[0].email)
                setPhone(response.data[0].phone)
                setDob(response.data[0].dob)
                // setProfileImg(response.data[0].profileImg)
            })
    }
    useEffect(() => {
        getProfile()

    }, [])

    // const updateInfo = () => {
    //     // const formData=new FormData();
    //     // formData.append("profileImage",uploadedFile);
    //     const profile = { name, email, uploadedFile }
    //     const data = JSON.parse(localStorage.getItem("currentUser"))
    //     data.name = name;
    //     data.email = email;
    //     localStorage.setItem('currentUser', JSON.stringify(data))
    //     axios.put("/api/users/updateProfile", profile)
    //     alert("Company Name updated")
    //     setName("")
    // }
    const changeProfileImage = (event) => {

        setUploadedFile(event.target.files[0]);
    }

    const UpdateProfileHandler = (e) => {
        e.preventDefault();
        //create object of form data
        const formData = new FormData();
        formData.append("profileImage", uploadedFile);
        formData.append("name", name);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("dob", dob);


        const data = JSON.parse(localStorage.getItem("currentUser"))
        data.name = name;
        data.email = email;
        localStorage.setItem('currentUser', JSON.stringify(data))
    
        axios.put("/api/users/updateProfile", formData, {
            headers: {
                "content-type": "application/json"
            }
        }).then(res => {
            console.log(res);
            setProfileImg(res.data.results.profileImage);
            setName("")
            setEmail("")
            window.location.reload();
            
        }).catch(err => console.log(err))
    }


    return (
        <div>
            {console.log(profile)}
            <Container className="mt-5">
                <Row>
                    <Col md={4}>
                        <Sidelist />
                    </Col>
                    <Col md={8}>
                        <Card className="bg-light">
                            <Card.Body>
                                <tr>
                                    <th className="profileHead">
                                        Update Profile
                                    </th>
                                </tr>
                            </Card.Body>
                            <Card.Body>
                                <Form>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
                                        <Form.Label column sm="2">
                                            Name
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" disabled value={name} onChange={(e) => setName(e.target.value)} />
                                        </Col>
                                    </Form.Group>

                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label column sm="2">
                                            Email
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
                                        <Form.Label column sm="2">
                                            Mobile
                                        </Form.Label>
                                        <Col sm="10">
                                            <Form.Control type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label >Date of Birth </Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={dob}
                                            onChange={(e) => setDob(e.target.value)}
                                        />
                                    </Form.Group>


                                    <Form.Group controlId="formCategory4">
                                        <Form.Label>Profile Image</Form.Label>
                                        <Form.Control type="file" name="profileImage" onChange={changeProfileImage} />
                                    </Form.Group>

                                    <button onClick={UpdateProfileHandler} className="btn btn-dark">Update</button>
                                    {/* <button onClick={updateInfo} className="btn btn-dark">Update</button> */}
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>


            </Container>
        </div >
    )
}

export default ProfileEdit
