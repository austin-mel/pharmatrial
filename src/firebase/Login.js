import React from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useState } from "react";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseHook'

function FBaseLoggedIn() {
    const logout = async () => {
      try { await signOut(auth); }
        catch (e) { console.error(e); }
      }
    return(
      <Container>
        <p>Logged In</p>
        <Button varient="primary" onClick={logout}>Log Out</Button>
    </Container>
    );

    
  }

function FBaseSignup(){
    const [format, setFormat] = useState("login");
    const [email, emailSet] = useState('');
    const [pw, pwSet] = useState('');
    const [pwConfirm, pwConfirmSet] = useState('');
    const [error, errorSet] = useState(null);

    const createAccount = async () => {
        emailSet(document.getElementById("createEmail").value);
        pwSet(document.getElementById("createPass").value);
        pwConfirmSet(document.getElementById("createConfirmPass").value);

        try {
            if (pw.toString() === pwConfirm.toString()){
              await createUserWithEmailAndPassword(auth, email, pw); 
            }
            else{
              errorSet("Passwords do not match.");
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
            errorSet('Your email or password was incorrect');
            console.log("Email/Password error");
        } else if (error.code === 'auth/email-already-in-use') {
            errorSet('An account with this email already exists');
            console.log("Email in use");
        } else {
            errorSet('There was a problem with your request');
            console.log("Other error");
        }
        }
    }

    return(
        <div className="login">
            {format === "create" ? (
                <Card style={{ width: '28rem'}}>
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
            ) : (
            <Card style={{ width: '28rem'}}>
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
            )
            }
        </div>
    );
}

export default function Login() {
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
      if (loggedin) return <FBaseLoggedIn/>;
      return <FBaseSignup/>
    }
  
    return (
      <Container>
        {screenGet()}
    </Container>
    );
  }