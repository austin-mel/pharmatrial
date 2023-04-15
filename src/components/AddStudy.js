import { async } from "@firebase/util";
import { useEffect } from "react";
import useFDA from "../hooks/useFDA";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";

function AddStudy() {

    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useFDA();

    //FUNCTOIN THAT CREATES A NEW STUDY
    const handleCreateStudy = async () => {

      //VENDIA FUNCTION TO ADD STUDY
      const createStudy = await entities.study.add(
        {
          //RETREIVE DRUG NAME FROM FORM
          //SET OTHER VALUES AS DEFAULT VALUES DESIRED
          drugName: document.getElementById("drugName").value,
          fdaApproved: false,
          bavariaApproved: false,
          inProgress: true,
        },
        {
          aclInput:{
            acl:[
              {
                principal: {
                  nodes: ["Bavaria","FDA"]
                },
                operations: ["ALL"],
                path: "fdaApproved",
              },
              {
                principal: {
                  nodes: ["Bavaria","FDA"]
                },
                operations: ["ALL"],
                path: "bavariaApproved",
              },
              {
                principal: {
                  nodes: ["Bavaria"]
                },
                operations: ["ALL"],
                path: "drugName",
              },
              {
                principal: {
                  nodes: ["FDA"]
                },
                operations: ["READ"],
                path: "drugName",
              },
              {
                principal: {
                  nodes: ["Bavaria","FDA","JaneHopkins"]
                },
                operations: ["ALL"],
                path: "inProgress"
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
                  <Form.Group className="mb-3" controlId="drugName">
                    <Form.Label>Drug Name</Form.Label>
                    <Form.Control type="studyName"/>
                  </Form.Group>
                </Col>
                </Row>
                <Row>
                        <Form.Group className="justify-content-md-center" style={{display:'flex'}}>
                        {
                            //BUTTON THAT CALLS FUNCTION TO ADD STUDY ON CLICK
                        }
                        <Button variant="outline-success" onClick={() => {handleCreateStudy();}}>Create New Study</Button>
                        </Form.Group>
                </Row>
              </Form>
        </div>
      );
}

export default AddStudy;