import React from 'react'
import App from '../../App'
import AddPatient from '../AddPatient'
import MenuBar from '../MenuBar'
import PatientTable from '../PatientTable'
import { Container, Row, Col } from 'react-bootstrap'
import { useEffect } from 'react'

function JHTable() {



    return (
        <div className="jhtable">
            <Container fluid>
                <Row className="header">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-center" style={{display:'flex'}}><img src="https://i.imgur.com/9xdqAdI.png"></img></Col>
                <Col sm={2}></Col>
                </Row>
                <Row className="content">
                    <Col sm={1}></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}><PatientTable/></Col>
                    <Col sm={1}></Col>
                </Row>
                <Row className="content">
                    <Col sm={1}></Col>
                    <Col className="justify-content-md-center" style={{display:'flex'}}></Col>
                    <Col sm={1}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default JHTable;