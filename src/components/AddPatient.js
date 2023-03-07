import { async } from "@firebase/util";
import { useEffect } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";

function AddPatient() {
    const { entities } = useJaneHopkins();

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

    return (
        <div className="button">
            <button onClick={() => {handleAdd();}}> Add patient</button>
        </div>
      );
}

export default AddPatient;