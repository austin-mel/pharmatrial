import React from "react";
import { Form, Button, Card, Alert, Container } from "react-bootstrap";
import { useState } from "react";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseHook'

function FBaseLoggedIn() {
    const logout = async () => {
      try { await signOut(auth); }
        catch (e) { console.error(e); }
      }
    return(
      <Container>
        <t>Logged In</t>
        <Button title="Log out" onPress={logout} />
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
        console.log(pw);
        console.log(pwConfirm);

        try {
            if (pw.toString() === pwConfirm.toString())
              await createUserWithEmailAndPassword(auth, email, pw); 
          } catch (e) { console.log("ERROR") }
    }
    const loginAccount = async () => {
        console.log("test2")
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