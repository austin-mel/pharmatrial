import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
//import {v4 as uuidv4} from 'uuid';
import useFDA from "../hooks/useFDA";

function AssignDrugs(props) {
    const { entities } = useFDA();
    const [patients, setPatients] = useState();
    const [drugs, setDrugs] = useState();

    useEffect(() => {
      listPatients();
      listDrugs();
    }, []);

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      setPatients(patientList.items);
    };

    const listDrugs = async () => {
        let drugList = await entities.drug.list()
        setDrugs(drugList.items);
      };

    const handleAddDrugs = async () => {

      async function addDrugs(patient){

        const drugID = await entities.drug.get(props.props);

        const addDrugs = await entities.drug.update(
          {
              _id: drugID._id,
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

        const addResponse = await entities.patient.update(
          {
              _id: patient._id,
              drugID: drugID._id,
              studyID: drugID.studyID,
          },
          {
            aclInput:{
              acl:[
                {
                  principal: {
                    nodes: ["Bavaria","FDA"]
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
              ],
            },
          } 
        );
        
        console.log(addResponse);
      }

      {patients?.map((patient, key) => { 
        key = {key}
        var dobYear = patient.dob.substr(patient.dob.length - 4);

        //ADD ICD-10 HEALTH CODE ELIGIBILITY
        if(patient.drugID === null){
          if(parseInt(dobYear) >= 2005){
            console.log("Not Eligible!")
          }
          else{
            addDrugs(patient);
          }
        }

    })}

    };

    return (  
        <Button variant="info" onClick={() => {handleAddDrugs();}}>Give Drugs to Eligible Patients</Button>
    );
}

export default AssignDrugs;