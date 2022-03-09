const styles = theme => ({
	// root: {

	// 	boxShadow: `0 0 35px 0  ${theme.palette.borderShadow}`,
	// 	borderBottom: "1px solid #E1E0E0",
	// 	display: 'flex',
	// 	alignItems: 'center',
	// 	// padding: "10px 0px",
	// 	paddingLeft: "170px",
	// 	[theme.breakpoints.down('md')]: {
	// 		paddingLeft: 0,
	// 	},
	// 	height: theme.topBar.height,
	// 	zIndex: theme.zIndex.appBar,
	// 	backgroundColor: "#FFFFFF"
	// },
	brandWrapper: {
		background: "#11101D",//theme.palette.primary.main,
		width: 30,
		padding: "2px",
		marginRight: "1rem",
		marginLeft: "3px",
		transition: "all 0.2s ease-in-out 0s",
		borderRadius: "8px",
	},
	Navbar: {
		backgroundcolor: "lightsteelblue",
		position: "absolute",
		top: 0,
		left: 0,
		right: 100,
		boxSizing: "border-box",
		fontSize: "18px",
		fontWeight: "bold",
		width: "100%",
		zIndex: "1000",
		boxShadow: "0px 0px 5px silver",
	},
	Toolbar: {
		display: "flex",
		minHeight: "56px",
		alignItems: "center",
		padding: "0px 10px",
	},
	energy: {
		display: "flex",
		justifyContent: "center",
		marginTop: "-35px",
		fontSize: "20px",
		[theme.breakpoints.down('md')]: {
			display: "none",
		},
		// marginLeft: "24rem"
	},
	logotag: {
		marginLeft: "-3rem",
		[theme.breakpoints.down('md')]: {
			margin:0
		},
	},
	userimage: {
		width: 30,
		height: 30,
		borderRadius: "50%",
		padding: 2,
		border: "1px solid #cccccc"
	},
	nameText: {
		paddingRight: 10,
		fontSize: 16,
		color: "#000",
		fontFamily: "Nunito, sans-serif"
	},
	Logo: {
		// marginRight: "1px",
		marginBottom: 0,
		marginTop: 0,
	},
	Title: {
		flexGrow: 1,
		marginLeft: "5rem",
		[theme.breakpoints.down('md')]: {
			marginLeft: "1px"
		}
	},
	[theme.breakpoints.between('sm', 'lg')]: {
		energy: {
			display: "none"
		},
		logotag:{
			margin:0
		},
		Title: {
			marginLeft: 1
		}
	},

});
export default styles;