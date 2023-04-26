import { useEffect, useState } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Table, Button, Row, Col, Card, Modal, ModalBody, Form, Container } from "react-bootstrap";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import LinearProgress from '@mui/material/LinearProgress';
import ProgressBar from 'react-bootstrap/ProgressBar';
import Fab from '@mui/material/Fab';
import PatientAppointment from "./PatientAppointment";
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';

function PatientTable() {
  //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useJaneHopkins();
    //CREATE ARRAY FOR PATIENTS
    const [patients, setPatients] = useState();

    //CREATE USE STATE (FOR MODAL POPUP)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    //CREATE USE STATE (FOR CONDITIONAL RENDERING)
    const [format, setFormat] = useState("view");
    //CREATE USE STATE (FOR CONDITIONAL RENDERING)
    const [content, setContent] = useState();
    //CREATE USE STATE (FOR  EACH FILTER TYPE)
    const [filterName, setFilterName] = useState();
    const [filterYear, setFilterYear] = useState();
    const [filterMonth, setFilterMonth] = useState();
    const [filterStatus, setFilterStatus] = useState();

    //CREATE ARRAY FOR PATIENT IDS
    const [patientID, setPatientID] = useState();
    
    //CREATE USE STATE (FOR CONDITIONAL RENDERING)
  const [loading, setLoading] = useState(false);

    //VENDIA FUNCTION TO GET PATIENTS IN DATABASE
    //STORES PATIENTS FROM DATABASE INTO THE ARRAY ABOVE
  const listPatients = async () => {
    let patientList = await entities.patient.list()
    setPatients(patientList.items);
  };

  //RUNS WHEN PAGE LOADS/RELOADS
  useEffect(() => {
    //CALL LISTPATIENTS FUNCTION
    listPatients();
    //RENDER LOADING BAR FOR 6.5 SECONDS TO LET VENDIA RETREIVE DATA
    setLoading("true");
    setTimeout(() => {
      setLoading("false");
    }, 6500);
  }, []);

  //FUNCTION TO RETREIVE VALUES FROM FILTER OPTIONS
  //STORES VALUES IN USESTATE ARRAYS ABOVE (FOR CONDITIONAL RENDERING)
    const checkFilter = async () => {
      const filterName = document.getElementById("filterName").value;
      const filterYear = document.getElementById("filterYear").value;
      const filterMonth = document.getElementById("filterMonth").value;
      setFilterName(filterName);
      setFilterYear(filterYear);
      setFilterMonth(filterMonth);
    };

  //FUNCTION TO EDIT A PATIENT
    const editPatient = async () => {

      //VENDIA FUNCTION TO EDIT PATIENT
      //GET VALUES FROM THE FORM BELOW BY FETCHING IDS FROM FORM
      //_id MUST BE ID OF PATIENT YOU WANT TO EDIT
      const editPatient = await entities.patient.update(
        {
          _id: patientID,
          name: document.getElementById("patientFirstName").value,
          lastName: document.getElementById("patientLastName").value,
          dob: document.getElementById("patientDOB").value,
          address: document.getElementById("patientAddress").value,
          insuranceNumber: document.getElementById("patientInsuranceNum").value,
          height: document.getElementById("patientHeight").value,
          weight: document.getElementById("patientWeight").value,
          bloodPressure: document.getElementById("bloodPressure").value,
          bloodType: document.getElementById("bloodType").value,
          temperature: document.getElementById("temp").value,
          oxygenSaturation: document.getElementById("OSat").value,
          familyHistory: document.getElementById("familyHistory").value,
          currentlyEmployed: document.getElementById("employmentStatus").value,
          currentlyInsured: document.getElementById("insuranceStatus").value,
          allergies: null,
          currentMedications: null,
          icdHealthCodes: null,
        },
        {
          aclInput:{
            acl:[
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
                  nodes: ["JaneHopkins"]
                },
                operations: ["ALL"],
                path: "name"
              },
              {
                principal: {
                  nodes: ["JaneHopkins"]
                },
                operations: ["ALL"],
                path: "lastName"
              },
            ],
          },
        } 
      );
      console.log(editPatient);
    };

    //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE PATIENTTABLE
    return (
        <div className="patienttable">
        {loading === "true" ? (
          <Container>
        {
          //IF LOADING IS TRUE DISPLAY A LINEAR PROGRESS LOADING BAR ON THE PAGE
        }
            <Row>
              <Col>
                <LinearProgress />
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
            {
              //IF LOADING IS FALSE DISPLAY THE FILTER OPTIONS
            }
                        <Row>
              <Col sm="2" className="justify-content-md-end" style={{display:'flex'}}>
                <Button variant="info" onClick={() => {setFilterStatus(true); checkFilter();}}><FilterAltRoundedIcon/>Set Filter</Button>
              </Col>
              <Col>
                <Form.Control placeholder="Name" id="filterName"/>
              </Col>
              <Col>
                <Form.Select id="filterMonth" aria-label="Select Month">
                  <option value="null">Select Month</option>
                  <option value="January">January</option>
                  <option value="February">February</option>
                  <option value="March">March</option>
                  <option value="April">April</option>
                  <option value="May">May</option>
                  <option value="June">June</option>
                  <option value="July">July</option>
                  <option value="August">August</option>
                  <option value="September">September</option>
                  <option value="October">October</option>
                  <option value="November">November</option>
                  <option value="Decemeber">December</option>
                </Form.Select>
              </Col>
              <Col>
                <Form.Control placeholder="Year" id="filterYear"/>
              </Col>
              {
                //BUTTON TO CLEAR FILTER
              }
              <Col sm="2" className="justify-content-md-left" style={{display:'flex'}}>
                <Button variant="secondary" onClick={() => {setFilterStatus(false);}}><ClearRoundedIcon/>Clear Filter</Button>
              </Col>
            </Row>
            {
              //BUTTON TO REFRESH TABLE
            }
            <Row>
              <Button variant="info" onClick={() => {listPatients(); }}>Refresh Table</Button>
            </Row>
             {filterStatus === true ? ( 
          <Container className="justify-content-md-center" style={{display:'flex'}}>
             {
              //IF FILTER IS ENABLED
            }
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                <th></th>
                <th>UUID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Address</th>
                <th>Insurance Number</th>
                <th>Height (cm)</th>
                <th>Weight (lbs)</th>
                <th>Blood Pressure</th>
                <th>Blood Type</th>
                <th>Temperature</th>
                <th>O Saturation</th>
                <th>Allergies</th>
                <th>Current Medications</th>
                <th>Family History</th>
                <th>Employment Status</th>
                <th>Insurance Status</th>
                <th>ICD-10 Health Codes</th>
                </tr>
              </thead>
              <tbody>
                {
                  //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                }
                {patients?.map((patient, key) => {
                  {
                    //IF NAME AND YEAR (BUT NO MONTH SET)
                  }
                  if(filterMonth === "null"){
                    //IF PATIENT'S NAME INCLUDES WHAT IS FILTERED && DOB INCLUDES YEAR FILTERED
                    if(patient.name.includes(filterName) && patient.dob.includes(filterYear)){
                      //RENDER EACH PATIENT TO PAGE THAT FITS FILTER
                      return(
                        <tr key={key}>
                          {
                            //BUTTON TO OPEN MODAL AND VIEW PATIENT INTO
                            //WHEN CLICKED SETSTATE (patientID) TO ID OF PATIENT THAT IS CLICKED ON
                            //WHEN CLICKED SETSTATE (content) TO STORE WHAT PATIENT ID IS CLICKED ON


                            //CURRENTLY CANT DISPLAY currentMedications, allergies, icdHealthCodes, Visits (THEY ARE STORED AS ARRAYS IN VENDIA)
                            //BELOW IS HOW WE ACCESS THE OTHER VARIABLES (SINCE THEY ARE JUST STORED AS STRINGS)
                            //WE HAVE TO DO SOMETHING SIMLIAR TO PATIENTAPPOINTMENT??
                          }
                          <td><Button variant="primary" id={patient.uuid} onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient._id);}}><Person2RoundedIcon/>View Patient</Button></td>
                          <td>{patient.uuid.toString()}</td>
                          <td>{patient.name}</td>
                          <td>{patient.lastName}</td>
                          <td>{patient.dob}</td>
                          <td>{patient.address}</td>
                          <td>{patient.insuranceNumber}</td>
                          <td>{patient.height}</td>
                          <td>{patient.weight}</td>
                          <td>{patient.bloodPressure}</td>
                          <td>{patient.bloodType}</td>
                          <td>{patient.temperature}</td>
                          <td>{patient.oxygenSaturation}</td>
                          <td>{patient.allergies ? patient.allergies.map((item, index) => ( <li key={index}>{item.allergy}<br /></li> )) : null}</td>
                          <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => ( <li key={index}>{item.medication}<br /></li> )) : null}</td>
                          <td>{patient.familyHistory}</td>
                          <td>{patient.currentlyEmployed}</td>
                          <td>{patient.currentlyInsured}</td>
                          <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => ( <li key={index}>{item.code}<br /></li> )) : null}</td>
                      </tr>
          )}}
            //IF NAME AND YEAR AND MONTH ARE SET
                  else{
                    //IF PATIENT'S NAME INCLUDES WHAT IS FILTERED && DOB INCLUDES YEAR FILTERED && MONTH INCLUDES MONTH FILTERED
                    if(patient.name.includes(filterName) && patient.dob.includes(filterYear) && patient.dob.includes(filterMonth)){
                      //RENDER EACH PATIENT TO PAGE THAT FITS FILTER
                      return(
                        
                        <tr key={key}>
                         {
                            //BUTTON TO OPEN MODAL AND VIEW PATIENT INTO
                            //WHEN CLICKED SETSTATE (patientID) TO ID OF PATIENT THAT IS CLICKED ON
                            //WHEN CLICKED SETSTATE (content) TO STORE WHAT PATIENT ID IS CLICKED ON
                          }
                          <td><Button variant="primary" id={patient.uuid} onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient._id);}}><Person2RoundedIcon/>View Patient</Button></td>
                          <td>{patient.uuid}</td>
                          <td>{patient.name}</td>
                          <td>{patient.lastName}</td>
                          <td>{patient.dob}</td>
                          <td>{patient.address}</td>
                          <td>{patient.insuranceNumber}</td>
                          <td>{patient.height}</td>
                          <td>{patient.weight}</td>
                          <td>{patient.bloodPressure}</td>
                          <td>{patient.bloodType}</td>
                          <td>{patient.temperature}</td>
                          <td>{patient.oxygenSaturation}</td>
                          <td>{patient.allergies ? patient.allergies.map((item, index) => ( <li key={index}>{item.allergy}<br /></li> )) : null}</td>
                          <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => ( <li key={index}>{item.medication}<br /></li> )) : null}</td>
                          <td>{patient.familyHistory}</td>
                          <td>{patient.currentlyEmployed}</td>
                          <td>{patient.currentlyInsured}</td>
                          <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => ( <li key={index}>{item.code}<br /></li> )) : null}</td>
                      </tr>
          )}}
      })}
              </tbody>
            </Table>
          </Container>
) : (
  
          <Container className="justify-content-md-center" style={{display:'flex'}}>
            {
              //IF FILTER IS DISABLED
            }
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th></th>
                  <th>UUID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>DOB</th>
                  <th>Address</th>
                  <th>Insurance Number</th>
                  <th>Height (cm)</th>
                  <th>Weight (lbs)</th>
                  <th>Blood Pressure</th>
                  <th>Blood Type</th>
                  <th>Temperature</th>
                  <th>O Saturation</th>
                  <th>Allergies</th>
                  <th>Current Medications</th>
                  <th>Family History</th>
                  <th>Employment Status</th>
                  <th>Insurance Status</th>
                  <th>ICD-10 Health Codes</th>
                </tr>
              </thead>
              <tbody>
                {
                  //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                }
                {patients?.map((patient, key) => {
                  //RENDER EVERY PATIENT
                  return(
                    <tr key={key}>
                   {
                            //BUTTON TO OPEN MODAL AND VIEW PATIENT INTO
                            //WHEN CLICKED SETSTATE (patientID) TO ID OF PATIENT THAT IS CLICKED ON
                            //WHEN CLICKED SETSTATE (content) TO STORE WHAT PATIENT ID IS CLICKED ON
                    }
                      <td><Button variant="primary" onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient._id);}}><Person2RoundedIcon/>View Patient</Button></td>
                      <td>{patient.uuid}</td>
                      <td>{patient.name}</td>
                      <td>{patient.lastName}</td>
                      <td>{patient.dob}</td>
                      <td>{patient.address}</td>
                      <td>{patient.insuranceNumber}</td>
                      <td>{patient.height}</td>
                      <td>{patient.weight}</td>
                      <td>{patient.bloodPressure}</td>
                      <td>{patient.bloodType}</td>
                      <td>{patient.temperature}</td>
                      <td>{patient.oxygenSaturation}</td>
                      <td>{patient.allergies ? patient.allergies.map((item, index) => ( <li key={index}>{item.allergy}<br /></li> )) : null}</td>
                      <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => ( <li key={index}>{item.medication}<br /></li> )) : null}</td>
                      <td>{patient.familyHistory}</td>
                      <td>{patient.currentlyEmployed}</td>
                      <td>{patient.currentlyInsured}</td>
                      <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => ( <li key={index}>{item.code}<br /></li> )) : null}</td>
                    </tr>
                  )
      })}
      </tbody>
      </Table>
  </Container>
)}
          </Container>
        )}

