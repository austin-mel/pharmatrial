import { useEffect, useState } from "react";
import useBavaria from "../hooks/useBavaria";
import { Button, Form } from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';

function SendDrugs(props) {
    const { entities } = useBavaria();
    const [patients, setPatients] = useState();
    const [studies, setStudy] = useState();
    const [drugs, setDrugs] = useState();
    var batchNum = 0;

    {drugs?.map((drug, key) => {
      if(drug.batchNumber > batchNum){
        batchNum = drug.batchNumber
      }
    })}

    useEffect(() => {
      listPatients();
      listStudies();
      listDrugs();
    }, []);

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      setPatients(patientList.items);
    };

    const listStudies = async () => {
      let studyList = await entities.study.list()
      setStudy(studyList.items);
    };

    const listDrugs = async () => {
      let drugList = await entities.drug.list()
      setDrugs(drugList.items);
    };

    const handleSendDrugs = async () => {

      //let drugUUID = uuidv4();
      var placeboDrug = false;

      increaseBatchNum();
      chooseType();

      function increaseBatchNum(){
        batchNum += 1;
      }

      function chooseType(){
        if((Math.random() * (50 - 1) + 1) >= 25){
          placeboDrug = false;
        }
        else{
          placeboDrug = true;
        }
      }

      const studyID = props.props;

      async function sendDrugs(){
        const addResponse = await entities.drug.add(
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
        console.log(addResponse);
      }

      {patients?.map((patient, key) => { 
        key={key}
        if(patient.dob != null){
          var dobYear = patient.dob.substring(patient.dob.length - 4);
        }

        if(parseInt(dobYear) >= 2005){
          console.log("Not Eligible!")
        }
        else{
          chooseType();
          sendDrugs();
        }
      })}
      increaseBatchNum();
    };

    return (  
      <Button variant="success" onClick={() => {handleSendDrugs();}}>Send Drugs to FDA</Button>
    );
}

export default SendDrugs;