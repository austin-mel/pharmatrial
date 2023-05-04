import { useEffect, useState } from "react";
import useFDA from "../hooks/useFDA";
import { Table, Button, Row, Col, Modal, Container, Spinner } from "react-bootstrap";
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';
import { getAuth } from "firebase/auth";
import Fab from '@mui/material/Fab';
import SendDrugs from "./SendDrugs";
import AssignDrugs from "./AssignDrugs";
import DownloadReport from "./DownloadReport";

//FUNCTION THAT IS RENDERED
function StudyTable() {
    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useFDA();
    //CREATE ARRAY FOR STUDIES
    const [studies, setStudy] = useState();
    const [patients, setPatients] = useState();
    //CREATE ARRAY FOR DRUGS
    const [drugs, setDrugs] = useState();
    //GET AUTH FROM FIREBASE HOOK
    const auth = getAuth();

    var patientCount = 0;
    var completedCount = 0;

    function checkTrialStatus(){
      {studies?.map((study, key) => { 
        if(study.inProgress === true){

        key={key}
        const fdaApproved = study.fdaApproved;
        const bavariaApproved = study.bavariaApproved;
        const drugName = study.drugName;

        {patients?.map((patient, key) => { 
          key={key}
          if(patient.studyID === study._id){
            patientCount++;
            if(parseInt(patient.doseNum) === 5){
              completedCount++;
            }
          }
        })}

        console.log(patientCount);
        console.log(completedCount);

      if(patientCount != 0 && patientCount === completedCount){
        completeTrial();

        async function completeTrial(){

          //FIND A WAY TO GET A DRUG ID THAT IS AVAILABLE TO BE ASSIGNED (patientID is null)
          //SET _id PARAMETER TO VARIABLE OF THAT DRUG ID
          //WE HAVE THE STUDY ID SAVED AND THE PATIENT ID OF AN ELIGIBLE PATIENT WITHOUT A DRUG ASSIGNED TO IT WE JUST NEED AN AVAILABLE DRUG ID
  
          //VENDIA FUNCTION TO UPDATE A DRUG IN THE DATABASE
          //_id MUST BE SET TO THE ID OF THE DRUG YOU WANT TO EDIT (IDEALLY THE FIRST AVAILABE DRUG FROM ABOVE BUT IT DIDNT WORK)
          const endStudy = await entities.study.update(
            {
                _id: study._id,
                fdaApproved: fdaApproved,
                bavariaApproved: bavariaApproved,
                drugName: drugName,
                inProgress: false,
            },
            {
              aclInput:{
                acl:[
                  {
                    principal: {
                      nodes: ["Bavaria"]
                    },
                    operations: ["ALL"],
                    path: "fdaApproved",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria"]
                    },
                    operations: ["ALL"],
                    path: "bavariaApproved",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria", "JaneHopkins"]
                    },
                    operations: ["READ"],
                    path: "drugName",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","JaneHopkins"]
                    },
                    operations: ["ALL"],
                    path: "inProgress"
                  },
                ],
              },
            } 
          );
          console.log(endStudy);
        }
      }
    }
    })}
  }

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
        listPatients();
        //RENDER LOADING BAR FOR 7 SECONDS TO LET VENDIA RETREIVE DATA
        setLoading("true");
        setTimeout(() => {
          setLoading("false");
        }, 7000);
      }, []);

    //VENDIA FUNCTION TO GET STUDIES IN DATABASE
    //STORES STUDIES FROM DATABASE INTO THE ARRAY ABOVE
    const listStudies = async () => {
      let studyList = await entities.study.list()
      setStudy(studyList.items);
    };

        //VENDIA FUNCTION TO GET STUDIES IN DATABASE
    //STORES STUDIES FROM DATABASE INTO THE ARRAY ABOVE
    const listPatients = async () => {
      let patientList = await entities.patient.list()
      setPatients(patientList.items);
    };

    //VENDIA FUNCTION TO GET DRUGS IN DATABASE
    //STORES DRUGS FROM DATABASE INTO THE ARRAY ABOVE
    const listDrugs = async () => {
        let drugList = await entities.drug.list()
        setDrugs(drugList.items);
      };

      function deleteStudy(props){
        const studyID = props;
  
        const deleteStudies = async () => {
          const deleteStudy = await entities.study.remove(studyID);
        }
  
        deleteStudies();
      }

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
        <div className="studytable">
        {loading === "true" ? (
          <div fluid>
        {
          //IF LOADING IS TRUE DISPLAY A CIRCULAR LOADING WHEEL ON THE PAGE
        }
            <Row>
                <Col className="justify-content-md-center" style={{display:'flex'}}>
                    <Spinner animation="border" />
                </Col>
            </Row>
        </div>
        ) : (
            <div fluid>
            {
              //IF LOADING IS FALSE DISPLAY PAGE
              //IF ACCOUNT TYPE IS BAVARIA ADMIN LOAD THIS
            }
                {displayName === "Bavaria Admin"? (
                    <div fluid>
                      <div className="studytable">
                    <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                            <h5>Pending Studies:</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="justify-content-md-center" style={{display:'flex'}}>
                        <Table striped bordered hover>
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
                                if(study.fdaApproved === false && study.bavariaApproved === false && study.inProgress === true){
                                    return(
                                        <tr key={key}>
                                            <td><b style={{color: "red"}}>False</b></td>
                                            <td><b style={{color: "red"}}>False</b></td>
                                            <td>{study.drugName}</td>
                                            {
                                            //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                            }
                                            <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                        </tr>
                                    )}
                                //IF STUDY IS NOT APPROVED BY JUST BAVARIA, DISPLAY FALSE ON BAVARIA TRUE FOR FDA
                                else if(study.bavariaApproved === false && study.fdaApproved === true && study.inProgress === true){
                                    return(
                                        <tr key={key}>
                                            <td><b style={{color: "green"}}>True</b></td>
                                            <td><b style={{color: "red"}}>False</b></td>
                                            <td>{study.drugName}</td>
                                            {
                                            //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                            }
                                            <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                        </tr> 
                                )}
                                //IF STUDY IS NOT APPROVED BY JUST FDA, DISPLAY FALSE ON FDA TRUE FOR BAVARIA
                                else if(study.bavariaApproved === true && study.fdaApproved === false && study.inProgress === true){
                                    return(
                                        <tr key={key}>
                                            <td><b style={{color: "red"}}>False</b></td>
                                            <td><b style={{color: "green"}}>True</b></td>
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
                        <Table striped bordered hover>
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
                                if(study.bavariaApproved === true && study.fdaApproved === true && study.inProgress === true){
                                    return(
                                        <tr key={key}>
                                            <td><b style={{color: "green"}}>True</b></td>
                                            <td><b style={{color: "green"}}>True</b></td>
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
                                            <td><b style={{color: "green"}}>True</b></td>
                                            <td><b style={{color: "green"}}>True</b></td>
                                            <td>{study.drugName}</td>
                                            {
                                            //BUTTON TO DOWNLOAD RESULTS (NOT IMPLEMENTED YET!!!)
                                            }
                                            <td><DownloadReport props={study._id}/></td>
                                        </tr> 
                                    )
                                }
                            })}
                        </tbody>
                        </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Button variant="outline-info" onClick={() => {listStudies(); }}>Refresh Studies</Button>
                      </Row>
                      </div>
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
                  </div>
                ) : (
                    <div fluid>
                      <div className="studytable">
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
                        if(study.fdaApproved === false && study.bavariaApproved === false && study.inProgress === true){
                            return(
                                <tr key={key}>
                                    <td><b style={{color: "red"}}>False</b></td>
                                    <td><b style={{color: "red"}}>False</b></td>
                                    <td>{study.drugName}</td>
                                    {
                                      //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                    }
                                    <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                </tr>
                            )}
                        //IF FDA APPROVES BUT BAVARIA DOESNT, DISPLAY TRUE FOR FDA AND FALSE FOR BAVARIA
                        else if(study.bavariaApproved === false && study.fdaApproved === true && study.inProgress === true){
                            return(
                                <tr key={key}>
                                    <td><b style={{color: "green"}}>True</b></td>
                                    <td><b style={{color: "red"}}>False</b></td>
                                    <td>{study.drugName}</td>
                                    {
                                      //BUTTON TO APPROVE STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                    }
                                    <td><Button variant="success" onClick={() => {handleApprove(study._id);}}>Approve Study</Button></td>
                                </tr> 
                        )}
                        //IF BAVARIA APPROVES BUT FDA DOESNT, DISPLAY TRUE FOR BAVARIA AND FALSE FOR FDA
                        else if(study.bavariaApproved === true && study.fdaApproved === false && study.inProgress === true){
                            return(
                                <tr key={key}>
                                    <td><b style={{color: "red"}}>False</b></td>
                                    <td><b style={{color: "green"}}>True</b></td>
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
                <th></th>
                </tr>
                </thead>
                <tbody>
                {
                  //RUNS THROUGH ENTIRE ARRAY OF STUDIES TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
                }
                    {studies?.map((study, key) => {
                      //IF BOTH PARTIES APPROVE OF THE STUDY THEN DISPLAY TRUE FOR BOTH
                        if(study.bavariaApproved === true && study.fdaApproved === true && study.inProgress === true){
                            return(
                                <tr key={key}>
                                    <td><b style={{color: "green"}}>True</b></td>
                                    <td><b style={{color: "green"}}>True</b></td>
                                    <td>{study.drugName}</td>
                                    {
                                            //BUTTON TO VIEW STUDY (PASSED STUDY ID TO APPROVE AS PROPS)
                                    }
                                    <td><Button variant="primary" onClick={() => {setContent(study._id); handleOpen();}}>View Study</Button></td>
                                    <td><Button variant="danger" onClick={() => {deleteStudy(study._id);}}>Delete Study</Button></td>
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
                                    <td><DownloadReport props={study._id}/></td>
                                    <td><Button variant="danger" onClick={() => {deleteStudy(study._id);}}>Delete Study</Button></td>
                                </tr> 
                            )
                        }
                    })}
                </tbody>
                </Table>
                </Col>
            </Row>
            <Row>
                        <Button variant="outline-info" onClick={() => {checkTrialStatus(); setTimeout(() => {listStudies();}, 800);}}>Refresh Studies</Button>
                      </Row>
            </div>
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
          </div>
                )}
            </div>
        )}
        </div>
)}
    

export default StudyTable;