import React from 'react'
import App from '../../App'
import AddPatient from '../AddPatient'
import MenuBar from '../MenuBar'
import Login from '../../firebase/Login'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { useState, } from 'react'
import PatientTable from '../PatientTable'
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import Fab from '@mui/material/Fab';
import FirebaseApp from '../../firebase/FirebaseApp'
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
                    <Col sm={2}></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}><Login/></Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="content">
                    <Col sm={1}></Col>
                    <Col sm={5}></Col>
                    <Col><Button className="justify-content-md-center" style={{display:'flex'}} variant="danger" onClick={() => {setFormat("landing");}}>Tester Button</Button></Col>
                </Row>
            </Container>
            ):
            format === "landing" ? ( 
            
                <Container fluid>
                <Row className="jhheader">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-center" style={{display:'flex'}}><img src="https://i.imgur.com/MRTmSG5.png" width="350" height="200"></img></Col>
                <Col sm={2}></Col>
                </Row>
                <Row className="content">
                    <Col sm={2}></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}></Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="content">
                    <Col sm={2}></Col>
                    <Col><Button className="justify-content-md-center" style={{display:'flex'}} variant="secondary" onClick={() => {setFormat("table");}}>Temp Button 2</Button></Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>
            ) : (
                <Container fluid>
                    <Row className="jhheader">
                    <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}><img src="https://i.imgur.com/MRTmSG5.png" width="350" height="200"></img></Col>
                    <Col sm={2}></Col>
                    </Row>
                    <Row className="content">
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="success" variant="extended" onClick={() => {setPopup("patient"); setShow(true);}} >
                                <PersonAddAlt1RoundedIcon sx={{ mr: 1 }} />Add Patient
                            </Fab>
                        </Col>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {setPopup("appt"); setShow(true);}} >
                                <PersonAddAlt1RoundedIcon sx={{ mr: 1 }} />Add Appointment
                            </Fab>
                        </Col>
                    </Row>
                    <Row className="content">
                        <Col className="justify-content-md-center" style={{display:'flex'}}><PatientTable/></Col>
                    </Row>
                    <Modal show={show} onHide={handleClose}>
                        {popup === "patient" ? (
                            <Container>
                            <Modal.Header closeButton>
                            <Modal.Title>Add a Patient</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><AddPatient/></Modal.Body>
                            <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                            </Container>
                        ) : ( 
                            <Container>
                            <Modal.Header closeButton>
                            <Modal.Title>Add an Appointment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><PatientAppointment/></Modal.Body>
                            <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                            </Container>
                        )}
                    </Modal>
                </Container>
                )

                
        }

        </div>
    );
}

export default JHHome