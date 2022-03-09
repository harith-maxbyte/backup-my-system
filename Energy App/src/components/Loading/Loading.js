// @ts-nocheck
import React from 'react';
import { makeStyles } from '@mui/styles';
import CircularProgress from '@mui/material/CircularProgress';

const useStyles = makeStyles(theme => ({
	root: { background: "transparent", height: '100vh', display: "flex", justifyContent: 'center', alignItems:"center" },
	progress: { color: "#1d1b31" }
}));
const Loading = () => {
	const classes = useStyles();
	return <div className={classes.root}><CircularProgress size={40} className={classes.progress} /></div>;
};
export default Loading;
