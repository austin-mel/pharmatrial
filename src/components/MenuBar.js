import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from 'react-pro-sidebar';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import { Link } from 'react-router-dom';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';


function MenuBar() {
    const { collapseSidebar } = useProSidebar();

    const Sidemenu = <Sidebar>
  <Menu>
    <MenuItem icon={<MenuRoundedIcon/>}
       onClick={() => {collapseSidebar();}}
       style={{ textAlign: "center" }}>
       <h3>Profiles</h3>
    </MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/" />}>Jane Hopkins</MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/Bavaria" />}>Bavaria</MenuItem>
      <MenuItem icon={<PeopleOutlinedIcon />} component={<Link to ="/FDA" />}>FDA</MenuItem>
  </Menu>
</Sidebar>;

return (
    <div className="menubar">
      {Sidemenu}
    </div>
  );
}

export default MenuBar;