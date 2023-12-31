import { async } from "@firebase/util";
import { useEffect, useState } from "react";
import useBavaria from "../hooks/useBavaria";
import { Button, Form, Row, Col, Badge, Modal, Table } from "react-bootstrap";
import CloseFullscreenRoundedIcon from '@mui/icons-material/CloseFullscreenRounded';

function DownloadReport(props) {

    //RETRIVE DATA FROM VENDIA USING HOOK
    const { entities } = useBavaria();

    //CREATE ARRAY FOR STUDIES
    const [studies, setStudy] = useState();
    const [patients, setPatients] = useState();
    //CREATE ARRAY FOR DRUGS
    const [drugs, setDrugs] = useState();

    const studyID = props.props;

    //CREATE USE STATE (FOR ALERT POPUP)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //VENDIA FUNCTION TO GET STUDIES IN DATABASE
    //STORES STUDIES FROM DATABASE INTO THE ARRAY ABOVE
    const listStudies = async () => {
        let studyList = await entities.study.list()
        setStudy(studyList.items);
    };

    //VENDIA FUNCTION TO GET STUDIES IN DATABASE
    //STORES STUDIES FROM DATABASE INTO THE ARRAY ABOVE
    const listPatients = async () => {
        let patientList = await entities.patient.list()
        setPatients(patientList.items);
    };

    //VENDIA FUNCTION TO GET DRUGS IN DATABASE
    //STORES DRUGS FROM DATABASE INTO THE ARRAY ABOVE
    const listDrugs = async () => {
        let drugList = await entities.drug.list()
        setDrugs(drugList.items);
    };

    //FIRES WHEN PAGE LOADS/RELOADS
    //CALLS LISTPATIENTS FUNCTION
    useEffect(() => {
        listPatients();
        listStudies();
        listDrugs();
    }, []);

    //THIS IS WHAT IS RENDERED WHEN CALLING THE FILE ADDPATIENT
    //FORM THAT ASKS FOR EACH INPUT REQUIRED
    return (
        <div className="downloadreport">
            <Button variant="primary" onClick={() => { handleShow(); }}>View Results</Button>

            <Modal show={show} onHide={handleClose} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Header closeButton>
                    <Modal.Title>

                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Placebo?</th>
                                <th>Name</th>
                                <th>ID</th>
                                <th>Visit #1</th>
                                <th>Visit #2</th>
                                <th>Visit #3</th>
                                <th>Visit #4</th>
                                <th>Visit #5</th>
                            </tr>
                        </thead>
                        <tbody>
                            {patients?.map((patient, key) => {
                                if (patient.studyID === studyID) {
                                    //checkPlacebo(patient._id);
                                    var placebo2;

                                    {
                                        drugs?.map((drug, key) => {
                                            key = { key }
                                            if (drug.patientID === patient._id) {
                                                if (drug.placebo === true) {
                                                    placebo2 = true;
                                                }
                                                else {
                                                    placebo2 = false;
                                                }
                                            }
                                        })
                                    }

                                    if (placebo2 === true) {
                                        return (
                                            <tr key={key}>
                                                <td><b style={{ color: "green" }}>True</b></td>
                                                <td>{patient.name} {patient.lastName}</td>
                                                <td>{patient.uuid}</td>
                                                {patient.visits ? patient.visits.map((item, index) => (
                                                    <td>
                                                        <p key={index}>Date: {item.dateTime}<br /> Notes: {item.notes}<br /> hivViralLoad: {item.hivViralLoad}</p>
                                                    </td>
                                                )) : null}
                                            </tr>
                                        )
                                    }
                                    else if (placebo2 === false) {
                                        return (
                                            <tr key={key}>
                                                <td><b style={{ color: "red" }}>False</b></td>
                                                <td>{patient.name} {patient.lastName}</td>
                                                <td>{patient.uuid}</td>
                                                {patient.visits ? patient.visits.map((item, index) => (
                                                    <td>
                                                        <p key={index}>Date: {item.dateTime}<br /> Notes: {item.notes}<br /> hivViralLoad: {item.hivViralLoad}</p>
                                                    </td>
                                                )) : null}
                                            </tr>
                                        )
                                    }
                                }
                            })}
                        </tbody>
                    </Table>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => { }}>Download Report</Button>
                    <Button variant="danger" onClick={handleClose}><CloseFullscreenRoundedIcon />Close</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default DownloadReport;