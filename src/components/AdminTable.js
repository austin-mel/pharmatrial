import { useEffect, useState } from "react";
import { Table, Button, Row, Col, Card, Modal, ModalBody, Form, Container, ProgressBar, Spinner, Stack } from "react-bootstrap";
import FilterAltRoundedIcon from '@mui/icons-material/FilterAltRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import LinearProgress from '@mui/material/LinearProgress';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HighlightOffRoundedIcon from '@mui/icons-material/HighlightOffRounded';
import useJaneHopkins from "../hooks/useJaneHopkins";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';


function AdminTable() {
  const { entities } = useJaneHopkins();
  const [patients, setPatients] = useState();

  //CREATE USE STATE (FOR MODAL POPUP)
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleOpen = () => setShow(true);
  //CREATE ARRAY FOR PATIENT IDS
  const [patientID, setPatientID] = useState();

  const [content, setContent] = useState();
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

  function deletePatient(props) {
    const patientID = props;

    const deletePatients = async () => {
      const deletePatient = await entities.patient.remove(patientID);
    }

    deletePatients();
  }

  return (
    <div className="table">
      <Container fluid>
        <div className="tablefilter">
          <Row>
            <Col sm="2" className="justify-content-md-end" style={{ display: 'flex' }}>
              <Button variant="warning" onClick={() => { setFilterStatus(true); checkFilter(); }}><FilterAltRoundedIcon />Set Filter</Button>
            </Col>
            <Col>
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
            </Col>
            <Col>
              <Form.Control placeholder="Year" id="filterYear" />
            </Col>
            <Col sm="2" className="justify-content-md-left" style={{ display: 'flex' }}>
              <Button variant="secondary" onClick={() => { setFilterStatus(false); }}><ClearRoundedIcon />Clear Filter</Button>
            </Col>
          </Row>
          <Row>
            <Button variant="outline-info" onClick={() => { listPatients(); }}>Refresh Table</Button>
          </Row>
        </div>
      </Container>
      {loading === "true" ? (
        <Container>
          <Row>
            <Col className="justify-content-md-center" style={{ display: 'flex' }}>
              <Spinner animation="border" />
            </Col>
          </Row>
        </Container>
      ) : (
        <Container>
          {filterStatus === true ? (
            <Container className="justify-content-md-center" style={{ display: 'flex' }}>
              <div className="patienttable">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Eligible?</th>
                      <th></th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>DOB</th>
                      <th>Address</th>
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
                      <th>Insurance Number</th>
                      <th>ICD-10 Health Codes</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients?.map((patient, key) => {
                      if (patient.dob != null && filterMonth === "null") {
                        if (patient.dob.includes(filterYear)) {
                          if (patient.isEligible === true) {
                            return (
                              <tr key={key}>
                                <td><CheckCircleRoundedIcon /></td>
                                <td><Button variant="primary" onClick={() => { handleOpen(); setPatientID(patient._id); setContent(patient._id); }}><Person2RoundedIcon />View Patient</Button></td>
                                <td>{patient.name}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.address}</td>
                                <td>{patient.height}</td>
                                <td>{patient.weight}</td>
                                <td>{patient.bloodPressure}</td>
                                <td>{patient.bloodType}</td>
                                <td>{patient.temperature}</td>
                                <td>{patient.oxygenSaturation}</td>
                                <td>{patient.allergies ? patient.allergies.map((item, index) => (<li key={index}>{item.allergy}<br /></li>)) : null}</td>
                                <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => (<li key={index}>{item.medication}<br /></li>)) : null}</td>
                                <td>{patient.familyHistory}</td>
                                <td>{patient.currentlyEmployed}</td>
                                <td>{patient.currentlyInsured}</td>
                                <td>{patient.insuranceNumber}</td>
                                <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => (<li key={index}>{item.code}<br /></li>)) : null}</td>
                                <td><Button variant="danger" onClick={() => { deletePatient(patient._id); }}>Delete Patient</Button></td>
                              </tr>
                            )
                          }
                          else {
                            return (
                              <tr key={key}>
                                <td><HighlightOffRoundedIcon /></td>
                                <td><Button variant="primary" onClick={() => { handleOpen(); setPatientID(patient._id); setContent(patient._id); }}><Person2RoundedIcon />View Patient</Button></td>
                                <td>{patient.name}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.address}</td>
                                <td>{patient.height}</td>
                                <td>{patient.weight}</td>
                                <td>{patient.bloodPressure}</td>
                                <td>{patient.bloodType}</td>
                                <td>{patient.temperature}</td>
                                <td>{patient.oxygenSaturation}</td>
                                <td>{patient.allergies ? patient.allergies.map((item, index) => (<li key={index}>{item.allergy}<br /></li>)) : null}</td>
                                <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => (<li key={index}>{item.medication}<br /></li>)) : null}</td>
                                <td>{patient.familyHistory}</td>
                                <td>{patient.currentlyEmployed}</td>
                                <td>{patient.currentlyInsured}</td>
                                <td>{patient.insuranceNumber}</td>
                                <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => (<li key={index}>{item.code}<br /></li>)) : null}</td>
                                <td><Button variant="danger" onClick={() => { deletePatient(patient._id); }}>Delete Patient</Button></td>
                              </tr>
                            )
                          }
                        }
                      }
                      else {
                        if (patient.dob != null && patient.dob.includes(filterYear) && patient.dob.substring(0, 2) === filterMonth) {
                          if (patient.isEligible === true) {
                            return (
                              <tr key={key}>
                                <td><CheckCircleRoundedIcon /></td>
                                <td><Button variant="primary" onClick={() => { handleOpen(); setPatientID(patient._id); setContent(patient._id); }}><Person2RoundedIcon />View Patient</Button></td>
                                <td>{patient.name}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.address}</td>
                                <td>{patient.height}</td>
                                <td>{patient.weight}</td>
                                <td>{patient.bloodPressure}</td>
                                <td>{patient.bloodType}</td>
                                <td>{patient.temperature}</td>
                                <td>{patient.oxygenSaturation}</td>
                                <td>{patient.allergies ? patient.allergies.map((item, index) => (<li key={index}>{item.allergy}<br /></li>)) : null}</td>
                                <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => (<li key={index}>{item.medication}<br /></li>)) : null}</td>
                                <td>{patient.familyHistory}</td>
                                <td>{patient.currentlyEmployed}</td>
                                <td>{patient.currentlyInsured}</td>
                                <td>{patient.insuranceNumber}</td>
                                <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => (<li key={index}>{item.code}<br /></li>)) : null}</td>
                                <td><Button variant="danger" onClick={() => { deletePatient(patient._id); }}>Delete Patient</Button></td>
                              </tr>
                            )
                          }
                          else {
                            return (
                              <tr key={key}>
                                <td><HighlightOffRoundedIcon /></td>
                                <td><Button variant="primary" onClick={() => { handleOpen(); setPatientID(patient._id); setContent(patient._id); }}><Person2RoundedIcon />View Patient</Button></td>
                                <td>{patient.name}</td>
                                <td>{patient.lastName}</td>
                                <td>{patient.dob}</td>
                                <td>{patient.address}</td>
                                <td>{patient.height}</td>
                                <td>{patient.weight}</td>
                                <td>{patient.bloodPressure}</td>
                                <td>{patient.bloodType}</td>
                                <td>{patient.temperature}</td>
                                <td>{patient.oxygenSaturation}</td>
                                <td>{patient.allergies ? patient.allergies.map((item, index) => (<li key={index}>{item.allergy}<br /></li>)) : null}</td>
                                <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => (<li key={index}>{item.medication}<br /></li>)) : null}</td>
                                <td>{patient.familyHistory}</td>
                                <td>{patient.currentlyEmployed}</td>
                                <td>{patient.currentlyInsured}</td>
                                <td>{patient.insuranceNumber}</td>
                                <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => (<li key={index}>{item.code}<br /></li>)) : null}</td>
                                <td><Button variant="danger" onClick={() => { deletePatient(patient._id); }}>Delete Patient</Button></td>
                              </tr>
                            )
                          }
                        }
                      }
                    })}
                  </tbody>
                </Table>
              </div>
            </Container>
          ) : (
            <Container className="justify-content-md-center" style={{ display: 'flex' }}>
              <div className="patienttable">
                <Table striped bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>Eligible?</th>
                      <th></th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>DOB</th>
                      <th>Address</th>
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
                      <th>Insurance Number</th>
                      <th>ICD-10 Health Codes</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {patients?.map((patient, key) => {
                      if (patient.isEligible === true) {
                        return (
                          <tr key={key}>
                            <td><CheckCircleRoundedIcon /></td>
                            <td><Button variant="primary" onClick={() => { handleOpen(); setPatientID(patient._id); setContent(patient._id); }}><Person2RoundedIcon />View Patient</Button></td>
                            <td>{patient.name}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.dob}</td>
                            <td>{patient.address}</td>
                            <td>{patient.height}</td>
                            <td>{patient.weight}</td>
                            <td>{patient.bloodPressure}</td>
                            <td>{patient.bloodType}</td>
                            <td>{patient.temperature}</td>
                            <td>{patient.oxygenSaturation}</td>
                            <td>{patient.allergies ? patient.allergies.map((item, index) => (<li key={index}>{item.allergy}<br /></li>)) : null}</td>
                            <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => (<li key={index}>{item.medication}<br /></li>)) : null}</td>
                            <td>{patient.familyHistory}</td>
                            <td>{patient.currentlyEmployed}</td>
                            <td>{patient.currentlyInsured}</td>
                            <td>{patient.insuranceNumber}</td>
                            <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => (<li key={index}>{item.code}<br /></li>)) : null}</td>
                            <td><Button variant="danger" onClick={() => { deletePatient(patient._id); }}>Delete Patient</Button></td>
                          </tr>
                        )
                      }
                      else {
                        return (
                          <tr key={key}>
                            <td><HighlightOffRoundedIcon /></td>
                            <td><Button variant="primary" onClick={() => { handleOpen(); setPatientID(patient._id); setContent(patient._id); }}><Person2RoundedIcon />View Patient</Button></td>
                            <td>{patient.name}</td>
                            <td>{patient.lastName}</td>
                            <td>{patient.dob}</td>
                            <td>{patient.address}</td>
                            <td>{patient.height}</td>
                            <td>{patient.weight}</td>
                            <td>{patient.bloodPressure}</td>
                            <td>{patient.bloodType}</td>
                            <td>{patient.temperature}</td>
                            <td>{patient.oxygenSaturation}</td>
                            <td>{patient.allergies ? patient.allergies.map((item, index) => (<li key={index}>{item.allergy}<br /></li>)) : null}</td>
                            <td>{patient.currentMedications ? patient.currentMedications.map((item, index) => (<li key={index}>{item.medication}<br /></li>)) : null}</td>
                            <td>{patient.familyHistory}</td>
                            <td>{patient.currentlyEmployed}</td>
                            <td>{patient.currentlyInsured}</td>
                            <td>{patient.insuranceNumber}</td>
                            <td>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => (<li key={index}>{item.code}<br /></li>)) : null}</td>
                            <td><Button variant="danger" onClick={() => { deletePatient(patient._id); }}>Delete Patient</Button></td>
                          </tr>
                        )
                      }
                    })}
                  </tbody>
                </Table>
              </div>
              <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                {
                  //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                }
                {patients?.map((patient, key) => {
                  if (content === patient._id) {
                    //RENDER VALUES AS TEXT
                    return (
                      <div key={key}>
                        <Modal.Header closeButton>
                          <Modal.Title id={patient._id}>{patient.name} {patient.lastName}</Modal.Title>
                        </Modal.Header>
                        <Row>
                          <Col>
                            <Modal.Body>DOB: <b style={{ fontSize: 20 }}>{patient.dob}</b></Modal.Body>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Modal.Body>Height: <b style={{ fontSize: 20 }}>{patient.height}</b></Modal.Body>
                          </Col>
                          <Col>
                            <Modal.Body>Weight: <b style={{ fontSize: 20 }}>{patient.weight}</b></Modal.Body>
                          </Col>
                          <Col>
                            <Modal.Body>Blood Pressure: <b style={{ fontSize: 20 }}>{patient.bloodPressure}</b></Modal.Body>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Modal.Body>Blood Type: <b style={{ fontSize: 20 }}>{patient.bloodType}</b></Modal.Body>
                          </Col>
                          <Col>
                            <Modal.Body>Temperature: <b style={{ fontSize: 20 }}>{patient.temperature}</b></Modal.Body>
                          </Col>
                          <Col>
                            <Modal.Body>O Saturation: <b style={{ fontSize: 20 }}>{patient.oxygenSaturation}</b></Modal.Body>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Modal.Body>Allergies: <b style={{ fontSize: 20 }}>{patient.allergies ? patient.allergies.map((item, index) => (
                              <li key={index}>{item.allergy}<br /></li>
                            )) : null}</b></Modal.Body>
                          </Col>
                          <Col>
                            <Modal.Body>Current Meds: <b style={{ fontSize: 20 }}>{patient.currentMedications ? patient.currentMedications.map((item, index) => (
                              <li key={index}>{item.medication}<br /></li>
                            )) : null}</b></Modal.Body>
                          </Col>
                          <Col>
                            <Modal.Body>Family History: <b style={{ fontSize: 20 }}>{patient.familyHistory}</b></Modal.Body>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Modal.Body>Employment Status: <b style={{ fontSize: 20 }}>{patient.currentlyEmployed}</b></Modal.Body>
                          </Col>
                          <Col>
                            <Modal.Body>Insurance Status: <b style={{ fontSize: 20 }}>{patient.currentlyInsured}</b></Modal.Body>
                          </Col>
                          <Col>
                            <Modal.Body>ICD-10 Codes: <b style={{ fontSize: 20 }}>{patient.icdHealthCodes ? patient.icdHealthCodes.map((item, index) => (
                              <li key={index}>{item.code}<br /></li>
                            )) : null}</b></Modal.Body>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Modal.Body>Visits: <b style={{ fontSize: 20 }}>{patient.visits ? patient.visits.map((item, index) => (
                              <div>
                                <p key={index}>Date: {item.dateTime}<br /> Notes: {item.notes}<br /> hivViralLoad: {item.hivViralLoad}</p>
                              </div>
                            )) : null}</b></Modal.Body>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Modal.Body>Doses: {patient.doseNum}/5</Modal.Body>
                            <Modal.Body><ProgressBar animated now={patient.doseNum * 20} variant="success" /></Modal.Body>
                          </Col>
                        </Row>
                        <Modal.Footer>
                          {
                            //BUTTON TO ENABLE EDITING (CHANGE format SETSTATE TO EDIT)
                            //BUTTON TO CLOSE MODAL
                          }
                          <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon />Close</Button>
                        </Modal.Footer>
                      </div>
                    )
                  }
                })}
              </Modal>
            </Container>
          )}
        </Container>
      )}
    </div>
  )
}


export default AdminTable;