import { useEffect, useState } from "react";
import useFDA from "../hooks/useFDA";
import { Table, Button, Row, Col, Modal, Container } from "react-bootstrap";
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import { getAuth } from "firebase/auth";
import Spinner from 'react-bootstrap/Spinner';
import Fab from '@mui/material/Fab';
import SendDrugs from "./SendDrugs";
import AssignDrugs from "./AssignDrugs";


function StudyTable() {
    const { entities } = useFDA();
    const [studies, setStudy] = useState();
    const [drugs, setDrugs] = useState();
    const auth = getAuth();

    const [show, setShow] = useState(false);
    const [content, setContent] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    const [loading, setLoading] = useState("");

    useEffect(() => {
        listStudies();
        setLoading("true");
        setTimeout(() => {
          setLoading("false");
        }, 6500);
      }, []);

    const listStudies = async () => {
      let studyList = await entities.study.list()
      setStudy(studyList.items);
    };

    const listDrugs = async () => {
        let drugList = await entities.drug.list()
        setDrugs(drugList.items);
      };

    const handleApprove = async (props) => {

        var account = await entities.study.get(props);
        var bavariaAccount = account.bavariaApproved;
        var fdaAccount = account.fdaApproved;

        const user = auth.currentUser;

        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            const displayName = user.displayName;
            
            if(displayName === "Bavaria Admin"){
                bavariaAccount = true;
            }
            else if(displayName === "FDA Admin"){
                fdaAccount = true;
            }
        }

        const changeApproval = await entities.study.update(
            {
              _id: props, 
              bavariaApproved: bavariaAccount,
              fdaApproved: fdaAccount,
            },
            {
              aclInput:{
                acl:[
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
                        operations: ["ALL"],
                        path: "fdaApproved",
                      },
                ],
              },
            } 
          );
        };

        const user = auth.currentUser;
        const displayName = user.displayName;

    return (
        <div className="studyTable">
        {loading === "true" ? (
          <Container fluid style={{display:'flex'}}>
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                    <Spinner animation="border" />
                </Col>
            </Row>
        </Container>
        ) : (
            <Container fluid>
                {displayName === "Bavaria Admin"? (
                    <Container fluid>
                    <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <h5>Pending Studies:</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                        <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                        <th>FDA Approval</th>
                        <th>Bavaria Approval</th>
                        <th>Drug Name</th>
                        <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {studies?.map((study, key) => {
                                if(study.fdaApproved === false && study.bavariaApproved === false){
                                    return(
                                        <tr key={key}>
                                            <td>False</td>
                                            <td>False</td>
                                            <td>{study.drugName}</td>
                                            <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                        </tr>
                                    )}
                                else if(study.bavariaApproved === false && study.fdaApproved === true){
                                    return(
                                        <tr key={key}>
                                            <td>True</td>
                                            <td>False</td>
                                            <td>{study.drugName}</td>
                                            <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                        </tr> 
                                )}
                                else if(study.bavariaApproved === true && study.fdaApproved === false){
                                    return(
                                        <tr key={key}>
                                            <td>False</td>
                                            <td>True</td>
                                            <td>{study.drugName}</td>
                                            <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                        </tr> 
                                    )
                                }
                            })}
                        </tbody>
                        </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <h5>Active Studies:</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                        <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                        <th>FDA Approval</th>
                        <th>Bavaria Approval</th>
                        <th>Drug Name</th>
                        <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {studies?.map((study, key) => {
                                if(study.bavariaApproved === true && study.fdaApproved === true){
                                    return(
                                        <tr key={key}>
                                            <td>True</td>
                                            <td>True</td>
                                            <td>{study.drugName}</td>
                                            <td><Button variant="primary" onClick={() => {setContent(study._id); handleOpen();}}>View Study</Button></td>
                                        </tr> 
                                    )
                                }
                            })}
                        </tbody>
                        </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <h5>Completed Studies:</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                        <Table striped bordered hover size="sm">
                        <thead>
                        <tr>
                        <th>FDA Approval</th>
                        <th>Bavaria Approval</th>
                        <th>Drug Name</th>
                        <th></th>
                        </tr>
                        </thead>
                        <tbody>
                            {studies?.map((study, key) => {
                                if(study.inProgress === false){
                                    return(
                                        <tr key={key}>
                                            <td>True</td>
                                            <td>True</td>
                                            <td>{study.drugName}</td>
                                            <td><Button variant="primary" onClick={() => {}}>Download Results</Button></td>
                                        </tr> 
                                    )
                                }
                            })}
                        </tbody>
                        </Table>
                        </Col>
                    </Row>
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> 
            {studies?.map((study, key) => {
              if(content === study._id){
                    if(study.fdaApproved === false && study.bavariaApproved === true){
                        return(
                            <div key={key}>
                <Modal.Header closeButton>
                <Modal.Title>Study UUID: {study._id}</Modal.Title>
                </Modal.Header>
                <Row>
                  <Col>
                    <Modal.Body>Drug Name: <b style={{fontSize: 20}}>{study.drugName}</b></Modal.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Modal.Body>FDA Approval: <b style={{fontSize: 20}}>False</b></Modal.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Modal.Body>Bavaria Approval: <b style={{fontSize: 20}}>True</b></Modal.Body>
                  </Col>
                </Row>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
                </Modal.Footer>
                </div>
                        )
                    }
                    else if(study.fdaApproved === true && study.bavariaApproved === false){
                        return(
                            <div key={key}>
                <Modal.Header closeButton>
                <Modal.Title>Study UUID: {study._id}</Modal.Title>
                </Modal.Header>
                <Row>
                  <Col>
                    <Modal.Body>Drug Name: <b style={{fontSize: 20}}>{study.drugName}</b></Modal.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Modal.Body>FDA Approval: <b style={{fontSize: 20}}>True</b></Modal.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Modal.Body>Bavaria Approval: <b style={{fontSize: 20}}>False</b></Modal.Body>
                  </Col>
                </Row>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
                </Modal.Footer>
                </div>
                        )
                    }
                    if(study.fdaApproved === false && study.bavariaApproved === false){
                        return(
                            <div key={key}>
                <Modal.Header closeButton>
                <Modal.Title>Study UUID: {study._id}</Modal.Title>
                </Modal.Header>
                <Row>
                  <Col>
                    <Modal.Body>Drug Name: <b style={{fontSize: 20}}>{study.drugName}</b></Modal.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Modal.Body>FDA Approval: <b style={{fontSize: 20}}>False</b></Modal.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Modal.Body>Bavaria Approval: <b style={{fontSize: 20}}>False</b></Modal.Body>
                  </Col>
                </Row>
                <Modal.Footer>
                <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
                </Modal.Footer>
                </div>
                        )
                    }
                    else{
                        return(
                            <div key={key}>
                <Modal.Header closeButton>
                <Modal.Title>Study UUID: {study._id}</Modal.Title>
                </Modal.Header>
                <Row>
                  <Col>
                    <Modal.Body>Drug Name: <b style={{fontSize: 20}}>{study.drugName}</b></Modal.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Modal.Body>FDA Approval: <b style={{fontSize: 20}}>True</b></Modal.Body>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Modal.Body>Bavaria Approval: <b style={{fontSize: 20}}>True</b></Modal.Body>
                  </Col>
                </Row>
                <Modal.Footer>
                    <SendDrugs props={study._id}/>
                    <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
                </Modal.Footer>
                </div>
                        )
                    }
                }
              })}
              </Modal>
                  </Container>
                ) : (
                    <Container fluid>
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                    <h5>Studies Pending Approval:</h5>
                </Col>
            </Row>
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                <Table striped bordered hover size="sm">
                <thead>
                <tr>
                <th>FDA Approval</th>
                <th>Bavaria Approval</th>
                <th>Drug Name</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
                    {studies?.map((study, key) => {
                        if(study.fdaApproved === false && study.bavariaApproved === false){
                            return(
                                <tr key={key}>
                                    <td>False</td>
                                    <td>False</td>
                                    <td>{study.drugName}</td>
                                    <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                </tr>
                            )}
                        else if(study.bavariaApproved === false && study.fdaApproved === true){
                            return(
                                <tr key={key}>
                                    <td>True</td>
                                    <td>False</td>
                                    <td>{study.drugName}</td>
                                    <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                </tr> 
                        )}
                        else if(study.bavariaApproved === true && study.fdaApproved === false){
                            return(
                                <tr key={key}>
                                    <td>False</td>
                                    <td>True</td>
                                    <td>{study.drugName}</td>
                                    <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                </tr> 
                            )
                        }
                    })}
                </tbody>
                </Table>
                </Col>
            </Row>
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                    <h5>Active Studies:</h5>
                </Col>
            </Row>
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                <Table striped bordered hover size="sm">
                <thead>
                <tr>
                <th>FDA Approval</th>
                <th>Bavaria Approval</th>
                <th>Drug Name</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
                    {studies?.map((study, key) => {
                        if(study.bavariaApproved === true && study.fdaApproved === true){
                            return(
                                <tr key={key}>
                                    <td>True</td>
                                    <td>True</td>
                                    <td>{study.drugName}</td>
                                    <td><Button variant="primary" onClick={() => {setContent(study._id); handleOpen();}}>View Study</Button></td>
                                </tr> 
                            )
                        }
                    })}
                </tbody>
                </Table>
                </Col>
            </Row>
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                    <h5>Completed Studies:</h5>
                </Col>
            </Row>
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                <Table striped bordered hover size="sm">
                <thead>
                <tr>
                <th>FDA Approval</th>
                <th>Bavaria Approval</th>
                <th>Drug Name</th>
                <th></th>
                </tr>
                </thead>
                <tbody>
                    {studies?.map((study, key) => {
                        if(study.inProgress === false){
                            return(
                                <tr key={key}>
                                    <td>True</td>
                                    <td>True</td>
                                    <td>{study.drugName}</td>
                                    <td><Button variant="primary" onClick={() => {}}>Download Results</Button></td>
                                </tr> 
                            )
                        }
                    })}
                </tbody>
                </Table>
                </Col>
            </Row>
    <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> 
    {studies?.map((study, key) => {
      if(content === study._id){
            if(study.fdaApproved === false && study.bavariaApproved === true){
                return(
                    <div key={key}>
        <Modal.Header closeButton>
        <Modal.Title>Study UUID: {study._id}</Modal.Title>
        </Modal.Header>
        <Row>
          <Col>
            <Modal.Body>Drug Name: <b style={{fontSize: 20}}>{study.drugName}</b></Modal.Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal.Body>FDA Approval: <b style={{fontSize: 20}}>False</b></Modal.Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal.Body>Bavaria Approval: <b style={{fontSize: 20}}>True</b></Modal.Body>
          </Col>
        </Row>
        <Modal.Footer>
        <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {}} >Advance Doses by One</Fab>
                        </Col>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {}} >Advance Doses to Complete</Fab>
                        </Col>
        </Row>
        <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
        </Modal.Footer>
        </div>
                )
            }
            else if(study.fdaApproved === true && study.bavariaApproved === false){
                return(
                    <div key={key}>
        <Modal.Header closeButton>
        <Modal.Title>Study UUID: {study._id}</Modal.Title>
        </Modal.Header>
        <Row>
          <Col>
            <Modal.Body>Drug Name: <b style={{fontSize: 20}}>{study.drugName}</b></Modal.Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal.Body>FDA Approval: <b style={{fontSize: 20}}>True</b></Modal.Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal.Body>Bavaria Approval: <b style={{fontSize: 20}}>False</b></Modal.Body>
          </Col>
        </Row>
        <Modal.Footer>
        <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {}} >Advance Doses by One</Fab>
                        </Col>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {}} >Advance Doses to Complete</Fab>
                        </Col>
        </Row>
        <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
        </Modal.Footer>
        </div>
                )
            }
            if(study.fdaApproved === false && study.bavariaApproved === false){
                return(
                    <div key={key}>
        <Modal.Header closeButton>
        <Modal.Title>Study UUID: {study._id}</Modal.Title>
        </Modal.Header>
        <Row>
          <Col>
            <Modal.Body>Drug Name: <b style={{fontSize: 20}}>{study.drugName}</b></Modal.Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal.Body>FDA Approval: <b style={{fontSize: 20}}>False</b></Modal.Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal.Body>Bavaria Approval: <b style={{fontSize: 20}}>False</b></Modal.Body>
          </Col>
        </Row>
        <Modal.Footer>
        <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {}} >Advance Doses by One</Fab>
                        </Col>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {}} >Advance Doses to Complete</Fab>
                        </Col>
        </Row>
        <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
        </Modal.Footer>
        </div>
                )
            }
            else{
                return(
                    <div key={key}>
        <Modal.Header closeButton>
        <Modal.Title>Study UUID: {study._id}</Modal.Title>
        </Modal.Header>
        <Row>
          <Col>
            <Modal.Body>Drug Name: <b style={{fontSize: 20}}>{study.drugName}</b></Modal.Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal.Body>FDA Approval: <b style={{fontSize: 20}}>True</b></Modal.Body>
          </Col>
        </Row>
        <Row>
          <Col>
            <Modal.Body>Bavaria Approval: <b style={{fontSize: 20}}>True</b></Modal.Body>
          </Col>
        </Row>
        <Modal.Footer>
        <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {}} >Advance Doses by One</Fab>
                        </Col>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <Fab color="primary" variant="extended" onClick={() => {}} >Advance Doses to Complete</Fab>
                        </Col>
        </Row>
        <AssignDrugs props={study._id}/>
        <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
        </Modal.Footer>
        </div>
                )
            }
        }
      })}
      </Modal>
          </Container>
                )}
            </Container>
        )}
        </div>
)}
    

export default StudyTable;