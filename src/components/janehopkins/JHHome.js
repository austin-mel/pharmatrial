import React from 'react'
import App from '../../App'
import AddPatient from '../AddPatient'
import MenuBar from '../MenuBar'
import Login from '../../firebase/Login'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { useState, } from 'react'
import PatientTable from '../PatientTable'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import Fab from '@mui/material/Fab';
import PatientAppointment from '../PatientAppointment'
import logoHeaderJH from '../images/JaneHopkinsLogo.png'



function JHHome() {
    const [format, setFormat] = useState("home");
    const [popup, setPopup] = useState("patient");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    return (
        <div className="jhhome">
            {format === "home" ? (
            <Container fluid>
                <Row className="jhheader">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-center" style={{display:'flex'}}><img src={logoHeaderJH} width="350" height="200"></img></Col>
                <Col sm={2}></Col>
                </Row>
                <Row className="content">
                    <Col></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}><Login /></Col>
                    <Col></Col>
                </Row>
            </Container>
            ): (
                <Container>
                    
                </Container>
            )    
        }

        </div>
    );
}

export default JHHome