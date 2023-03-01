import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { Link } from 'react-router-dom';


function MenuBar() {
    const { collapseSidebar } = useProSidebar();

    const Sidemenu = <Sidebar style={{height: "100vh"}}>
  <Menu>
    <MenuItem icon={<MenuOutlinedIcon />}
       onClick={() => {collapseSidebar();}}
       style={{ textAlign: "center" }}>
       <h2>Home</h2>
    </MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/Bavaria" />}>Bavaria</MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/FDA" />}>FDA</MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/" />}>Jane Hopkins</MenuItem>
  </Menu>
</Sidebar>;

return (
    <div className="menubar">
      {Sidemenu}
    </div>
  );
}

export default MenuBar;