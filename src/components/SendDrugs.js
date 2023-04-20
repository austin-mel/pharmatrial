import { useEffect, useState } from "react";
import useBavaria from "../hooks/useBavaria";
import { Button, Form } from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';

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

    //RUNS THROUGH ENTIRE ARRAY OF DRUGS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
    {drugs?.map((drug, key) => {
      if(drug.batchNumber > batchNum){
        //SET BATCH NUMBER TO CURRENT HIGHEST BATCH NUMBER SO IT WILL KEEP INCREASING
        batchNum = drug.batchNumber
      }
    })}

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
      function increaseBatchNum(){
        batchNum += 1;
      }

      //RANDOMLY SELECT PLACEBO OR REAL
      function chooseType(){
        if((Math.random() * (50 - 1) + 1) >= 25){
          placeboDrug = false;
        }
        else{
          placeboDrug = true;
        }
      }

      //SET STUDY ID TO PROPS PASSED FROM ORIGINAL FUNCTION CALL (THE STUDY ID PASSED FROM STUDYTABLE)
      const studyID = props.props;

      //FUNCTION TO CREATE DRUGS FOR ELIGIBLE PATIENTS
      async function sendDrugs(){
        
        //VENDIA FUNCTION TO ADD A DRUG IN THE DATABASE
        //VALUES TAKEN FROM PLACEBODRUG AND BATCHNUM VARIABLES ABOVE
        //ID SHOULD BE BLANK 
        //STUDYID SHOULD BE THE ID OF THE STUDY DRUGS ARE ASSOCIATED WITH (PASSED FROM STUDYTABLE)
        const createDrugs = await entities.drug.add(
          {
              placebo: placeboDrug,
              batchNumber: batchNum.toString(),
              id: "",
              studyID: studyID,
          },
          {
            aclInput:{
              acl:[
                {
                  principal: {
                    nodes: ["Bavaria"]
                  },
                  operations: ["READ"],
                  path: "placebo",
                },
                {
                  principal: {
                    nodes: ["Bavaria"]
                  },
                  operations: ["READ"],
                  path: "id",
                },
                {
                  principal: {
                    nodes: ["FDA"]
                  },
                  operations: ["ALL"],
                  path: "id",
                },
                {
                  principal: {
                    nodes: ["Bavaria","FDA"]
                  },
                  operations: ["READ"],
                  path: "batchNumber",
                },
              ],
            },
          } 
        );
        console.log(createDrugs);
      }

      //RUNS THROUGH ENTIRE ARRAY OF PATIENTS TO BE ABLE TO ACCESS DETAILS OF THE OBJECTS
      {patients?.map((patient, key) => { 
        key={key}
        //IF PATIENT HAS A DOB LISTED
        //SUBTRING THE LAST 4 DIGITS OF THE DOB TO FIND YEAR
        if(patient.dob != null){
          var dobYear = patient.dob.substring(patient.dob.length - 4);
        }

        //ADD ICD-10 HEALTH CODE ELIGIBILITY!!
        //IF PATIENT IS INELIGIBLE SKIP THEM
        if(parseInt(dobYear) >= 2005){
          console.log("Not Eligible!")
        }
        //IF PATIENT IS ELIGIBLE CREATE NEW DRUG
        else{
          chooseType();
          sendDrugs();
        }
      })}
    };

      //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE SENDDRUGS
    return (  
      //BUTTON THAT CALLS FUNCTION TO HANDLE SENDING/CREATING DRUGS ON CLICK
      <Button variant="success" onClick={() => {handleSendDrugs();}}>Send Drugs to FDA</Button>
    );
}

export default SendDrugs;