import { useEffect, useState } from "react";
import { Button, Form, Container, Badge, Row } from "react-bootstrap";
//import {v4 as uuidv4} from 'uuid';
import useFDA from "../hooks/useFDA";
import useJaneHopkins from "../hooks/useJaneHopkins";

//FUNCTION RETRIVES DATA (PROPS) FROM WHERE IT WAS CALLED (IN STUDYTABLE FILE) (PASSES STUDY ID)
function AssignDrugs(props) {
    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useJaneHopkins();
    //CREATE ARRAY FOR PATIENTS
    const [patients, setPatients] = useState();
    //CREATE ARRAY FOR DRUGS
    const [drugs, setDrugs] = useState();

            //CREATE USE STATE (FOR ALERT POPUP)
            const [show, setShow] = useState(false);
            const handleHide = () => setShow(false);
            const handleShow = () => setShow(true);

    //SET STUDY ID TO PROPS PASSED FROM ORIGINAL FUNCTION CALL (THE STUDY ID PASSED FROM STUDYTABLE)
    const studyID = props.props;

    //FIRES WHEN PAGE LOADS/RELOADS
    //CALLS LISTPATIENTS FUNCTION
    //CALL LISTDRUGS FUNCTION
    useEffect(() => {
      listPatients();
      listDrugs();
    }, []);

    //VENDIA FUNCTION TO GET PATIENTS IN DATABASE
    //STORES PATIENTS FROM DATABASE INTO THE ARRAY ABOVE
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

    //FUNCTION TO HANDLE ASSIGNING DRUGS
    const handleAssignDrugs = async () => {

    //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
      {patients?.map((patient, key) => { 
        key={key}
        const name = patient.name;
        const lastName = patient.lastName;
        const dob = patient.dob;
        const insuranceNum = patient.insuranceNumber;
        const height = patient.height;
        const weight = patient.weight;
        const bloodPressure = patient.bloodPressure;
        const bloodType = patient.bloodType;
        const tempterature = patient.temperature;
        const oxSat = patient.oxygenSaturation;
        const address = patient.address;
        const isEligible = patient.isEligible;
        const familyHistory = patient.familyHistory;
        const currentlyEmployed = patient.currentlyEmployed;
        const currentlyInsured = patient.currentInsured;

        //IF PATIENT HAS A DOB LISTED
        //SUBTRING THE LAST 4 DIGITS OF THE DOB TO FIND YEAR
        if(patient.dob != null){
          var dobYear = patient.dob.substring(patient.dob.length - 4);
        }

        //ADD ICD-10 HEALTH CODE ELIGIBILITY!!
        if(patient.drugID === null){
          if(patient.dob != null){
            if(patient.isEligible === false){
              console.log("Not Eligible!")
            }
            //IF PATIENT IS ELIGIBLE ASSIGN DRUG TO GIVEN PATIENT
            else{
              //PASSES CURRENT PATIENT OBJECT TO FUNCTION BELOW

              //IF COMMENT BELOW IS REMOVED IT WILL ADD DRUGS TO VENDIA (UNCOMMENT TO TEST)
              {drugs?.map((drug, key) => { 
                key={key} 
                if(drug.patientID === patient._id){
                  addDrugs();

                  //FUNCTION TO ASSIGN DRUGS TO PATIENTS
        //KEEPS PATIENT FROM ABOVE
        async function addDrugs(){

          //FIND A WAY TO GET A DRUG ID THAT IS AVAILABLE TO BE ASSIGNED (patientID is null)
          //SET _id PARAMETER TO VARIABLE OF THAT DRUG ID
          //WE HAVE THE STUDY ID SAVED AND THE PATIENT ID OF AN ELIGIBLE PATIENT WITHOUT A DRUG ASSIGNED TO IT WE JUST NEED AN AVAILABLE DRUG ID
  
          //VENDIA FUNCTION TO UPDATE A DRUG IN THE DATABASE
          //_id MUST BE SET TO THE ID OF THE DRUG YOU WANT TO EDIT (IDEALLY THE FIRST AVAILABE DRUG FROM ABOVE BUT IT DIDNT WORK)
          const assignDrugs = await entities.patient.update(
            {
                _id: drug.patientID,
                name: name,
                lastName: lastName,
                dob: dob,
                insuranceNumber: insuranceNum,
                height: height,
                weight: weight,
                bloodPressure: bloodPressure,
                bloodType: bloodType,
                temperature: tempterature,
                oxygenSaturation: oxSat,
                address: address,
                isEligible: isEligible,
                familyHistory: familyHistory,
                currentlyEmployed: currentlyEmployed,
                currentlyInsured: currentlyInsured,
                drugID: drug._id,
                studyID: studyID,
                doseNum: "0",
            },
            {
              aclInput:{
                acl:[
                  {
                    principal: {
                      nodes: ["FDA","Bavaria"]
                    },
                    operations: ["ALL"],
                    path: "drugID",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["ALL"],
                    path: "studyID",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["ALL"],
                    path: "doseNum",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "name",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "lastName",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "dob",
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "height"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "weight"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "bloodPressure"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "bloodType"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "temperature"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "oxygenSaturation"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "familyHistory"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "currentlyEmployed"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "currentlyInsured"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "isEligible"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "currentMedications"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "allergies"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["READ"],
                    path: "icdHealthCodes"
                  },
                  {
                    principal: {
                      nodes: ["Bavaria","FDA"]
                    },
                    operations: ["ALL"],
                    path: "visits"
                  },
                ],
              },
            } 
          );
          console.log(assignDrugs);
        }
                }
              })}
            }
          }
        }
      })}

      
    };

    //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE ASSIGNDRUGS
    return (  
      <div>
      {show === false ? (
    //BUTTON THAT CALLS FUNCTION TO HANDLE ASSIGNING DRUGS ON CLICK
       <Container fluid>
        <Button variant="info" onClick={() => {handleAssignDrugs(); handleShow(); setTimeout(() => {handleHide();}, 2500);}}>Give Drugs to Eligible Patients</Button>
        </Container>
      ) : (
        <Container fluid>
        <Row>
        <Button variant="info" onClick={() => {handleAssignDrugs(); handleShow(); setTimeout(() => {handleHide();}, 2500);}}>Give Drugs to Eligible Patients</Button>
        </Row>
        <Row>
        <Badge bg="success">Success!</Badge>
        </Row>
        </Container>
      )}
      </div>
    );
}

export default AssignDrugs;