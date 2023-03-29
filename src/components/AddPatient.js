import { async } from "@firebase/util";
import { useEffect } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form } from "react-bootstrap";

function AddPatient() {
    const { entities } = useJaneHopkins();

    const handleAdd = async () => {
      const addResponse = await entities.patient.add(
        {
          name: document.getElementById("addName").value,
          dob: document.getElementById("addDOB").value,
          insuranceNumber: document.getElementById("insuranceNum").value,
        },
        {
          aclInput:{
            acl:[
              {
                pricipal: {
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
                        <Form.Group className="mb-3" controlId="addName">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control type="name"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="addDOB">
                        <Form.Label>DOB</Form.Label>
                        <Form.Control type="dob"/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="insuranceNum">
                        <Form.Label>Insurance Number</Form.Label>
                        <Form.Control type="insuranceNum"/>
                        </Form.Group>
                        <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                        <Button variant="outline-success" onClick={() => {handleAdd();}}>Add Patient to Database</Button>
                        </Form.Group>
                    </Form>
        </div>
      );
}

export default AddPatient;