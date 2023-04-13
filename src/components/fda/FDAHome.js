import React from 'react'
import App from '../../App'
import MenuBar from '../MenuBar'
import AddPatient from '../AddPatient'
import { Container, Row, Col } from 'react-bootstrap'
import logoHeaderFDA from '../images/FDALogo.png'
import Login from '../../firebase/Login'
import AddDrugs from '../AddDrugs'

function FDAHome() {
    return (
        <div className="fdahome">
            <Container fluid>
                <Row className="fdaheader">
                <Col sm={1} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-left" style={{display:'flex'}}><img src={logoHeaderFDA} height="155" width="650" alt="FDA Logo"></img></Col>
                </Row>
                <Row className="content">
                    <Col></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}><AddDrugs /></Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default FDAHome