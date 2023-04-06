import React from 'react'
import App from '../../App'
import MenuBar from '../MenuBar'
import AddPatient from '../AddPatient'
import { Container, Row, Col } from 'react-bootstrap'
import logoHeaderFDA from '../images/FDALogo.png'

function FDAHome() {
    return (
        <div className="fdahome">
            <Container fluid>
                <Row className="fdaheader">
                <Col sm={1} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-left" style={{display:'flex'}}><img src={logoHeaderFDA} height="155" width="650"></img></Col>
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

export default FDAHome