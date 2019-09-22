import * as React from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  Divider,
  createStyles,
  Box
} from "@material-ui/core";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import { useState, useCallback } from "react";
import { makeStyles } from "@material-ui/styles";
import { useAuth } from "@state/auth/hooks";

const useStyles = makeStyles(() =>
  createStyles({
    menuItem: {
      fontSize: "0.875rem"
    },
    textMenuItem: {
      cursor: "default",
      "&:hover": {
        backgroundColor: "inherit",
        cursor: "default"
      }
    }
  })
);
const UserMenuButton: React.FC = () => {
  const classes = useStyles();

  // for menu open&close
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const handleMenuOpen = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // for logged-in user name & logout
  const { loginUser, logout } = useAuth();
  const username = loginUser ? loginUser.name : "unknown";

  return (
    <>
      <IconButton edge="end" onClick={handleMenuOpen} color="inherit">
        <AccountBoxIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <Box pb={1}>
          <MenuItem
            className={classes.menuItem + " " + classes.textMenuItem}
            dense={true}
          >
            <Box>
              Signed in as <br /> <b>{username}</b>
            </Box>
          </MenuItem>
        </Box>
        <Divider />
        <Box pt={1}>
          <MenuItem className={classes.menuItem} dense={true}>
            Your Profile
          </MenuItem>
          <MenuItem className={classes.menuItem} dense={true} onClick={logout}>
            Logout
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default UserMenuButton;
