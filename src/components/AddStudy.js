import { async } from "@firebase/util";
import { useEffect } from "react";
import useFDA from "../hooks/useFDA";
import { Button, Form, Row, Col, Alert } from "react-bootstrap";

function AddStudy() {
    const { entities } = useFDA();

    const handleCreateStudy = async () => {

      const createStudy = await entities.study.add(
        {
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
                  nodes: ["Bavaria","FDA"]
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
                        <Button variant="outline-success" onClick={() => {handleCreateStudy();}}>Create New Study</Button>
                        </Form.Group>
                </Row>
              </Form>
        </div>
      );
}

export default AddStudy;