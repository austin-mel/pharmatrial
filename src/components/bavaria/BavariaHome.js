import React from 'react'
import MenuBar from '../MenuBar'
import { Container, Row, Col, Button } from 'react-bootstrap'
import logoHeaderBavaria from '../images/BavariaLogo.jpg'
import BavariaLogin from '../../firebase/BavariaLogin'

function BavariaHome() {

    return (
        //BAVARIA PAGE
        <div className="bavariahome">
            <Container fluid>
                <Row className="bavheader">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-end" style={{display:'flex'}}><img src={logoHeaderBavaria} height="195" width="195" alt="Bavaria Logo"></img></Col>
                </Row>
                <Row className="content">
                    <Col className="justify-content-md-center" style={{display:'flex'}}><BavariaLogin/></Col>
                </Row>
            </Container>
        </div>
    )
}

export default BavariaHome