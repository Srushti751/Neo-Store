import React, { useState, useEffect } from 'react'
import { ListGroup, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import DehazeIcon from '@mui/icons-material/Dehaze';
import NotesIcon from '@mui/icons-material/Notes';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';


import axios from 'axios'

function Sidelist() {
    const [profile, setProfile] = useState("")
    const [profileImg, setProfileImg] = useState("")
    const userState = useSelector(state => state.loginUserReducer)
    const { currentUser } = userState
    const getProfile = () => {
        axios.get(`/api/users/userData/${currentUser.name}`)
            .then(response => {
                setProfile(response.data);

                setProfileImg(response.data.profileImg)
            })
    }
    useEffect(() => {
        getProfile()

    }, [])
    return (
        <ListGroup as="ul" variant="flush" >
            {console.log(profile)}
            {console.log(profileImg)}

            {profileImg === null || !profileImg ?
                <img src={`http://localhost:8089/images/profile.png`} height="200" width="200" className="profileImg" />
                :
                <img src={`http://localhost:8089/` + profileImg} height="200" width="200" className="profileImg" />

            }
            <p className="fw-bold text-center">{currentUser.name}</p>
            {/* <img src={`http://localhost:8089/`+profileImg} height="200" width="200" className="profileImg"/> */}
            <a href="/getOrderDetails"><ListGroup.Item style={{ border: "none", textAlign: 'center' }} className="p-3 hoverColor" >
                <NotesIcon className="m-2 " color="primary" fontSize="large" />
                Orders
            </ListGroup.Item></a>
            <a href="/profile"> <ListGroup.Item as="li" style={{ border: "none", textAlign: 'center' }} className="p-3 hoverColor">
                <AccountBoxIcon className="m-2 " color="primary" fontSize="large" />
                Profile
            </ListGroup.Item></a>
            <a href="/getCustAddress"><ListGroup.Item as="li" style={{ border: "none", textAlign: 'center' }} className="p-3 hoverColor" >
                <LibraryBooksIcon className="m-2 " color="primary" fontSize="large" />
                Address
            </ListGroup.Item ></a>
            <a href="/changePassword"><ListGroup.Item as="li" style={{ border: "none", textAlign: 'center' }} className="p-3 hoverColor">
                <CompareArrowsIcon className="m-2 " color="primary" fontSize="large" />
                Change Password</ListGroup.Item></a >
        </ListGroup>
    )
}

export default Sidelist
