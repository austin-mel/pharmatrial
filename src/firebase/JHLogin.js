import React from "react";
import { Form, Button, Card, Alert, Container, Col, Row, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './FirebaseHook'
import { updateProfile } from "firebase/auth";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import Fab from '@mui/material/Fab';
import PatientTable from "../components/PatientTable";
import AddPatient from "../components/AddPatient";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import AdminTable from "../components/AdminTable";
import useJaneHopkins from "../hooks/useJaneHopkins";
import AddAppointment from "../components/AddAppointment";

function FBaseLoggedIn() {
    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useJaneHopkins();
    //CREATE ARRAY FOR PATIENTS
    const [patients, setPatients] = useState();

    const [popup, setPopup] = useState("patient");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);

    const logout = async () => {
      try { await signOut(auth); }
        catch (e) { console.error(e); }
      }

        //VENDIA FUNCTION TO GET PATIENTS IN DATABASE
    //STORES PATIENTS FROM DATABASE INTO THE ARRAY ABOVE
  const listPatients = async () => {
    let patientList = await entities.patient.list()
    setPatients(patientList.items);
  };

    const user = auth.currentUser;

      const email = user.email;
      if(email.substring(email.length - 7) === "fda.gov"){
        visitorType("FDA Admin");
      }
      else if(email.substring(email.length - 15) === "janehopkins.com"){
        if(email === "admin@janehopkins.com"){
            visitorType("JH Admin");
        }
        else{
            visitorType("Doctor");
        }
      }
      else if(email.substring(email.length - 11) === "bavaria.com"){
        visitorType("Bavaria Admin");
      }
      else if(email.substring(email.length - 5) === "gmail.com"){
        visitorType("Patient");
      }

      function visitorType(visitor){
        updateProfile(auth.currentUser, {
          displayName: visitor
        })
      }

      var access = null;

      if (user !== null) {
        // The user object has basic properties such as display name, email, etc.
        const displayName = user.displayName;
        
        if(displayName === "FDA Admin"){
            access = "false";
        }
        else if(displayName === "Bavaria Admin"){
            access = "false";
        }
        else if(displayName === "JH Admin"){
            access = "admin";
        }
        else if(displayName === "Patient"){
            access = "patient";
        }
        else{
            access = "doctor";
        }
      }

      useEffect(() => {
        listPatients();
    }, [user.displayName]);

//FUNCTION TO HANDLE INCREASING DOSES BY ONE
const handleMaximumDoses = async () => {

  //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
    {patients?.map((patient, key) => { 
      key={key}
      const name = patient.name;
      const lastName = patient.lastName;
      const dob = patient.dob;
      const insuranceNum = patient.insuranceNumber;
      const height = patient.height;
      const weight = patient.weight;
      const bloodPressure = patient.bloodPressure;
      const bloodType = patient.bloodType;
      const tempterature = patient.temperature;
      const oxSat = patient.oxygenSaturation;
      const address = patient.address;
      const isEligible = patient.isEligible;
      const familyHistory = patient.familyHistory;
      const currentlyEmployed = patient.currentlyEmployed;
      const currentlyInsured = patient.currentInsured;
      const drugID = patient.drugID;
      const studyID = patient.studyID;
      const uuid = patient.uuid;
      const doseNum = "5";
      
      //ADD ICD-10 HEALTH CODE ELIGIBILITY!!
      if(patient.studyID != null){
          maximumDoses();
          }

              async function maximumDoses(){

                //FIND A WAY TO GET A DRUG ID THAT IS AVAILABLE TO BE ASSIGNED (patientID is null)
                //SET _id PARAMETER TO VARIABLE OF THAT DRUG ID
                //WE HAVE THE STUDY ID SAVED AND THE PATIENT ID OF AN ELIGIBLE PATIENT WITHOUT A DRUG ASSIGNED TO IT WE JUST NEED AN AVAILABLE DRUG ID
        
                //VENDIA FUNCTION TO UPDATE A DRUG IN THE DATABASE
                //_id MUST BE SET TO THE ID OF THE DRUG YOU WANT TO EDIT (IDEALLY THE FIRST AVAILABE DRUG FROM ABOVE BUT IT DIDNT WORK)
                const maxDoses = await entities.patient.update(
                  {
                      _id: patient._id,
                      name: name,
                      uuid: uuid,
                      lastName: lastName,
                      dob: dob,
                      insuranceNumber: insuranceNum,
                      height: height,
                      weight: weight,
                      bloodPressure: bloodPressure,
                      bloodType: bloodType,
                      temperature: tempterature,
                      oxygenSaturation: oxSat,
                      address: address,
                      isEligible: isEligible,
                      familyHistory: familyHistory,
                      currentlyEmployed: currentlyEmployed,
                      currentlyInsured: currentlyInsured,
                      drugID: drugID,
                      studyID: studyID,
                      doseNum: doseNum,
                  },
                  {
                    aclInput:{
                      acl:[
                        {
                          principal: {
                            nodes: ["FDA","Bavaria"]
                          },
                          operations: ["ALL"],
                          path: "drugID",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["ALL"],
                          path: "studyID",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["ALL"],
                          path: "doseNum",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "name",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "lastName",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "dob",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "height"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "weight"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "bloodPressure"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "bloodType"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "temperature"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "oxygenSaturation"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "familyHistory"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "currentlyEmployed"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "currentlyInsured"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "isEligible"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "currentMedications"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "allergies"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "icdHealthCodes"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["ALL"],
                          path: "visits"
                        },
                      ],
                    },
                  } 
                );
                console.log(maxDoses);
              }
            })}
  }

//FUNCTION TO HANDLE INCREASING DOSES BY ONE
const handleIncreaseDoses = async () => {

  //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
    {patients?.map((patient, key) => { 
      key={key}
      const name = patient.name;
      const lastName = patient.lastName;
      const dob = patient.dob;
      const insuranceNum = patient.insuranceNumber;
      const height = patient.height;
      const weight = patient.weight;
      const bloodPressure = patient.bloodPressure;
      const bloodType = patient.bloodType;
      const tempterature = patient.temperature;
      const oxSat = patient.oxygenSaturation;
      const address = patient.address;
      const isEligible = patient.isEligible;
      const familyHistory = patient.familyHistory;
      const currentlyEmployed = patient.currentlyEmployed;
      const currentlyInsured = patient.currentInsured;
      const drugID = patient.drugID;
      const studyID = patient.studyID;
      const uuid = patient.uuid;
      const doseNum = patient.doseNum;
      var newDoseNum = parseInt(doseNum);
      var patientCount = 0;
      
      //ADD ICD-10 HEALTH CODE ELIGIBILITY!!
      if(patient.studyID != null){
        patientCount++;
        if(patient.doseNum === "5"){

        }
        else{
          newDoseNum++;
          increaseDoses();
        }
              }

              async function increaseDoses(){

                //FIND A WAY TO GET A DRUG ID THAT IS AVAILABLE TO BE ASSIGNED (patientID is null)
                //SET _id PARAMETER TO VARIABLE OF THAT DRUG ID
                //WE HAVE THE STUDY ID SAVED AND THE PATIENT ID OF AN ELIGIBLE PATIENT WITHOUT A DRUG ASSIGNED TO IT WE JUST NEED AN AVAILABLE DRUG ID
        
                //VENDIA FUNCTION TO UPDATE A DRUG IN THE DATABASE
                //_id MUST BE SET TO THE ID OF THE DRUG YOU WANT TO EDIT (IDEALLY THE FIRST AVAILABE DRUG FROM ABOVE BUT IT DIDNT WORK)
                const assignDrugs = await entities.patient.update(
                  {
                      _id: patient._id,
                      name: name,
                      uuid: uuid,
                      lastName: lastName,
                      dob: dob,
                      insuranceNumber: insuranceNum,
                      height: height,
                      weight: weight,
                      bloodPressure: bloodPressure,
                      bloodType: bloodType,
                      temperature: tempterature,
                      oxygenSaturation: oxSat,
                      address: address,
                      isEligible: isEligible,
                      familyHistory: familyHistory,
                      currentlyEmployed: currentlyEmployed,
                      currentlyInsured: currentlyInsured,
                      drugID: drugID,
                      studyID: studyID,
                      doseNum: newDoseNum.toString(),
                  },
                  {
                    aclInput:{
                      acl:[
                        {
                          principal: {
                            nodes: ["FDA","Bavaria"]
                          },
                          operations: ["ALL"],
                          path: "drugID",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["ALL"],
                          path: "studyID",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["ALL"],
                          path: "doseNum",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "name",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "lastName",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "dob",
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "height"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "weight"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "bloodPressure"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "bloodType"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "temperature"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "oxygenSaturation"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "familyHistory"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "currentlyEmployed"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "currentlyInsured"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "isEligible"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "currentMedications"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "allergies"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["READ"],
                          path: "icdHealthCodes"
                        },
                        {
                          principal: {
                            nodes: ["Bavaria","FDA"]
                          },
                          operations: ["ALL"],
                          path: "visits"
                        },
                      ],
                    },
                  } 
                );
                console.log(assignDrugs);
              }
            })}
  }
      
    return(
        <div>
    {access === "doctor" ? ( 
        <Container fluid>
        <Row>
          <Col className="justify-content-md-end" style={{display:'flex'}}>
            <p>Logged In!</p>   <AccountCircleRoundedIcon/>
          </Col>
        </Row>
        <Row>
          <Col className="justify-content-md-end" style={{display:'flex'}}>
            <div><h5>Welcome, {user.displayName}!</h5></div>
          </Col>
          <Col className="justify-content-md-end" style={{display:'flex'}} xs="auto">
            <Button variant="danger" onClick={logout}>Log Out</Button>
          </Col>
        </Row>
                    <Row>
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
                    <Row>
                      <PatientTable/>
                    </Row>
                    <Modal show={show} onHide={handleClose}>
                        {popup === "patient" ? (
                            <Container>
                            <Modal.Header closeButton>
                            <Modal.Title>Add a Patient</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><AddPatient/></Modal.Body>
                            <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                            </Container>
                        ) : ( 
                            <Container>
                            <Modal.Header closeButton>
                            <Modal.Title>Add an Appointment</Modal.Title>
                            </Modal.Header>
                            <Modal.Body><AddAppointment/></Modal.Body>
                            <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>Close</Button>
                            </Modal.Footer>
                            </Container>
                        )}
                    </Modal>
        </Container>
        ):
        access === "patient" ? ( 
            <Container fluid>
                <p>Test</p>
                <Button variant="danger" onClick={logout}>Return to Sign In</Button>
            </Container>
        ) : 
        access === "admin" ? ( 
          <Container fluid>
          <Row>
            <Col className="justify-content-md-end" style={{display:'flex'}}>
              <p>Logged In!</p>   <AccountCircleRoundedIcon/>
            </Col>
          </Row>
          <Row>
            <Col className="justify-content-md-end" style={{display:'flex'}}>
              <div><h5>Welcome, {user.displayName}!</h5></div>
            </Col>
            <Col className="justify-content-md-end" style={{display:'flex'}} xs="auto">
              <Button variant="danger" onClick={logout}>Log Out</Button>
            </Col>
          </Row>
                      <Row>
        {
        //BUTTON TO ADVANCE DOSES BY ONE [NOT IMPLEMENTED!!!]
        }
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {handleIncreaseDoses();}} >Advance Doses by One</Fab>
                        </Col>
        {
        //BUTTON TO ADVANCE DOSES TO FIVE (COMPLETE) [NOT IMPLEMENTED!!!]
        }
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {handleMaximumDoses();}} >Advance Doses to Complete</Fab>
                        </Col>
        </Row>
        <Row>
          <AdminTable/>
        </Row>
          </Container>
        ) : (
          <Container fluid>
          <Row className="justify-content-md-center" style={{display:'flex'}}>
            <Col className="justify-content-md-center" style={{display:'flex'}}>
            <h3><b>Error! No Access!</b></h3>
            </Col>
          </Row>
          <Row className="justify-content-md-center" style={{display:'flex'}}>
          <Button variant="danger" onClick={logout}>Return to Sign In</Button>
          </Row>
        </Container>
        )}
        </div>
    );
  }

function FBaseSignup(){
    const [format, setFormat] = useState("landing");
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

export default function JHLogin() {
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