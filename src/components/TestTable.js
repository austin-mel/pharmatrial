import { useEffect, useState } from "react";
import useFDA from "../hooks/useFDA";
import { Table, Button, Row, Col, Card, Modal, ModalBody, Form, Container } from "react-bootstrap";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import LinearProgress from '@mui/material/LinearProgress';


function FDATable() {
    const { entities } = useFDA();
    const [patients, setPatients] = useState();

    const [content, setContent] = useState();
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
  </Container>
)}
          </Container>
        )}
  </div>
)}
    

export default FDATable;