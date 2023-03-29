import React from 'react'
import App from '../../App'
import MenuBar from '../MenuBar'
import AddPatient from '../AddPatient'
import { Container, Row, Col } from 'react-bootstrap'

function BavariaHome() {
    return (
        <div className="bavariahome">
            <Container fluid>
                <Row className="bavheader">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-end" style={{display:'flex'}}><img src="https://i.imgur.com/4kjMkER.jpg" height="195" width="195"></img></Col>
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