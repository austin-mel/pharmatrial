import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form, Container, Badge, Row, Col } from "react-bootstrap";

function AddAppointment() {
    const { entities } = useJaneHopkins();

    const [patients, setPatients] = useState();

        //CREATE USE STATE (FOR ALERT POPUP)
        const [show, setShow] = useState(false);
        const handleHide = () => setShow(false);
        const handleShow = () => setShow(true);
  
      //VENDIA FUNCTION TO GET PATIENTS IN DATABASE
      //STORES PATIENTS FROM DATABASE INTO THE ARRAY ABOVE
      const listPatients = async () => {
        let patientList = await entities.patient.list()
        setPatients(patientList.items);
      };
      
    //FIRES WHEN PAGE LOADS/RELOADS
    //CALLS LISTPATIENTS FUNCTION
    useEffect(() => {
        listPatients();
      }, []);


      const handleAddAppointment = async () => {
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
          const doseNum = patient.doseNum;
          const studyID = patient.studyID;
          const drugID = patient.drugID;
          const uuid = patient.uuid;

          var newDoseNum = doseNum;
    
          if(document.getElementById("patient").value === patient._id){
            newDoseNum++;
            addAppointment();
          }
    
          async function addAppointment(){

            const tempDate = document.getElementById("date").value;
            const fixedDate = tempDate.substring(5,7)  + "/" +  tempDate.substring(8,10) + "/" + tempDate.substring(0,4)
        
            if(patient.visits != null){
              var currentPatientVisits = patient.visits;
            }
            else{
              currentPatientVisits = null;
            }
        
            const newVisit = {patient: patient.name + " " + patient.lastName, dateTime: fixedDate, notes: document.getElementById("notes").value, hivViralLoad: document.getElementById("hivViralLoad").value};
            
            if(patient.visits != null){
              var visits = [...currentPatientVisits,newVisit];
            }
            else{
              visits = [newVisit];
            }
        
            const addAppointment = await entities.patient.update(
              {
                _id: patient._id, 
                visits,
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
            console.log(addAppointment)
          };
    
    
        })}
      };

    return (
        <div className="addappointment">
          {show === false ? (
        <Form>
              <Form.Group className="mb-3" controlId="patient">
              <Form.Label>Patient Name</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="0187bee6-6165-cf61-e3ce-82abac047842">Billy Roberts</option>
              </Form.Select>
              </Form.Group>
                    <Form.Group className="mb-3" controlId="date">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="notes">
                    <Form.Label>Notes</Form.Label>
                    <Form.Control as="textarea" rows={3} type="notes"/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="hivViralLoad">
                    <Form.Label>HIV Viral Load</Form.Label>
                    <Form.Control type="hivViralLoad"/>
                    </Form.Group>
                    <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                    <Button variant="outline-success" onClick={() => {handleAddAppointment(); handleShow(); setTimeout(() => {handleHide();}, 2000);}}>Save Appointment</Button>
                    </Form.Group>
                </Form>
          ) : (
            <Form>
            <Form.Group className="mb-3" controlId="patient">
            <Form.Label>Patient Name</Form.Label>
            <Form.Select aria-label="Default select example">
              <option value="0187bee6-6165-cf61-e3ce-82abac047842">Billy Roberts</option>
            </Form.Select>
            </Form.Group>
                  <Form.Group className="mb-3" controlId="date">
                  <Form.Label>Date</Form.Label>
                  <Form.Control type="date"/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} type="notes"/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="hivViralLoad">
                  <Form.Label>HIV Viral Load</Form.Label>
                  <Form.Control type="hivViralLoad"/>
                  </Form.Group>
                  <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                  <Button variant="outline-success" onClick={() => {handleAddAppointment(); handleShow(); setTimeout(() => {handleHide();}, 2000);}}>Save Appointment</Button>
                  </Form.Group>
                  <Row>
                            <Badge bg="success">Appointment Saved!</Badge>
                          </Row>
              </Form>
          )}
        </div>
    );
}

export default AddAppointment;