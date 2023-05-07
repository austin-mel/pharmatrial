import React from "react";
import { Form, Button, Card, Alert, Container, Col, Row, Modal } from "react-bootstrap";
import { useState } from "react";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseHook'
import { updateProfile } from "firebase/auth";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Fab from '@mui/material/Fab';
import StudyTable from "../components/StudyTable";
import AddStudy from "../components/AddStudy";

function FBaseLoggedIn() {
  const [popup, setPopup] = useState("patient");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const logout = async () => {
    try { await signOut(auth); }
    catch (e) { console.error(e); }
  }

  const user = auth.currentUser;

  const email = user.email;
  if (email.substring(email.length - 7) === "fda.gov") {
    visitorType("FDA Admin");
  }
  else if (email.substring(email.length - 15) === "janehopkins.com") {
    if (email === "admin@janehopkins.com") {
      visitorType("JH Admin");
    }
    else {
      visitorType("Doctor");
    }
  }
  else if (email.substring(email.length - 11) === "bavaria.com") {
    visitorType("Bavaria Admin");
  }
  else if (email.substring(email.length - 5) === "gmail.com") {
    visitorType("Patient");
  }

  function visitorType(visitor) {
    updateProfile(auth.currentUser, {
      displayName: visitor
    })
  }

  var access = null;

  if (user !== null) {
    // The user object has basic properties such as display name, email, etc.
    const displayName = user.displayName;

    if (displayName === "Doctor") {
      access = false;
    }
    else if (displayName === "Bavaria Admin") {
      access = false;
    }
    else if (displayName === "JH Admin") {
      access = false;
    }
    else if (displayName === "Patient") {
      access = false;
    }
    else {
      access = true;
    }
  }

  return (
    <div>
      {access === true ? (
        <div className="fdahome">
          <div className="profilebar">
            <Row>
              <Col className="justify-content-md-end" style={{ display: 'flex' }}>
                <p>Logged In!</p>   <AccountCircleRoundedIcon sx={{ mr: 1 }} />
              </Col>
            </Row>
            <Row>
              <Col className="justify-content-md-end" style={{ display: 'flex' }}>
                <h5>Welcome, {user.displayName}!</h5>
              </Col>
              <Col className="justify-content-md-end" style={{ display: 'flex' }} xs="auto">
                <Button variant="danger" onClick={logout}>Log Out</Button>
              </Col>
            </Row>
          </div>
          <div className="fdacontent">
            <Row>
              <Col className="justify-content-md-center" style={{ display: 'flex' }}>
                <Fab color="success" variant="extended" onClick={() => { setShow(true); }} >
                  Create New Study
                </Fab>
              </Col>
            </Row>
            <Row>
              <StudyTable />
            </Row>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create a New Study</Modal.Title>
            </Modal.Header>
            <Modal.Body><AddStudy /></Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>Close</Button>
            </Modal.Footer>
          </Modal>
        </div>
      ) : (
        <div className="errorpage">
          <Row className="justify-content-md-center" style={{ display: 'flex' }}>
            <Col className="justify-content-md-center" style={{ display: 'flex' }}>
              <h3><b>Error! No Access!</b></h3>
            </Col>
          </Row>
          <Row className="justify-content-md-center" style={{ display: 'flex' }}>
            <Button variant="danger" onClick={logout}>Return to Sign In</Button>
          </Row>
        </div>
      )}
    </div>
  );
}

function FBaseSignup() {
  const [format, setFormat] = useState("landing");
  const [email, emailSet] = useState('');
  const [pw, pwSet] = useState('');
  const [pwConfirm, pwConfirmSet] = useState('');

  const createAccount = async () => {
    emailSet(document.getElementById("createEmail").value);
    pwSet(document.getElementById("createPass").value);
    pwConfirmSet(document.getElementById("createConfirmPass").value);

    try {
      if (pw.toString() === pwConfirm.toString()) {
        await createUserWithEmailAndPassword(auth, email, pw);
      }
      else {
        console.log("Passwords don't match")
      }

    } catch (e) { console.log("ERROR") }
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

  return (
    <div className="login">
      {format === "create" ? (
        <Container fluid>
          <Card className="justify-content-md-center" style={{ display: 'flex' }}>
            <Card.Body>
              <Card.Title className="justify-content-md-center" style={{ display: 'flex' }}>Create Account</Card.Title>
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
                <Form.Group className="justify-content-md-center" style={{ display: 'flex' }}>
                  <Button variant="outline-primary" onClick={() => { createAccount(); }}>Create Account</Button>
                </Form.Group>
                <Form.Group className="justify-content-md-center" style={{ display: 'flex' }}>
                  <Form.Text>
                    Already have an account? Login <Alert.Link onClick={() => { setFormat("login"); }}>here</Alert.Link>
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
              <Card.Title className="justify-content-md-center" style={{ display: 'flex' }}>Login</Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="loginEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="loginPass">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="justify-content-md-center" style={{ display: 'flex' }}>
                  <Button variant="outline-primary" onClick={() => { loginAccount(); }}>Login</Button>
                </Form.Group>
                <Form.Group className="justify-content-md-center" style={{ display: 'flex' }}>
                  <Form.Text>
                    Don't have an account? Create one <Alert.Link onClick={() => { setFormat("create"); }}>here</Alert.Link>
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

export default function FDALogin() {
  const [loggedin, loggedinSet] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is logged in
      loggedinSet(true);
    } else {
      // User is not logged in
      loggedinSet(false);
    }
  });

  const screenGet = () => {
    if (loggedin) return <FBaseLoggedIn />;
    return <FBaseSignup />
  }

  return (
    <Container>
      {screenGet()}
    </Container>
  );
}