import { async } from "@firebase/util";
import { useEffect } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";

function AddPatient() {
  
    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useJaneHopkins();

    //FUNCTION THAT ADDS A NEW PATIENT
    const handleAddPatient = async () => {

      //const currentPatientMeds = null;
      //const currentICDHealthCodes = null;
      //const currentAllergies = null;
      //const newMedication = {medication: document.getElementById("currentMeds")};
      //const medications = [...currentPatientMeds,newMedication];
      //const newICDHealthCodes = {code: document.getElementById("ICD10")};
      //const icdHealthCodes = [...currentICDHealthCodes,newICDHealthCodes];
      //const newAllergies = {allergy: document.getElementById("allergies")};
      //const allergies = [...currentAllergies,newAllergies];

      //VENDIA FUNCTION TO ADD PATIENT TO DATABASE
      //GET VALUES FROM THE FORM BELOW BY FETCHING IDS
      const addResponse = await entities.patient.add(
        {
          name: document.getElementById("firstName").value,
          lastName: document.getElementById("lastName").value,
          dob: document.getElementById("addDOB").value,
          address: document.getElementById("address").value,
          insuranceNumber: document.getElementById("insuranceNum").value,
          height: document.getElementById("height").value,
          weight: document.getElementById("weight").value,
          bloodPressure: document.getElementById("bloodPressure").value,
          bloodType: document.getElementById("bloodType").value,
          temperature: document.getElementById("temp").value,
          oxygenSaturation: document.getElementById("OSat").value,
          familyHistory: document.getElementById("familyHistory").value,
          currentlyEmployed: document.getElementById("employmentStatus").value,
          currentlyInsured: document.getElementById("insuranceStatus").value,
          //currentMedications: medications,
          //icdHealthCodes: icdHealthCodes,
          //allergies: allergies
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
    };

    //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE ADDPATIENT
    //FORM THAT ASKS FOR EACH INPUT REQUIRED
    return (
        <div className="addpatient">
            <Form>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="firstName"/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="lastName"/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="addDOB">
                    <Form.Label>DOB</Form.Label>
                    <Form.Control type="addDOB"/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="address">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="address"/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="insuranceNum">
                    <Form.Label>Insurance Number</Form.Label>
                    <Form.Control type="insuranceNum"/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="height">
                    <Form.Label>Height</Form.Label>
                    <Form.Control type="height"/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="weight">
                    <Form.Label>Weight</Form.Label>
                    <Form.Control type="weight"/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="bloodPressure">
                    <Form.Label>Blood Pressure</Form.Label>
                    <Form.Control type="bloodPressure"/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group className="mb-3" controlId="bloodType">
                  <Form.Label>Blood Type</Form.Label>
                  <Form.Select id="bloodType">
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
                    <Form.Control type="temp"/>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3" controlId="OSat">
                    <Form.Label>Ox Saturation</Form.Label>
                    <Form.Control type="OSat"/>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                <Form.Group className="mb-3" controlId="familyHistory">
                  <Form.Label>Family History?</Form.Label>
                  <Form.Select id="familyHistory">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="employmentStatus">
                  <Form.Label>Employed?</Form.Label>
                  <Form.Select id="employmentStatus">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </Form.Select>
                </Form.Group>
                </Col>
                <Col>
                <Form.Group className="mb-3" controlId="insuranceStatus">
                  <Form.Label>Valid Insurnace?</Form.Label>
                  <Form.Select id="insuranceStatus">
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
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
                        <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                          {
                            //BUTTON THAT CALLS FUNCTION TO ADD PATIENT ON CLICK
                          }
                        <Button variant="outline-success" onClick={() => {handleAddPatient();}}>Add Patient to Database</Button>
                        </Form.Group>
              </Form>
        </div>
      );
}

export default AddPatient;