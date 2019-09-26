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
import { useRouter } from "@state/router/hooks";

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
  const handleOpenMenu = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setAnchorEl(null);
  }, []);

  // for logged-in user name & logout
  const { loginUser, logout } = useAuth();
  const router = useRouter();
  const username = loginUser ? loginUser.name : "unknown";
  const handleLogout = async () => {
    const result = await logout();
    if (result) {
      router.push("/login");
    }
  };

  return (
    <>
      <IconButton edge="end" onClick={handleOpenMenu} color="inherit">
        <AccountBoxIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        keepMounted
        open={isMenuOpen}
        onClose={handleCloseMenu}
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
          <MenuItem
            className={classes.menuItem}
            dense={true}
            onClick={handleLogout}
          >
            Logout
          </MenuItem>
        </Box>
      </Menu>
    </>
  );
};

export default UserMenuButton;
