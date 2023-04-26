import { useEffect, useState } from "react";
import useFDA from "../hooks/useFDA";
import { Table, Button, Row, Col, Modal, Form, Container, ProgressBar } from "react-bootstrap";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import LinearProgress from '@mui/material/LinearProgress';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';



function TestTable() {
    const { entities } = useFDA();
    const [patients, setPatients] = useState();

    const [content, setContent] = useState();
  //CREATE ARRAY FOR PATIENT IDS
  const [patientID, setPatientID] = useState();

        //CREATE USE STATE (FOR MODAL POPUP)
        const [show, setShow] = useState(false);
        const handleClose = () => setShow(false);
        const handleOpen = () => setShow(true);

    const [filterYear, setFilterYear] = useState();
    const [filterMonth, setFilterMonth] = useState();
    const [filterStatus, setFilterStatus] = useState(false);
    
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
      const filterYear = document.getElementById("filterYear").value;
      const filterMonth = document.getElementById("filterMonth").value;
      setFilterYear(filterYear);
      setFilterMonth(filterMonth);
    };

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      console.log(patientList.items);
      setPatients(patientList.items);
    };

    return (
        <div className="table">
          <Container fluid>
            <Row>
              <Col sm="2" className="justify-content-md-end" style={{display:'flex'}}>
                <Button variant="info" onClick={() => {setFilterStatus(true); checkFilter();}}><FilterAltRoundedIcon/>Set Filter</Button>
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
                <th>Patient #</th>
                <th>DOB</th>
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
                    if(patient.dob.includes(filterYear)){
                      return(
                        <tr key={key}>
                          <td><Button variant="primary" onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient._id);}}><Person2RoundedIcon/>View Patient</Button></td>
                          <td>{patient.uuid}</td>
                          <td>{patient.dob}</td>
                          <td>{patient.height}</td>
                          <td>{patient.weight}</td>
                          <td>{patient.bloodPressure}</td>
                          <td>{patient.bloodType}</td>
                          <td>{patient.temperature}</td>
                          <td>{patient.oxygenSaturation}</td>
                          <td></td>
                          <td></td>
                          <td>{patient.familyHistory}</td>
                          <td>{patient.currentlyEmployed}</td>
                          <td>{patient.currentlyInsured}</td>
                          <td></td>
                      </tr>
          )}}
                  else{
                    if(patient.dob.includes(filterYear) && patient.dob.includes(filterMonth)){
                      return(
                        <tr key={key}>
                          <td><Button variant="primary" onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient._id);}}><Person2RoundedIcon/>View Patient</Button></td>
                          <td>{patient.uuid}</td>
                          <td>{patient.dob}</td>
                          <td>{patient.height}</td>
                          <td>{patient.weight}</td>
                          <td>{patient.bloodPressure}</td>
                          <td>{patient.bloodType}</td>
                          <td>{patient.temperature}</td>
                          <td>{patient.oxygenSaturation}</td>
                          <td></td>
                          <td></td>
                          <td>{patient.familyHistory}</td>
                          <td>{patient.currentlyEmployed}</td>
                          <td>{patient.currentlyInsured}</td>
                          <td></td>
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
                  <th>Patient #</th>
                  <th>DOB</th>
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
                      <td><Button variant="primary" onClick={() => {handleOpen(); setPatientID(patient._id); setContent(patient._id);}}><Person2RoundedIcon/>View Patient</Button></td>
                      <td>{patient.uuid}</td>
                      <td>{patient.dob}</td>
                      <td>{patient.height}</td>
                      <td>{patient.weight}</td>
                      <td>{patient.bloodPressure}</td>
                      <td>{patient.bloodType}</td>
                      <td>{patient.temperature}</td>
                      <td>{patient.oxygenSaturation}</td>
                      <td></td>
                      <td></td>
                      <td>{patient.familyHistory}</td>
                      <td>{patient.currentlyEmployed}</td>
                      <td>{patient.currentlyInsured}</td>
                      <td></td>
                    </tr>
                  )
      })}
      </tbody>
      </Table>
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
            <Modal.Title id={patient._id}>{patient.uuid}</Modal.Title>
            </Modal.Header>
            <Row>
              <Col>
                <Modal.Body>DOB: <b style={{fontSize: 20}}>{patient.dob}</b></Modal.Body>
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
            <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
            </Modal.Footer>
            </div>
        )}
      })}
    </Modal>
  </Container>
)}
          </Container>

          
        )}
  </div>
)}
    

export default TestTable;