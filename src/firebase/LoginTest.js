import React from "react";
import { Form, Button, Card, Alert, Container, Col, Row, Modal } from "react-bootstrap";
import { useState } from "react";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseHook'
import { getAuth, updateProfile } from "firebase/auth";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import Fab from '@mui/material/Fab';
import PatientTable from "../components/PatientTable";
import PatientAppointment from "../components/PatientAppointment";
import AddPatient from "../components/AddPatient";

function FBaseLoggedIn(type) {
    const [popup, setPopup] = useState("patient");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const logout = async () => {
      try { await signOut(auth); }
        catch (e) { console.error(e); }
      }

      const test = {type};
      console.log(test.type)
      //const test2 = {visitor}.toString();
      //console.log(test);
      //console.log(test2);

      const auth = getAuth();

      updateProfile(auth.currentUser, {
        displayName: test.type
      })
      
      const user = auth.currentUser;
      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        const email = user.email;
      
        console.log(displayName);
        console.log(email);
      }
      
    return(
      <Container>
        <p>Logged In</p>
        <Row>
          <Col className="justify-content-md-end" style={{display:'flex'}}>
            <div><h5>Welcome, {user.displayName}!</h5></div>
          </Col>
          <Col className="justify-content-md-end" style={{display:'flex'}} xs="auto">
            <Button varient="danger" onClick={logout}>Log Out</Button>
          </Col>
        </Row>
        <Container fluid>
                    <Row className="content">
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="success" variant="extended" onClick={() => {setPopup("patient"); setShow(true);}} >
                                <PersonAddAlt1RoundedIcon sx={{ mr: 1 }} />Add Patient
                            </Fab>
                        </Col>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {setPopup("appt"); setShow(true);}} >
                                <PersonAddAlt1RoundedIcon sx={{ mr: 1 }} />Add Appointment
                            </Fab>
                        </Col>
                    </Row>
                    <Row className="content">
                        <Col className="justify-content-md-center" style={{display:'flex'}}><PatientTable/></Col>
                    </Row>
                    <Modal show={show} onHide={handleClose}>
                        {popup === "patient" ? (
                            <Container fluid>
                            <Modal.Header closeButton>
                            <Modal.Title>Add a Patient</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><AddPatient/></Modal.Body>
                            <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                            </Container>
                        ) : ( 
                            <Container fluid>
                            <Modal.Header closeButton>
                            <Modal.Title>Add an Appointment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><PatientAppointment/></Modal.Body>
                            <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                            </Container>
                        )}
                    </Modal>
                </Container>
      </Container>
    );

    
  }

function FBaseSignup(){
    const [format, setFormat] = useState("login");
    const [email, emailSet] = useState('');
    const [pw, pwSet] = useState('');
    const [pwConfirm, pwConfirmSet] = useState('');

    const createAccount = async () => {
        emailSet(document.getElementById("createEmail").value);
        pwSet(document.getElementById("createPass").value);
        pwConfirmSet(document.getElementById("createConfirmPass").value);

        try {
            if (pw.toString() === pwConfirm.toString()){
              await createUserWithEmailAndPassword(auth, email, pw); 
            }
            else{
              console.log("Passwords don't match")
            }
              
          } catch (e) { console.log("ERROR")}
    }

    const loginAccount = async () => {
      emailSet(document.getElementById("loginEmail").value);
      pwSet(document.getElementById("loginPass").value);


      try {
        await signInWithEmailAndPassword(auth, email, pw);
        }
        catch (error) {
        if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password') {
            console.log("Email/Password error");
        } else if (error.code === 'auth/email-already-in-use') {
            console.log("Email in use");
        } else {
            console.log("Other error");
        }
        }
    }

    return(
        <div className="login">
            {format === "create" ? (
              <Container fluid>
                <Card className="justify-content-md-center" style={{display:'flex'}}>
                <Card.Body>
                    <Card.Title className="justify-content-md-center" style={{display:'flex'}}>Create Account</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="createEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createPass">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="createConfirmPass" >
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                        <Button variant="outline-primary" onClick={() => {createAccount();}}>Create Account</Button>
                        </Form.Group>
                        <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                        <Form.Text>
                            Already have an account? Login <Alert.Link onClick={() => {setFormat("login");}}>here</Alert.Link>
                        </Form.Text>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            </Container>
            ) : (
            <Container fluid>
            <Card>
                <Card.Body>
                    <Card.Title className="justify-content-md-center" style={{display:'flex'}}>Login</Card.Title>
                    <Form>
                        <Form.Group className="mb-3" controlId="loginEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="loginPass">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" />
                        </Form.Group>
                        <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                        <Button variant="outline-primary" onClick={() => {loginAccount();}}>Login</Button>
                        </Form.Group>
                        <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                        <Form.Text>
                            Don't have an account? Create one <Alert.Link onClick={() => {setFormat("create");}}>here</Alert.Link>
                        </Form.Text>
                        </Form.Group>
                    </Form>
                </Card.Body>
            </Card>
            </Container>
            )
            }
        </div>
    );
}

export default function LoginTest() {
    const [loggedin, loggedinSet] = useState("landing");
  
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is logged in
        if(visitor === "Patient"){
          loggedinSet("patient");
        }
        else{
          loggedinSet("doctor");
        }
      } else {
        // User is not logged in
        loggedinSet("landing");
      }
    });

    //<Button variant="outline-success" onClick={() => {setVisitor("Doctor"); setLanding("false");}} >I Am a Doctor</Button>
    //<Button variant="outline-danger" onClick={() => {setVisitor("Patient"); setLanding("false");}} >I am a Patient</Button>
    
    const [visitor, setVisitor] = useState("");
    //const [landing, setLanding] = useState(true);
    //console.log(visitor);

    function setVisitorType(type) {
      const test1 = {type};
      setVisitor(test1.type)
    }
    
    

    return (
      <div className="content">
        {loggedin === "patient" ? (
          <Container fluid>
            <FBaseLoggedIn type={"Patient"}/>
          </Container>
        ): 
        loggedin === "doctor" ? (
          <Container fluid>
            <FBaseLoggedIn type={"Doctor"}/>
          </Container>
        ):
        loggedin === "landing" ? (
          <Container fluid>
            <Button variant="outline-danger" onClick={() => setVisitorType("Patient")}>I am a Patient</Button>
          </Container>
        ) : (
          <Container fluid>
            <FBaseSignup/>
          </Container>
        )
        }
        </div>
    );
  }