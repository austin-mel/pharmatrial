import useJaneHopkins from "../hooks/useJaneHopkins";

function AddPatient() {
    const { entities } = useJaneHopkins();

    const addPatient = async () => {
        const addPaitentResponse = await entities.patient.add({
          name:"Billy",
          dob:"January 17, 2003",
          insuranceNumber: "1231254248",
        });
      console.log(addPaitentResponse)
    };

    return (
        <div className="button">
            <button onClick={() => {addPatient();}}> Add patient</button>
        </div>
      );
}

export default AddPatient;