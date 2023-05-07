import { useEffect, useState } from "react";
import useBavaria from "../hooks/useBavaria";
import { Button, Form, Container, Badge, Row } from "react-bootstrap";
import { v4 as uuidv4 } from 'uuid';

//FUNCTION RETRIVES DATA (PROPS) FROM WHERE IT WAS CALLED (IN STUDYTABLE FILE) (PASSES STUDY ID)
function SendDrugs(props) {
  //RETRIVE DATA FROM VENDIA USING HOOK
  const { entities } = useBavaria();
  //CREATE ARRAY FOR PATIENTS
  const [patients, setPatients] = useState();
  //CREATE ARRAY FOR STUDIES
  const [studies, setStudy] = useState();
  //CREATE ARRAY FOR DRUGS
  const [drugs, setDrugs] = useState();
  //INITALIZE BATCHNUM
  var batchNum = 0;


  //CREATE USE STATE (FOR ALERT POPUP)
  const [show, setShow] = useState(false);
  const handleHide = () => setShow(false);
  const handleShow = () => setShow(true);

  //SET STUDY ID TO PROPS PASSED FROM ORIGINAL FUNCTION CALL (THE STUDY ID PASSED FROM STUDYTABLE)
  const studyID = props.props;

  //RUNS THROUGH ENTIRE ARRAY OF DRUGS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
  {
    drugs?.map((drug, key) => {
      key = { key }
      if (parseInt(drug.batchNumber) > batchNum) {
        //SET BATCH NUMBER TO CURRENT HIGHEST BATCH NUMBER SO IT WILL KEEP INCREASING
        batchNum = parseInt(drug.batchNumber)
      }
    })
  }

  //FIRES WHEN PAGE LOADS/RELOADS
  //CALLS LISTPATIENTS FUNCTION
  //CALL LISTDRUGS FUNCTION
  //CALL LISTSTUDIES FUNCTION
  useEffect(() => {
    listPatients();
    listStudies();
    listDrugs();
  }, []);

  //VENDIA FUNCTION TO GET PATIENTS IN DATABASE
  //STORES PATIENTS FROM DATABASE INTO THE ARRAY ABOVE
  const listPatients = async () => {
    let patientList = await entities.patient.list()
    setPatients(patientList.items);
  };

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

  //FUNCTION TO HANDLE ASSIGNING DRUGS
  const handleSendDrugs = async () => {

    //let drugUUID = uuidv4();
    var placeboDrug = false;

    //CALL INCREASEBATCHNUM FUNCTION
    increaseBatchNum();
    //CALL CHOOSETYPE FUNCTION
    chooseType();

    //INCREASE BATCH NUMBER BY ONE
    function increaseBatchNum() {
      batchNum++;
    }

    //RANDOMLY SELECT PLACEBO OR REAL
    function chooseType() {
      if ((Math.random() * (50 - 1) + 1) >= 25) {
        placeboDrug = false;
      }
      else {
        placeboDrug = true;
      }
    }


    //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
    {
      patients?.map((patient, key) => {
        key = { key }
        //IF PATIENT HAS A DOB LISTED
        //SUBTRING THE LAST 4 DIGITS OF THE DOB TO FIND YEAR
        if (patient.isEligible != null) {
          var dobYear = patient.dob.substring(patient.dob.length - 4);

          //ADD ICD-10 HEALTH CODE ELIGIBILITY!!
          //IF PATIENT IS INELIGIBLE SKIP THEM
          if (patient.isEligible === false) {
            console.log("Not Eligible!")
          }
          //IF PATIENT IS ELIGIBLE CREATE NEW DRUG
          else {
            if (patient.drugID === null) {
              chooseType();
              sendDrugs();
            }

            //FUNCTION TO CREATE DRUGS FOR ELIGIBLE PATIENTS
            async function sendDrugs() {

              //VENDIA FUNCTION TO ADD A DRUG IN THE DATABASE
              //VALUES TAKEN FROM PLACEBODRUG AND BATCHNUM VARIABLES ABOVE
              //ID SHOULD BE BLANK 
              //STUDYID SHOULD BE THE ID OF THE STUDY DRUGS ARE ASSOCIATED WITH (PASSED FROM STUDYTABLE)
              const createDrugs = await entities.drug.add(
                {
                  placebo: placeboDrug,
                  batchNumber: batchNum.toString(),
                  patientID: patient._id,
                  studyID: studyID,
                },
                {
                  aclInput: {
                    acl: [
                      {
                        principal: {
                          nodes: ["Bavaria"]
                        },
                        operations: ["READ"],
                        path: "placebo",
                      },
                      {
                        principal: {
                          nodes: ["Bavaria", "JaneHopkins"]
                        },
                        operations: ["READ"],
                        path: "batchNumber",
                      },
                      {
                        principal: {
                          nodes: ["FDA", "Bavaria", "JaneHopkins"]
                        },
                        operations: ["ALL"],
                        path: "patientID",
                      },
                      {
                        principal: {
                          nodes: ["Bavaria", "FDA", "JaneHopkins"]
                        },
                        operations: ["ALL"],
                        path: "studyID",
                      },
                    ],
                  },
                }
              );
              console.log(createDrugs);
            }

          }
        }
      })
    }
  };

  //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE SENDDRUGS
  return (
    <div>
      {show === false ? (
        <Container fluid>
          <Button variant="success" onClick={() => { handleSendDrugs(); handleShow(); setTimeout(() => { handleHide(); }, 2500); }}>Send Drugs to FDA</Button>
        </Container>
      ) : (
        <Container fluid>
          <Row>
            <Button variant="success" onClick={() => { handleSendDrugs(); handleShow(); setTimeout(() => { handleHide(); }, 2500); }}>Send Drugs to FDA</Button>
          </Row>
          <Row>
            <Badge bg="success">Success!</Badge>
          </Row>
        </Container>
      )}
    </div>
  );
}

export default SendDrugs;