import React from 'react'
import MenuBar from '../MenuBar'
import { Container, Row, Col, Button } from 'react-bootstrap'
import logoHeaderFDA from '../images/FDALogo.png'
import FDALogin from '../../firebase/FDALogin'

function FDAHome() {

    return (
        //FDA PAGE
        <div className="fdahome">
                <Container fluid>
                <Row className="fdaheader">
                <Col sm={1} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-left" style={{display:'flex'}}><img src={logoHeaderFDA} height="155" width="650" alt="FDA Logo"></img></Col>
                </Row>
                <Row className="content">
                    <Col className="justify-content-md-center" style={{display:'flex'}}><FDALogin/></Col>
                </Row>
                </Container>
        </div>
    )
}

export default FDAHome