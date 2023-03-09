import { async } from "@firebase/util";
import { useEffect } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";

function AddPatient() {
    const { entities } = useJaneHopkins();

    //add patient
    const handleAdd = async () => {
      const addResponse = await entities.patient.add(
        {
          name:"Billy",
          dob:"January 17, 2003",
          insuranceNumber: "1231254248",
        },
        {
          aclInput:{
            acl:[
              {
                pricipal: {
                  nodes: ["Bavaria","FDA"]
                },
                operations: ["READ"],
                path: "name",
              },
            ],
          },
        } 
      );
      console.log(addResponse)
    };

    //list patients
    const listPatients = async () => {
        let patientList = await entities.patient.list()
        console.log(patientList.items);
    };

    useEffect(() =>{
      listPatients();
    }, []);

    return (
        <div className="button">
            <button onClick={() => {handleAdd();}}> Add patient</button>
        </div>
      );
}

export default AddPatient;