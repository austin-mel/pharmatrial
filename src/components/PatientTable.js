import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Table, Button, Row, Col, Card, Modal, ModalBody, Form, Container } from "react-bootstrap";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import AddHomeRoundedIcon from '@mui/icons-material/AddHomeRounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import LinearProgress from '@mui/material/LinearProgress';
import { isRouteErrorResponse } from "react-router-dom";

function PatientTable() {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = useState();
    const [format, setFormat] = useState("view");

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const [content, setContent] = useState();
    const [filterName, setFilterName] = useState();
    const [filterYear, setFilterYear] = useState();
    const [filterMonth, setFilterMonth] = useState();
    const [filterStatus, setFilterStatus] = useState();

    const [patientID, setPatientID] = useState();
    
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listPatients();
    setLoading("true");
    console.log(loading);
    setTimeout(() => {
      setLoading("false");
    }, 6500);
  }, []);

    const checkFilter = async () => {
      const filterName = document.getElementById("filterName").value;
      const filterYear = document.getElementById("filterYear").value;
      const filterMonth = document.getElementById("filterMonth").value;
      setFilterName(filterName);
      setFilterYear(filterYear);
      setFilterMonth(filterMonth);
    };

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      console.log(patientList.items);
      setPatients(patientList.items);
    };

    const editPatient = async () => {
      
      var familyHistory = document.getElementById("familyHistory").value;
      var currentlyEmployed = document.getElementById("employment").value;
      var currentlyInsured = document.getElementById("insuranceStatus").value;

      console.log((document.getElementById("familyHistory").value));
      console.log((document.getElementById("employment").value));

      if(document.getElementById("familyHistory").value === "on"){
        familyHistory = "Yes";
      }
      if(document.getElementById("employment").value === "on"){
        currentlyEmployed = "Yes";
      }
      if(document.getElementById("insuranceStatus").value === "on"){
        currentlyInsured = "Yes";
      }


      const name = document.getElementById("patientFirstName").value
      const lastName = document.getElementById("patientLastName").value
      const dob = document.getElementById("patientDOB").value
      const address = document.getElementById("patientAddress").value
      const insuranceNumber = document.getElementById("patientInsuranceNum").value
      const height = document.getElementById("patientHeight").value
      const weight = document.getElementById("patientWeight").value
      const bloodPressure = document.getElementById("bloodPressure").value
      const bloodType = document.getElementById("bloodType").value
      const temperature = document.getElementById("temp").value
      const oxygenSaturation = document.getElementById("OSat").value
      const newMedication = {medication: document.getElementById("currentMeds")};
      const newICDHealthCodes = {code: document.getElementById("ICD10")};
      const newAllergies = {allergy: document.getElementById("allergies")};

      const editResponse = await entities.patient.update(
        {
          _id: patientID,
          name,
          lastName,
          dob,
          address,
          insuranceNumber,
          height,
          weight,
          bloodPressure,
          bloodType,
          temperature,
          oxygenSaturation,
          familyHistory,
          currentlyEmployed,
          currentlyInsured
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
            ],
          },
        } 
      );
      console.log(editResponse)
    };

    const editVisits = async () => {
      console.log("test2!");

    };


    return (
        <div className="table">
          <Container>
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
              <Col sm="2" className="justify-content-md-left" style={{display:'flex'}}>
                <Button variant="secondary" onClick={() => {setFilterStatus(false);}}><ClearRoundedIcon/>Clear Filter</Button>
              </Col>
            </Row>
          </Container>
        {loading === "true" ? (
          <Container>
            <Row>
              <Col>
                <LinearProgress />
              </Col>
            </Row>
          </Container>
        ) : (
          <Container>
             {filterStatus === true ? ( 
          <Container className="justify-content-md-center" style={{display:'flex'}}>
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
                {patients?.map((patient, key) => {
                  if(filterMonth === "null"){
                    if(patient.name.includes(filterName) && patient.dob.includes(filterYear)){
                      return(
                        <tr key={key}>
                          <td><Button variant="primary" id={patient.uuid} onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient.uuid);}}><Person2RoundedIcon/>View Patient</Button></td>
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
                          <td>{patient.allergies}</td>
                          <td>{patient.currentMedications}</td>
                          <td>{patient.familyHistory}</td>
                          <td>{patient.currentlyEmployed}</td>
                          <td>{patient.currentlyInsured}</td>
                          <td>{patient.icdHealthCodes}</td>
                      </tr>
          )}}
                  else{
                    if(patient.name.includes(filterName) && patient.dob.includes(filterYear) && patient.dob.includes(filterMonth)){
                      return(
                        <tr key={key}>
                          <td><Button variant="primary" id={patient.uuid} onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient.uuid);}}><Person2RoundedIcon/>View Patient</Button></td>
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
                          <td>{patient.allergies}</td>
                          <td>{patient.currentMedications}</td>
                          <td>{patient.familyHistory}</td>
                          <td>{patient.currentlyEmployed}</td>
                          <td>{patient.currentlyInsured}</td>
                          <td>{patient.icdHealthCodes}</td>
                      </tr>
          )}}
      })}
              </tbody>
            </Table>
          </Container>
) : (
          <Container className="justify-content-md-center" style={{display:'flex'}}>
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
                {patients?.map((patient, key) => {
                  return(
                    <tr key={key}>
                      <td><Button variant="primary" id={patient.uuid} onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient.uuid);}}><Person2RoundedIcon/>View Patient</Button></td>
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
                      <td>{patient.allergies}</td>
                      <td>{patient.currentMedications}</td>
                      <td>{patient.familyHistory}</td>
                      <td>{patient.currentlyEmployed}</td>
                      <td>{patient.currentlyInsured}</td>
                      <td>{patient.icdHealthCodes}</td>
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
  <Container>
    <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    {patients?.map((patient, key) => {
      if(content === patient.uuid){
        return(
            <div key={key}> 
            <Modal.Header closeButton>
            <Modal.Title id={patient.uuid}>{patient.name} {patient.lastName}</Modal.Title>
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
              <Modal.Body>Allergies: <b style={{fontSize: 20}}>{patient.allergies}</b></Modal.Body>
              </Col>
              <Col>
              <Modal.Body>Current Meds: <b style={{fontSize: 20}}>{patient.currentMedications}</b></Modal.Body>
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
              <Modal.Body>ICD-10 Codes: <b style={{fontSize: 20}}>{patient.icdHealthCodes}</b></Modal.Body>
              </Col>
            </Row>
            <Row>
              <Col>
              <Modal.Body>Visits: <b style={{fontSize: 20}}>{}</b></Modal.Body>
              </Col>
            </Row>
            <Modal.Footer>
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
    <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
    {patients?.map((patient, key) => {
      if(content === patient.uuid){
        return(
          <Container key={key}>
          <Modal.Header closeButton>
          <Modal.Title id={patient.uuid}>
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
                <Form.Select aria-label="Blood Type" id="bloodType">
                  <option>Blood Type</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </Form.Select>
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
                <Form.Check type="switch" id="familyHistory" label="Family History?"/>
              </Col>
              <Col>
                <Form.Check type="switch" id="employment" label="Employed?"/>
              </Col>
              <Col>
                <Form.Check type="switch" id="insuranceStatus" label="Insurance?"/>
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