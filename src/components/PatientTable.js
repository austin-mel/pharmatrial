import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Table, Button, Row, Col, Card } from "react-bootstrap";

function PatientTable() {
    const { entities } = useJaneHopkins();
    const [patients, setPatients] = useState();

    const listPatients = async () => {
      let patientList = await entities.patient.list()
      console.log(patientList.items);
      setPatients(patientList.items);
    };

    useEffect(() => {
      listPatients();
    }, []);


    return (
        <div className="table">
            <Table striped bordered hover size="sm">
              
                <thead>
                <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>DOB</th>
                <th>Weight</th>
                <th>Insureance Number</th>
                <th>Height (cm)</th>
                </tr>
                </thead>
                <tbody>
        {patients?.map((patient, key) => {
        return(
          <tr key={key}>
          <td><Button variant="primary">View Patient</Button></td>
          <td>{patient.name}</td>
          <td>{patient.dob}</td>
          <td>{patient.weight}</td>
          <td>{patient.insuranceNumber}</td>
          <td>{patient.height}</td>
        </tr>
        )
      })}

      </tbody>
    </Table>
        </div>
      );
}

export default PatientTable;