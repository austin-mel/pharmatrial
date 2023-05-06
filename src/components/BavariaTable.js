import { useEffect, useState } from "react";
import useFDA from "../hooks/useFDA";
import { Table, Button, Row, Col, Modal, Form, Container, ProgressBar, Spinner, Stack } from "react-bootstrap";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import LinearProgress from '@mui/material/LinearProgress';
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';



function BavariaTable() {
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
    setTimeout(() => {
      setLoading("false");
    }, 6500);
  }, []);

      //FUNCTION TO RETREIVE VALUES FROM FILTER OPTIONS
  //STORES VALUES IN USESTATE ARRAYS ABOVE (FOR CONDITIONAL RENDERING)
  const checkFilter = async () => {
    const filterYear = document.getElementById("filterYear").value;
    const filterMonth = document.getElementById("filterMonth").value;
    setFilterYear(filterYear);
    setFilterMonth(filterMonth);
  };

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      setPatients(patientList.items);
    };

    return (
        <div className="table">
          <Stack direction="horizontal" gap={3} className="col-md-8 mx-auto">
              <Button variant="outline-warning" onClick={() => {setFilterStatus(true); checkFilter();}}><FilterAltRoundedIcon/>Set Filter</Button>
              <div className="vr" />
              <Form.Select id="filterMonth" aria-label="Select Month">
                  <option value="null">Select Month</option>
                  <option value="01">January</option>
                  <option value="02">February</option>
                  <option value="03">March</option>
                  <option value="04">April</option>
                  <option value="05">May</option>
                  <option value="06">June</option>
                  <option value="07">July</option>
                  <option value="08">August</option>
                  <option value="09">September</option>
                  <option value="10">October</option>
                  <option value="11">November</option>
                  <option value="12">December</option>
                </Form.Select>
                <Form.Control placeholder="Year" id="filterYear"/>
                <div className="vr" />
                <Button variant="outline-secondary" onClick={() => {setFilterStatus(false);}}><ClearRoundedIcon/>Clear Filter</Button>
              </Stack>
        {loading === "true" ? (
          <div fluid>
            <Row>
              <Col className="justify-content-md-center" style={{display:'flex'}}>
                    <Spinner animation="border" />
                </Col>
            </Row>
          </div>
        ) : (
          <div fluid>
             {filterStatus === true ? ( 
          <div className="justify-content-md-center" style={{display:'flex'}}>
            <div className="patienttable">
             {
              //IF FILTER IS ENABLED
            }
            <Table striped bordered hover>
              <thead>
                <tr>
                <th></th>
                <th>UUID</th>
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
                {
                  //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                }
                {patients?.map((patient, key) => {
                  {
                    //IF NAME AND YEAR (BUT NO MONTH SET)
                  }
                  if(filterMonth === "null"){
                    //IF PATIENT'S NAME INCLUDES WHAT IS FILTERED && DOB INCLUDES YEAR FILTERED
                    if(patient.dob != null && patient.dob.includes(filterYear)){
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
                          <td>{patient.dob}</td>
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
                    if(patient.dob != null && patient.dob.includes(filterYear) && patient.dob.substring(0,2) === filterMonth){
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
                          <td>{patient.dob}</td>
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
            </div>
          </div>
) : (
          <div className="justify-content-md-center" style={{display:'flex'}}>
          <div className="patienttable">
            <Table striped bordered hover>
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
      </div>
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
                <p key={index}>Date: {item.dateTime}<br /> Notes: {item.notes}<br /> hivViralLoad: {item.hivViralLoad}</p>
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
  </div>
)}
          </div>

          
        )}
  </div>
)}
    

export default BavariaTable;