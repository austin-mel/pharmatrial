import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form } from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';

function SendDrugs() {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = useState();

    useEffect(() => {
      listPatients();
    }, []);

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      //console.log(patientList.items);
      setPatients(patientList.items);
    };

    const handleSendDrugs = async () => {

      //let drugUUID = uuidv4();
      var batchNum = 0;
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

      //console.log(drugUUID);
      //console.log(batchNum.toString());
      //console.log(placeboDrug);

      async function sendDrugs(){
        const addResponse = await entities.drug.add(
          {
              placebo: placeboDrug,
              batchNumber: batchNum.toString(),
              id: "",
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
                    nodes: ["Bavaria","FDA"]
                  },
                  operations: ["READ"],
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
        var test = patient.dob.substr(patient.dob.length - 4);
        console.log(test);

        if(parseInt(test) >= 2005){
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
    //   <div className="addDrug">
    //   
    //   </div>
    <Button variant="success" onClick={() => {handleSendDrugs();}}>Send Drugs to FDA</Button>
    );
}

export default SendDrugs;