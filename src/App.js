import "./App.css";
import useJaneHopkins from "./hooks/useJaneHopkins";
//import useBavaria from "./hooks/useBavaria";
//import useFDA from "./hooks/useFDA";


function App() {
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
      <div className="App">
        <button onClick={() => {addPatient();}}> Add patient</button>
      </div>
    );
}

export default App