import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form } from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';
import useBavaria from "../hooks/useBavaria";

function AddDrugs() {
    const { entities } = useJaneHopkins();
    const { entities2 } = useBavaria();
    const [patients, setPatients] = useState();
    const [drugs, setDrugs] = useState();

    useEffect(() => {
      listPatients();
      setDrugs();
    }, []);

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      //console.log(patientList.items);
      setPatients(patientList.items);
    };

    const listDrugs = async () => {
        let drugList = await entities.drugs.list()
        //console.log(patientList.items);
        setDrugs(patientList.items);
      };

    const handleAddDrugs = async () => {

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

      async function addDrugs(patient){

        {drugs?.map((drug, key) => {


        })}

        console.log(patient);

        const addResponse = await entities.drug.update(
          {
              _id: drug._id,
              id: patient._id,
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
        var DOB = patient.dob.substr(patient.dob.length - 4);
        console.log(DOB);

        if(parseInt(DOB) >= 2005){
          console.log("Not Eligible!")
        }
        else{
          addDrugs(patient._id);
        }
            })}
      
      increaseBatchNum();
    };

    

    return (  
    //   <div className="addDrug">
    //   
    //   </div>
    <Button variant="info" onClick={() => {handleAddDrugs();}}>Give Drugs to Eligible Patients</Button>
    );
}

export default AddDrugs;