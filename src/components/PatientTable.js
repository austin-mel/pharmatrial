import { async } from "@firebase/util";
import { useEffect } from "react";
import useJaneHopkins from "../hooks/useJaneHopkins";
import { Table, Button } from "react-bootstrap";

function PatientTable() {
    const { entities } = useJaneHopkins();

    return (
        <div className="table">
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Weight</th>
                <th>DOB</th>
                </tr>
                </thead>
                <tbody>
                <tr>
        <td><Button variant="primary">View Patient</Button></td>
          <td>Mark</td>
          <td>Otto</td>
          <td>250</td>
          <td>Test</td>
        </tr>
        <tr>
        <td><Button variant="primary">View Patient</Button></td>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>190</td>
          <td>Test</td>
        </tr>
      </tbody>
    </Table>
        </div>
      );
}

export default PatientTable;