{format === "view" ? (
  <Container fluid> 
  {
    //IF SETSTATE (format) IS VIEW SHOW PATIENT DETAILS
  }
    <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    {
      //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
    }
    {patients?.map((patient, key) => {
      if(content === patient._id){
        //RENDER VALUES AS TEXT
        return(
            <div key={key}> 
            <Modal.Header closeButton>
            <Modal.Title id={patient._id}>{patient.name} {patient.lastName}</Modal.Title>
            </Modal.Header>
            <Row>
              <Col>
                <Modal.Body>DOB: <b style={{fontSize: 20}}>{patient.dob}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Address: <b style={{fontSize: 20}}>{patient.address}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Insurance #: <b style={{fontSize: 20}}>{patient.insuranceNumber}</b></Modal.Body>
              </Col>
            </Row>
            <Row>
              <Col>
              <Modal.Body>Height: <b style={{fontSize: 20}}>{patient.height}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Weight: <b style={{fontSize: 20}}>{patient.weight}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Blood Pressure: <b style={{fontSize: 20}}>{patient.bloodPressure}</b></Modal.Body>
              </Col>
            </Row>
            <Row>
              <Col>
              <Modal.Body>Blood Type: <b style={{fontSize: 20}}>{patient.bloodType}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Temperature: <b style={{fontSize: 20}}>{patient.temperature}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>O Saturation: <b style={{fontSize: 20}}>{patient.oxygenSaturation}</b></Modal.Body>
              </Col>
            </Row>
            <Row>
              <Col>
              <Modal.Body>Allergies: <b style={{fontSize: 20}}>{patient.allergies ? patient.allergies.map((item, index) => (
                <li key={index}>{item.allergy}<br /></li>
              )) : null}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Current Meds: <b style={{fontSize: 20}}>{patient.currentMedications ? patient.currentMedications.map((item, index) => (
                <li key={index}>{item.medication}<br /></li>
              )) : null}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Family History: <b style={{fontSize: 20}}>{patient.familyHistory}</b></Modal.Body>
              </Col>
            </Row>
            <Row>
              <Col>
              <Modal.Body>Employment Status: <b style={{fontSize: 20}}>{patient.currentlyEmployed}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Insurance Status: <b style={{fontSize: 20}}>{patient.currentlyInsured}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>ICD-10 Codes: <b style={{fontSize: 20}}>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => (
                <li key={index}>{item.code}<br /></li>
              )) : null}</b></Modal.Body>
              </Col>
            </Row>
            <Row>
              <Col>
              <Modal.Body>Visits: <b style={{fontSize: 20}}>{patient.visits ? patient.visits.map((item, index) => (
                <div>
                <p key={index}>Date & Time: {item.dateTime}<br /> Notes: {item.notes}<br /> hivViralLoad: {item.hivViralLoad}</p>
                </div>
              )) : null}</b></Modal.Body>
              </Col>
            </Row>
            <Row>
              <Col>
                <Modal.Body>Doses: {patient.doseNum}/5</Modal.Body>
                <Modal.Body><ProgressBar animated now={patient.doseNum*20} variant="success"/></Modal.Body>
              </Col>
            </Row>
            <Modal.Footer>
            {
            //BUTTON TO ENABLE EDITING (CHANGE format SETSTATE TO EDIT)
            //BUTTON TO CLOSE MODAL
            }
            <Button variant="primary" onClick={() => {setFormat("edit");}}><EditRoundedIcon/>Edit Info</Button>
            <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
            </Modal.Footer>
            </div>
        )}
      })}
    </Modal>
  </Container>
) : (
  <Container>
      {
    //IF format SETSTATE IS EDIT THEN SHOW FORM TO ALLOW EDITS
    }
    <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    {
      //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
    }
    {patients?.map((patient, key) => {
      {
        //FINDS PATIENT THAT IS EQUAL TO THE PATIENT PASSED FROM ABOVE (THROUGH content SETSTATE)
      }
      if(content === patient._id){
        //RENDER FORM TO ALLOW EDITS
        return(
          <Container key={key}>
          <Modal.Header closeButton>
          <Modal.Title id={patient._id}>
                <Row>
                  <Col>
                  <Form.Group className="mb-3" controlId="patientFirstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control type="patientFirstName" defaultValue={patient.name}/>
                  </Form.Group>
                  </Col>
                  <Col>
                  <Form.Group className="mb-3" controlId="patientLastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control type="patientLastName" defaultValue={patient.lastName}/>
                  </Form.Group>
                  </Col>
                </Row>
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="patientDOB">
                  <Form.Label>DOB</Form.Label>
                  <Form.Control type="patientDOB" defaultValue={patient.dob}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="patientAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control type="patientAddress" defaultValue={patient.address}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="patientInsuranceNum">
                  <Form.Label>Insurance Number</Form.Label>
                  <Form.Control type="patientInsuranceNum" defaultValue={patient.insuranceNumber}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="patientHeight">
                  <Form.Label>Height</Form.Label>
                  <Form.Control type="patientHeight" defaultValue={patient.height}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="patientWeight">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control type="patientWeight" defaultValue={patient.height}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="bloodPressure">
                  <Form.Label>Blood Pressure</Form.Label>
                  <Form.Control type="bloodPressure" defaultValue={patient.bloodPressure}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="bloodType">
                <Form.Label>Blood Type</Form.Label>
                <Form.Select aria-label="Blood Type" id="bloodType">
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="temp">
                  <Form.Label>Temperature</Form.Label>
                  <Form.Control type="temp" defaultValue={patient.temperature}/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="OSat">
                  <Form.Label>Ox Saturation</Form.Label>
                  <Form.Control type="OSat" defaultValue={patient.oxygenSaturation}/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="familyHistory">
                <Form.Label>Family History?</Form.Label>
                <Form.Select id="familyHistory">
                  <option value="Yes">Yes</option>
                  <option value="No" >No</option>
                </Form.Select>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group className="mb-3" controlId="employmentStatus">
                <Form.Label>Employment Status?</Form.Label>
                <Form.Select id="employmentStatus">
                  <option value="Yes">Yes</option>
                  <option value="No" >No</option>
                </Form.Select>
                </Form.Group>
              </Col>
              <Col>
              <Form.Group className="mb-3" controlId="insuranceStatus">
                <Form.Label>Insurance Status?</Form.Label>
                <Form.Select id="insuranceStatus">
                  <option value="Yes">Yes</option>
                  <option value="No" >No</option>
                </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="allergies">
                  <Form.Label>Allergies</Form.Label>
                  <Form.Control type="allergies"/>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group className="mb-3" controlId="currentMeds">
                  <Form.Label>Current Medications</Form.Label>
                  <Form.Control type="currentMeds"/>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3" controlId="ICD10">
                  <Form.Label>ICD-10 Health Codes</Form.Label>
                  <Form.Control type="ICD10"/>
                </Form.Group>
              </Col>
            </Row>
          <Row>
            <Col>
              <Modal.Body>Visits: <b style={{fontSize: 20}}>{}</b></Modal.Body>
            </Col>
          </Row>
          </Modal.Body>
          <Modal.Footer>
          {
            //BUTTON TO CALL FUNCTION EDIT A PATIENT
            //BUTTON TO CLOSE MODAL
          }
          <Button variant="success" onClick={() => {editPatient(); handleClose(); setFormat("view");}}><SaveRoundedIcon/>Save</Button>
          <Button variant="danger" onClick={() => {handleClose(); setFormat("view");}} ><CloseFullscreenRoundedIcon/>Close</Button>
          </Modal.Footer>
        </Container>
        )}
      })}
    </Modal>
  </Container>
)}
  </div>
)}

export default PatientTable;