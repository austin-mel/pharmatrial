import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
//import {v4 as uuidv4} from 'uuid';
import useFDA from "../hooks/useFDA";

//FUNCTION RETRIVES DATA (PROPS) FROM WHERE IT WAS CALLED (IN STUDYTABLE FILE) (PASSES STUDY ID)
function AssignDrugs(props) {
    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useFDA();
    //CREATE ARRAY FOR PATIENTS
    const [patients, setPatients] = useState();
    //CREATE ARRAY FOR DRUGS
    const [drugs, setDrugs] = useState();

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
        //IF PATIENT HAS A DOB LISTED
        //SUBTRING THE LAST 4 DIGITS OF THE DOB TO FIND YEAR
        if(patient.dob != null){
          var dobYear = patient.dob.substring(patient.dob.length - 4);
        }

        //ADD ICD-10 HEALTH CODE ELIGIBILITY!!
        if(patient.drugID === null){
          //IF PATIENT IS INELIGIBLE SKIP THEM
          if(parseInt(dobYear) >= 2005){
            console.log("Not Eligible!")
          }
          //IF PATIENT IS ELIGIBLE ASSIGN DRUG TO GIVEN PATIENT
          else{
            //PASSES CURRENT PATIENT OBJECT TO FUNCTION BELOW
            addDrugs(patient);
          }
        }
      })}

      //FUNCTION TO ASSIGN DRUGS TO PATIENTS
      //KEEPS PATIENT FROM ABOVE
      async function addDrugs(patient){

      //AN ATTEMPT TO GET THE FIRST AVAILABLE DRUG (ONE WITHOUT A PATIENT ID PROPERTY)
      //DID NOT WORK!!
        for(var i=0; i<drugs.length; i++){
          if(drugs[i].patientID === null){
            var drugID = drugs[i]._id;
            break;
          }
        }

        //VENDIA FUNCTION TO GET DETAILS OF A CERTAIN OBJECT (IDEALLY THE FIRST AVAILABE DRUG FROM ABOVE BUT IT DIDNT WORK)
        const drugIDs = await entities.drug.get(drugID);
        console.log(drugIDs);

        //VENDIA FUNCTION TO UPDATE A DRUG IN THE DATABASE
        //_id MUST BE SET TO THE ID OF THE DRUG YOU WANT TO EDIT (IDEALLY THE FIRST AVAILABE DRUG FROM ABOVE BUT IT DIDNT WORK)
        const assignDrugs = await entities.drug.update(
          {
              //SECOND ID VALUE SHOULD BE ID OF THE PATIENT IT IS ASSIGNED TOO
              _id: drugIDs._id,
              id: patient._id,
          },
          {
            aclInput:{
              acl:[
                {
                  principal: {
                    nodes: ["FDA"]
                  },
                  operations: ["ALL"],
                  path: "placebo",
                },
                {
                  principal: {
                    nodes: ["Bavaria","FDA"]
                  },
                  operations: ["ALL"],
                  path: "id",
                },
                {
                  principal: {
                    nodes: ["Bavaria","FDA"]
                  },
                  operations: ["ALL"],
                  path: "batchNumber",
                },
              ],
            },
          } 
        );
        
      //VENDIA FUNCTION TO GET DETAILS OF A CERTAIN OBJECT (THE STUDY ID PASSED FROM STUDYTABLE)
      const studyID = await entities.drug.get(props.props);

      //VENDIA FUNCTION TO UPDATE A PATIENT IN THE DATABASE
      //_id MUST BE THE ID OF THE PATIENT YOU WANT TO EDIT
      //DRUG ID SHOULD BE DRUG ID FROM ABOVE (DOESNT WORK!!)
      //STUDY ID SET TO ID VALUE (THE STUDY ID PASSED FROM STUDYTABLE)
        const updatePatient = await entities.patient.update(
          {
              _id: patient._id,
              drugID: drugIDs._id,
              studyID: studyID._id,
              doseNum: "1",
          },
          {
            aclInput:{
              acl:[
                {
                  principal: {
                    nodes: ["Bavaria","FDA","JaneHopkins"]
                  },
                  operations: ["ALL"],
                  path: "drugID",
                },
                {
                  principal: {
                    nodes: ["Bavaria","FDA","JaneHopkins"]
                  },
                  operations: ["ALL"],
                  path: "studyID",
                },
                {
                  principal: {
                    nodes: ["Bavaria","FDA","JaneHopkins"]
                  },
                  operations: ["ALL"],
                  path: "doseNum",
                },
              ],
            },
          } 
        );
        console.log(assignDrugs);
        console.log(updatePatient);
      }

      //REMOVED

    };

    //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE ASSIGNDRUGS
    return (  
    //BUTTON THAT CALLS FUNCTION TO HANDLE ASSIGNING DRUGS ON CLICK
        <Button variant="info" onClick={() => {handleAssignDrugs();}}>Give Drugs to Eligible Patients</Button>
    );
}

export default AssignDrugs;