import React from 'react'
import App from '../../App'
import MenuBar from '../MenuBar'
import AddPatient from '../AddPatient'
import { Container, Row, Col } from 'react-bootstrap'

function BavariaHome() {
    return (
        <div className="bavariahome">
            <Container fluid>
                <Row className="header">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-center" style={{display:'flex'}}><img src="https://i.imgur.com/xYI3rCe.png"></img></Col>
                <Col sm={2}></Col>
                </Row>
                <Row className="content">
                    <Col sm={2}></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}></Col>
                    <Col sm={2}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default BavariaHome