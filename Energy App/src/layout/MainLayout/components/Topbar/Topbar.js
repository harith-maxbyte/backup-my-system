import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Logo from "../../../../assets/images/png/byte-Operations-logo.png";

import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";

//import PropTypes from 'prop-types';
import withStyles from '@mui/styles/withStyles';

import styles from './styles';
import { withRouter } from 'react-router-dom';
import { useHistory } from 'react-router';

import { styled } from '@mui/material';

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: theme.shadows[1],
    fontSize: 12
  }
}));




const Topbar = ({ classes, onToggleSidebar, isSidebarOpen }) => {

  // const { classes, onToggleSidebar, isSidebarOpen } = props

  const history = useHistory();
  let email = localStorage.getItem("email")
  const handleSignOut = () => {
    localStorage.removeItem("auth-token")
    history.push("/")
  }
  return (
    <React.Fragment>
      <header className={classes.Navbar}>
        <div className={classes.Toolbar}>

          <IconButton
            aria-label="Menu"
            className={classes.brandWrapper}
            onClick={onToggleSidebar}
            size="large"
          >
            {isSidebarOpen === false ? <i className='bx bx-menu' style={{ color: "#fff" }}></i> : ""}

          </IconButton>

          <div className={classes.Title}>


            <div className={classes.logotag}><img src={Logo} alt="logo" height={32} /></div>
            <center className={classes.energy}>Energy Meter Dashboard</center>

          </div>

          <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
            <Typography className={classes.nameText}>{email}</Typography>
          </div>

          <LightTooltip title="Logout">
            <button style={{ border: "0px solid transparent", background: "none", cursor: "pointer" }} onClick={handleSignOut}>
              <div style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                <img alt="user" src="https://byte-operations.web.app/static/media/user-round.13b5a31b.svg" className={classes.userimage} />
              </div>
            </button>
          </LightTooltip>
        </div>
      </header>
      <div className={classes.Toolbar} />
    </React.Fragment>
  );
};
export default React.memo(withRouter(withStyles(styles)(Topbar)));
