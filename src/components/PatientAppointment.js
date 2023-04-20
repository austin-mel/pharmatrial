import { useState } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

function PatientAppointment() {
    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useJaneHopkins();
    //CREATE ARRAY FOR PATIENTS
    const [patients, setPatients] = useState();

    //FUNCTION TO HANDLE ADDING APPOINTMENTS
    const handleAddAppointment = async () => {

      const userResponse = await entities.patient.get('018657df-9a40-f7e5-db30-57bbc6db5866');

      const currentPatientVisits = userResponse.visits;

      const newVisit = {patient: "Billy", dateTime: "April 20, 2023", notes: "Awesome dude!", hivViralLoad: "tons of HIV"};
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

    //VENDIA FUNCTION TO GET PATIENTS IN DATABASE
    //STORES PATIENTS FROM DATABASE INTO THE ARRAY ABOVE
    const listPatients = async () => {
      let patientList = await entities.patient.list()
      setPatients(patientList.items);
    };

    //SETS ARRAY TO PATIENTS
    listPatients();

    //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE PATIENTAPPOINTMENT
    //FORM THAT ASKS FOR EACH INPUT REQUIRED
    return (  
      <div className="addappointment">
      <Form>
                  <Form.Group className="mb-3" controlId="notes">
                  <Form.Label>Notes</Form.Label>
                  <Form.Control as="textarea" rows={3} type="notes"/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="hivViralLoad">
                  <Form.Label>HIV Viral Load</Form.Label>
                  <Form.Control type="hivViralLoad"/>
                  </Form.Group>
                  <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                  <Button variant="outline-success" onClick={() => {handleAddAppointment();}}>Save Appointment</Button>
                  </Form.Group>
              </Form>
      </div>
    );
}

export default PatientAppointment;