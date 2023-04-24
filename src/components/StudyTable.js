import { useEffect, useState } from "react";
import useFDA from "../hooks/useFDA";
import { Table, Button, Row, Col, Modal, Container } from "react-bootstrap";
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import { getAuth } from "firebase/auth";
import Spinner from 'react-bootstrap/Spinner';
import Fab from '@mui/material/Fab';
import SendDrugs from "./SendDrugs";
import AssignDrugs from "./AssignDrugs";

//FUNCTION THAT IS RENDERED
function StudyTable() {
    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useFDA();
    //CREATE ARRAY FOR STUDIES
    const [studies, setStudy] = useState();
    //CREATE ARRAY FOR DRUGS
    const [drugs, setDrugs] = useState();
    //GET AUTH FROM FIREBASE HOOK
    const auth = getAuth();

    //CREATE USE STATE (FOR MODAL POPUP)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleOpen = () => setShow(true);

    //CREATE USE STATE (FOR CONDITIONAL RENDERING)
    const [content, setContent] = useState(false);
    //CREATE USE STATE (FOR CONDITIONAL RENDERING)
    const [loading, setLoading] = useState("");

     //RUNS WHEN PAGE LOADS/RELOADS
    useEffect(() => {
        //CALL LISTSTUDIES FUNCTION
        listStudies();
        listDrugs();
        //RENDER LOADING BAR FOR 6.5 SECONDS TO LET VENDIA RETREIVE DATA
        setLoading("true");
        setTimeout(() => {
          setLoading("false");
        }, 6500);
      }, []);

    //VENDIA FUNCTION TO GET STUDIES IN DATABASE
    //STORES STUDIES FROM DATABASE INTO THE ARRAY ABOVE
    const listStudies = async () => {
      let studyList = await entities.study.list()
      setStudy(studyList.items);
    };

    //VENDIA FUNCTION TO GET DRUGS IN DATABASE
    //STORES DRUGS FROM DATABASE INTO THE ARRAY ABOVE
    const listDrugs = async () => {
        let drugList = await entities.drug.list()
        setDrugs(drugList.items);
      };

    //FUNCTION TO HANDLE APPROVING STUDIES (PROPS ARE STUDYID)
    const handleApprove = async (props) => {

      //VENDIA FUNCTION TO GET DETAILS OF A CERTAIN OBJECT (STUDYID)
        var currentStudy = await entities.study.get(props);
      //SET VARIABLES TO CURRENT VALUES IN DATABASE
        var bavariaAccount = currentStudy.bavariaApproved;
        var fdaAccount = currentStudy.fdaApproved;

        //FIREBASE FUNCTION TO GET CURRENT SIGNED IN USER && VISTOR TYPE
        const user = auth.currentUser;

        if (user !== null) {
            // The user object has basic properties such as display name, email, etc.
            //CHECK ACCOUNT TYPE
            const displayName = user.displayName;
            
            //IF ACCOUNT IS BAVARIA ADMIN -> SET APPROVAL TO TRUE FOR BAVARIA
            if(displayName === "Bavaria Admin"){
                bavariaAccount = true;
            }
            //IF ACCOUNT IS FDA ADMIN -> SET APPROVAL TO TRUE FOR FDA
            else if(displayName === "FDA Admin"){
                fdaAccount = true;
            }
        }

      //VENDIA FUNCTION TO EDIT PATIENT
      //GET VALUES FROM THE FORM BELOW BY FETCHING IDS FROM FORM
      //_id MUST BE ID OF STUDY YOU WANT TO EDIT (PASSED FROM PROPS)
      //FETCH VALUES FROM ABOVE TO CHANGE APPROVAL STATUS DEPENDING ON WHO CLICKED APPROVE
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
          console.log(changeApproval);
        };

    //FIREBASE FUNCTION TO GET CURRENT SIGNED IN USER && VISTOR TYPE
    const user = auth.currentUser;    
    const displayName = user.displayName;

    //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE STUDYTABLE
    return (
        <div className="studyTable">
        {loading === "true" ? (
          <Container fluid style={{display:'flex'}}>
        {
          //IF LOADING IS TRUE DISPLAY A CIRCULAR LOADING WHEEL ON THE PAGE
        }
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                    <Spinner animation="border" />
                </Col>
            </Row>
        </Container>
        ) : (
            <Container fluid>
            {
              //IF LOADING IS FALSE DISPLAY PAGE
              //IF ACCOUNT TYPE IS BAVARIA ADMIN LOAD THIS
            }
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
                    {
                  //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                    }
                            {studies?.map((study, key) => {
                              //IF STUDY IS NOT APPROVED BY EITHER PARTY, DISPLAY FALSE ON PAGE FOR BOTH
                                if(study.fdaApproved === false && study.bavariaApproved === false){
                                    return(
                                        <tr key={key}>
                                            <td>False</td>
                                            <td>False</td>
                                            <td>{study.drugName}</td>
                                            {
                                            //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                            }
                                            <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                        </tr>
                                    )}
                                //IF STUDY IS NOT APPROVED BY JUST BAVARIA, DISPLAY FALSE ON BAVARIA TRUE FOR FDA
                                else if(study.bavariaApproved === false && study.fdaApproved === true){
                                    return(
                                        <tr key={key}>
                                            <td>True</td>
                                            <td>False</td>
                                            <td>{study.drugName}</td>
                                            {
                                            //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                            }
                                            <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                        </tr> 
                                )}
                                //IF STUDY IS NOT APPROVED BY JUST FDA, DISPLAY FALSE ON FDA TRUE FOR BAVARIA
                                else if(study.bavariaApproved === true && study.fdaApproved === false){
                                    return(
                                        <tr key={key}>
                                            <td>False</td>
                                            <td>True</td>
                                            <td>{study.drugName}</td>
                                            {
                                            //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                            }
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
                        {
                  //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                    }
                            {studies?.map((study, key) => {
                              //IF STUDY IS APPROVED BY BOTH PARTIES DISPLAY TRUE FOR BOTH
                                if(study.bavariaApproved === true && study.fdaApproved === true){
                                    return(
                                        <tr key={key}>
                                            <td>True</td>
                                            <td>True</td>
                                            <td>{study.drugName}</td>
                                            {
                                            //BUTTON TO VIEW STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                            }
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
                        {
                  //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                    }
                            {studies?.map((study, key) => {
                              //IF STUDY IS COMPLETED
                                if(study.inProgress === false){
                                    return(
                                        <tr key={key}>
                                            <td>True</td>
                                            <td>True</td>
                                            <td>{study.drugName}</td>
                                            {
                                            //BUTTON TO DOWNLOAD RESULTS (NOT IMPLEMENTED YET!!!)
                                            }
                                            <td><Button variant="primary" onClick={() => {}}>Download Results</Button></td>
                                        </tr> 
                                    )
                                }
                            })}
                        </tbody>
                        </Table>
                        </Col>
                    </Row>
                    {
                    //MODAL THAT WILL POP WHEN VIEWING A STUDY
                    }
            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> 
            {
              //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
            }
            {studies?.map((study, key) => {
              //FIND STUDY THAT IS EQUAL TO SETSTATE FROM ABOVE (THE SPECIFIC STUDY WE CLICK VIEW ON)
              if(content === study._id){
                //IF STUDY IS NOT APPROVED BY FDA BUT IS BY BAVARIA, DISPLAY FALSE ON FDA AND TRUE FOR BAVARIA
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
                {
                  //BUTTON TO CLOSING MODAL
                }
                <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
                </Modal.Footer>
                </div>
                        )
                    }
                    //IF STUDY IS NOT APPROVED BY FDA BUT IS BY BAVARIA, DISPLAY FALSE ON FDA AND TRUE FOR BAVARIA
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
                {
                  //BUTTON TO CLOSING MODAL
                }
                <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
                </Modal.Footer>
                </div>
                        )
                    }
                    //STUDY IS NOT APPROVED BY BOTH PARTIES, DISPLAY FALSE FOR BOTH
                    else if(study.fdaApproved === false && study.bavariaApproved === false){
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
                {
                  //BUTTON TO CLOSING MODAL
                }
                <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
                </Modal.Footer>
                </div>
                        )
                    }
                    //STUDY IS APPROVED BY BOTH PARTIES, DISPLAY TRUE FOR BOTH
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
                {
                  //BUTTON TO CALL SENDDRUGS FILE (STUDY ID IS PASSED AS PROPS)
                }
                    <SendDrugs props={study._id}/>
                    {
                  //BUTTON TO CLOSING MODAL
                  }
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
           {
              //IF LOADING IS FALSE DISPLAY PAGE
              //IF ACCOUNT TYPE IS FDA ADMIN LOAD THIS
            }
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
                {
                  //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                }
                    {studies?.map((study, key) => {
                  //IF NEITHER PARTY HAS APPROVED DISPLAY FALSE FOR BOTH
                        if(study.fdaApproved === false && study.bavariaApproved === false){
                            return(
                                <tr key={key}>
                                    <td>False</td>
                                    <td>False</td>
                                    <td>{study.drugName}</td>
                                    {
                                      //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                    }
                                    <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                </tr>
                            )}
                        //IF FDA APPROVES BUT BAVARIA DOESNT, DISPLAY TRUE FOR FDA AND FALSE FOR BAVARIA
                        else if(study.bavariaApproved === false && study.fdaApproved === true){
                            return(
                                <tr key={key}>
                                    <td>True</td>
                                    <td>False</td>
                                    <td>{study.drugName}</td>
                                    {
                                      //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                    }
                                    <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                </tr> 
                        )}
                        //IF BAVARIA APPROVES BUT FDA DOESNT, DISPLAY TRUE FOR BAVARIA AND FALSE FOR FDA
                        else if(study.bavariaApproved === true && study.fdaApproved === false){
                            return(
                                <tr key={key}>
                                    <td>False</td>
                                    <td>True</td>
                                    <td>{study.drugName}</td>
                                    {
                                      //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                    }
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
                {
                  //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                }
                    {studies?.map((study, key) => {
                      //IF BOTH PARTIES APPROVE OF THE STUDY THEN DISPLAY TRUE FOR BOTH
                        if(study.bavariaApproved === true && study.fdaApproved === true){
                            return(
                                <tr key={key}>
                                    <td>True</td>
                                    <td>True</td>
                                    <td>{study.drugName}</td>
                                    {
                                            //BUTTON TO VIEW STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                    }
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
                {
                  //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                }
                    {studies?.map((study, key) => {
                      //IF STUDY IS COMPLETE
                        if(study.inProgress === false){
                            return(
                                <tr key={key}>
                                    <td>True</td>
                                    <td>True</td>
                                    <td>{study.drugName}</td>
                                    {
                                  //BUTTON TO DOWNLOAD RESULTS (NOT IMPLEMENTED!!!)
                                  }
                                    <td><Button variant="primary" onClick={() => {}}>Download Results</Button></td>
                                </tr> 
                            )
                        }
                    })}
                </tbody>
                </Table>
                </Col>
            </Row>
            {
                    //MODAL THAT WILL POP WHEN VIEWING A STUDY
            }
    <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered> 
    {
        //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
     }
    {studies?.map((study, key) => {
      //FIND STUDY THAT IS EQUAL TO SETSTATE FROM ABOVE (THE SPECIFIC STUDY WE CLICK VIEW ON)
      if(content === study._id){
        //IF BAVARIA APPROVES BUT FDA DOESNT, DISPLAY TRUE FOR BAVARIA AND FALSE FOR FDA
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
        {
         //BUTTON TO CLOSING MODAL
        }
        <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
        </Modal.Footer>
        </div>
                )
            }
            //IF FDA APPROVES BUT BAVARIA DOESNT, DISPLAY TRUE FOR FDA AND FALSE FOR BAVARIA
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
        {
        //BUTTON TO CLOSING MODAL
        }
        <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
        </Modal.Footer>
        </div>
                )
            }
            //IF NEITHER PARTY APPROVES, DISPLAY FALSE FOR BOTH
           else if(study.fdaApproved === false && study.bavariaApproved === false){
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
        {
        //BUTTON TO CLOSING MODAL
        }
        <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon/>Close</Button>
        </Modal.Footer>
        </div>
                )
            }
            //IF BOTH APPROVE, DISPLAY TRUE FOR BOTH
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
        {
        //BUTTON TO CALL ASSIGNDRUGS FILE (PASSES STUDY ID AS PROPS)
        }
        <AssignDrugs props={study._id}/>
        {
        //BUTTON TO CLOSING MODAL
        }
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