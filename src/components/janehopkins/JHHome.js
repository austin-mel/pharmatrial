import React from 'react'
import App from '../../App'
import AddPatient from '../AddPatient'
import MenuBar from '../MenuBar'
import Login from '../Login'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';


function JHHome() {

    return (
        <div className="jhhome">
            <Container fluid>
                <Row className="header">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-center" style={{display:'flex'}}><img src="https://i.imgur.com/9xdqAdI.png"></img></Col>
                <Col sm={2}></Col>
                </Row>
                <Row className="content">
                    <Col sm={2}></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}><Login/></Col>
                    <Col sm={2}></Col>
                </Row>
                <Row className="content">
                    <Col sm={2}></Col>
                    <Col><Button className="justify-content-md-center" style={{display:'flex'}} variant="success" as={Link} to={'/JHTable'}>Temp Button</Button></Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default JHHome