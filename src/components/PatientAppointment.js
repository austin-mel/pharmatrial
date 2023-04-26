import { useState, useEffect } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form } from "react-bootstrap";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

async function PatientAppointment() {
    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useJaneHopkins();

    //FUNCTION TO HANDLE ADDING APPOINTMENTS
    const handleAddAppointment = async () => {

      //const currentPatientVisits = patient.visits;

      const newVisit = {
        patient: "", 
        dateTime: document.getElementById("date").value, 
        notes: document.getElementById("notes").value, 
        hivViralLoad: document.getElementById("hivViralLoad").value,
      };

      const visits = [...currentPatientVisits,newVisit];

      //var currentDose = patient.doseNum
      //var test = parseInt(currentDose) + 1
      //var nextDose = test.toString();


      const addResponse = await entities.patient.update(
        {
          _id: document.getElementById("patient").value, 
          doseNum: "",
          visits: visits,
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

    //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE PATIENTAPPOINTMENT
    //FORM THAT ASKS FOR EACH INPUT REQUIRED
    return (  
      <div className="addappointment">
      <Form>
            <Form.Group className="mb-3" controlId="patient">
            <Form.Label>Patient Name</Form.Label>
            <Form.Select aria-label="Default select example">
            
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
                  <Button variant="outline-success" onClick={() => {handleAddAppointment();}}>Save Appointment</Button>
                  </Form.Group>
              </Form>
      </div>
    );
}

export default PatientAppointment;