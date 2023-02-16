import useJaneHopkins from "./hooks/useJaneHopkins";
//import useBavaria from "./hooks/useBavaria";
//import useFDA from "./hooks/useFDA";
import BavariaHome from './components/bavaria/BavariaHome';
import Profile from './components/Profile';

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
      <Profile/>
      <div className="content">

        <button onClick={() => {addPatient();}}> Add patient</button>
      </div>
    </div>
  );
}

export default App