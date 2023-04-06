import { async } from "@firebase/util";
import { useEffect } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

function AddPatient() {
    const { entities } = useJaneHopkins();

    const handleAddPatient = async () => {
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
          tempterature: document.getElementById("temp").value,
          oxygenSaturation: document.getElementById("OSat").value,
          familyHistory: document.getElementById("familyHistory").value,
          currentlyEmployed: document.getElementById("employment").value,
          currentlyInsured: document.getElementById("insuranceStatus").value
        },
        {
          aclInput:{
            acl:[
              {
                principal: {
                  nodes: ["Bavaria","FDA"]
                },
                operations: ["READ"],
                path: "name",
              },
            ],
          },
        } 
      );
      console.log(addResponse)
    };

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
                        <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                        <Button variant="outline-success" onClick={() => {handleAddPatient();}}>Add Patient to Database</Button>
                        </Form.Group>
              </Form>
        </div>
      );
}

export default AddPatient;