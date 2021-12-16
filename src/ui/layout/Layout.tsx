import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useAppContext } from "../../core";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Badge from "@mui/material/Badge";
import { Menu, MenuItem } from "@mui/material";

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = React.memo(({}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { notify, clearNotify } = useAppContext();

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuClose = () => {
    clearNotify();
    setAnchorEl(null);
  };
  const menuId = "primary-search-account-menu";

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
      PaperProps={{
        style: {
          maxHeight: 300,
          width: "60ch",
        },
      }}
    >
      {notify.map((option, i) => (
        <MenuItem key={option.id} onClick={handleMenuClose}>
          {option.title}
        </MenuItem>
      ))}
    </Menu>
  );

  return (
    <div className="bg-gray-100 h-screen">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task manager
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="history"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Badge badgeContent={notify.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
      {renderMenu}
    </div>
  );
});

export { Layout };
