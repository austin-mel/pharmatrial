import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Button, Form } from "react-bootstrap";
import {v4 as uuidv4} from 'uuid';
import useFDA from "../hooks/useFDA";

function AddDrugs() {
    const { entities } = useFDA();
    const [patients, setPatients] = useState();
    const [drugs, setDrugs] = useState();

    useEffect(() => {
      listPatients();
      listDrugs();
    }, []);

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      //console.log(patientList.items);
      setPatients(patientList.items);
    };

    const listDrugs = async () => {
        let drugList = await entities.drug.list()
        //console.log(patientList.items);
        setDrugs(drugList.items);
      };

    const handleAddDrugs = async () => {

      async function addDrugs(patient){

        console.log(patient._id);

        const userResponse = await entities.drug.get('01876c8d-7e0a-a1d7-b332-5cd72425b6a2');

        const addResponse = await entities.drug.update(
          {
              _id: userResponse._id,
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
        var DOB = patient.dob.substr(patient.dob.length - 4);

        //ADD ICD-10 HEALTH CODE ELIGIBILITY
        if(parseInt(DOB) >= 2005){
          console.log("Not Eligible!")
        }
        else{
          addDrugs(patient);
        }

    })}

    };

    return (  
        <Button variant="info" onClick={() => {handleAddDrugs();}}>Give Drugs to Eligible Patients</Button>
    );
}

export default AddDrugs;