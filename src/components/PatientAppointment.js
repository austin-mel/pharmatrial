import { async } from "@firebase/util";
import { useEffect } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form } from "react-bootstrap";

function PatientAppointment() {
    const { entities } = useJaneHopkins();

    const handleAddAppointment = async () => {

      const userResponse = await entities.patient.get('018675f0-39f7-d443-9f0b-4041030a4bdf');

      const currentPatientVisits = userResponse.visits;

      const newVisit = {patient: "Brian", dateTime: "April 20, 2023", notes: "Deez", hivViralLoad: "true"};
      const visits = [...currentPatientVisits,newVisit];

      const addResponse = await entities.patient.update(
        {
          _id: userResponse._id, 
          visits,
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
      <div className="addappointment">
      <Form>
                  <Form.Group className="mb-3" controlId="name">
                  <Form.Label>Patient Name</Form.Label>
                  <Form.Control type="name"/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} type="notes"/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="insuranceNum">
                  <Form.Label>Insurance Number</Form.Label>
                  <Form.Control type="name"/>
                  </Form.Group>
                  <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                  <Button variant="outline-success" onClick={() => {handleAddAppointment();}}>Save Appointment</Button>
                  </Form.Group>
              </Form>
      </div>
    );
}

export default PatientAppointment;