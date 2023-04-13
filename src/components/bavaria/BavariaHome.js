import React from 'react'
import App from '../../App'
import MenuBar from '../MenuBar'
import AddPatient from '../AddPatient'
import { Container, Row, Col } from 'react-bootstrap'
import logoHeaderBavaria from '../images/BavariaLogo.jpg'
import Login from '../../firebase/Login'
import SendDrugs from '../SendDrugs'

function BavariaHome() {
    return (
        <div className="bavariahome">
            <Container fluid>
                <Row className="bavheader">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-end" style={{display:'flex'}}><img src={logoHeaderBavaria} height="195" width="195" alt="Bavaria Logo"></img></Col>
                </Row>
                <Row className="content">
                    <Col></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}><SendDrugs /></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default BavariaHome