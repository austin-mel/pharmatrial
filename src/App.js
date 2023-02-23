import useJaneHopkins from "./hooks/useJaneHopkins";
import useBavaria from "./hooks/useBavaria";
import useFDA from "./hooks/useFDA";
import BavariaHome from './components/bavaria/BavariaHome';
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from 'react-router-dom';

function App() {

const { collapseSidebar } = useProSidebar();

const { entities } = useJaneHopkins();

const addPatient = async () => {
    const addPaitentResponse = await entities.patient.add({
      name:"Billy",
      dob:"January 17, 2003",
      insuranceNumber: "1231254248",
    });
  console.log(addPaitentResponse)
};

const Sidemenu = <Sidebar style={{height: "100vh"}}>
  <Menu>
    <MenuItem icon={<MenuOutlinedIcon />}
       onClick={() => {collapseSidebar();}}
       style={{ textAlign: "center" }}>
       <h2>Home</h2>
    </MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/Bavaria" />}>Bavaria</MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/FDA" />}>FDA</MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/JH" />}>Jane Hopkins</MenuItem>
  </Menu>
</Sidebar>;

return (
    <div className="app">
      {Sidemenu}
      <div className="content">
        <button onClick={() => {addPatient();}}> Add patient</button>
      </div>
    </div>
  );
}

export default App;