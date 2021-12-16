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

interface ILayoutProps {}

const Layout: React.FC<ILayoutProps> = React.memo(({}) => {
  const { notify } = useAppContext();
  useEffect(() => {}, []);

  return (
    <div className="bg-gray-100 h-screen">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Task manager
          </Typography>
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" color="inherit">
              <Badge badgeContent={notify.length} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Outlet />
    </div>
  );
});

export { Layout };
