import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import SidebarMenuDialog from "./SibarMenuDialog";
const SidebarMenu = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <MenuIcon onClick={handleClickOpen} />
      <SidebarMenuDialog
        open={open}
        handleClickOpen={handleClickOpen}
        handleClose={handleClose}
      />
    </div>
  );
};

export default SidebarMenu;
