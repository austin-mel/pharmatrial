import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import MenuBar from '../MenuBar'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import logoHeaderJH from '../images/JaneHopkinsLogo.png'
import JHLogin from '../../firebase/JHLogin'


function JHHome() {
    return (
        //JANE HOPKINS PAGE
        <div className="jhhome">
            <div className="jhheader">
                <Col sm={2} className="justify-content-md-left" style={{display:'flex'}}><MenuBar/></Col>
                <Col className="justify-content-md-center" style={{display:'flex'}}><img src={logoHeaderJH} width="350" height="200" alt="JH Logo"></img></Col>
                <Col sm={2}></Col>
                </div>
                <div className="jh">
                    <JHLogin/>
                </div>
        </div>
    );
}
export default JHHome