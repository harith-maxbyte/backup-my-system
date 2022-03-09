
const Dashboardstyles1 = theme => ({
    // '@global': {
    //     '*::-webkit-scrollbar': {
    //         width: '0rem',
    //     },
    //     '*::-webkit-scrollbar-track': {
    //         background: 'rgb(227, 235, 235)'
    //     },
    //     '*::-webkit-scrollbar-thumb': {
    //         backgroundColor: '#223357',
    //         borderRadius: "8px",
    //         backgroundClip: "padding-box",
    //     }
    // },
    myClassName: {
        backgroundColor: "#1d1b31",
        position: "relative",
        "&:hover": {
            backgroundColor: "rgb(227, 235, 235)",
            color: "black",
            transition: "0.9s",
            transform: "rotate(90deg)",
        }
    },
    userimage: {
        backgroundColor: "transparent",
        borderRadius: '50%',
        padding: 2,
        border: "1px solid #cccccc",
        boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px',
    },
    rounded: {
        backgroundColor: 'rgb(19, 81, 82)',
        borderRadius: '50%',
        padding: '15px',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px',
    },
    device: {
        display: "flex",
        alignItems: "center",
    },
    machinetitle: {
        paddingLeft: '1rem',
        color: "#fff",
        fontFamily: "Nunito, sans-serif",
        fontSize: "15px",
        margin: 0
    },
    [theme.breakpoints.down('xl')]: {
        device: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
    },
    [theme.breakpoints.between('xs', 'md')]: {
        device: {
            display: "none"
        },
    },
    [theme.breakpoints.up('xl')]: {
        device: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        }
    },
    [theme.breakpoints.between('sm', 'lg')]: {
        // device:{
        //     display:"none"
        // },
        dashboardbtn: {
            display: "none"
        }
    },
    firstcarda: {
        height: 395,
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "rgb(33, 33, 33)",
        fontFamily: "Nunito, sans-serif"
    },
    dashboardbtn: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: ".5rem"
    },
    first: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    [theme.breakpoints.up('lg')]: {
        firstinnertxt: {
            margin: 0
        }
    },
    firstinnertxt: {
        textAlign: "center",
        display: "inline-block",
    },
    [theme.breakpoints.down('lg')]: {
        firstinnertxt: {
            textAlign: "center",
            display: "inline-block",
            padding: "0 2rem",
        },
    },
    second: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    [theme.breakpoints.down('sm')]: {
        second: {
            marginTop: "50% 50%",
        },
    },
    stickyColumn: {
        position: "sticky",
        top: 0,
    },
    container: {
        border: "1px solid #eeccee",
        maxHeight: "300px",
        overflowY: "scroll",
        width: "100%",
    },
    carda: {
        padding: '20px',
        width: "80%",
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        color: "black",
        fontWeight: "500",
        fontSize: "17px",
        marginBottom: "1rem",
        backgroundColor: "#F4CC44"//#FEC9B4 //#223357 
    },

    card__actions__total: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    card__actions: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '16px',
    },
    card__actions1: {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    topval: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "rgb(33, 33, 33)",
        fontFamily: "Nunito, sans-serif",
        lineHeight: 2
    },
    belowval: {
        fontSize: "x-large",
        fontWeight: "bold",
        fontFamily: "Nunito, sans-serif",
        color: "#4f77ea",
    },
    carda1: {
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
    },
    rdtitle: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "10px 24px",
        fontWeight: "bold",
        fontFamily: "Nunito, sans-serif",
    },
    unorderlist: {
        display: 'flex',
        justifyContent: 'space-evenly',

        fontWeight: "bold",
        fontFamily: "Nunito, sans-serif",
    },
    rd1title: {
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "10px",
        marginRight: "10px",
        paddingTop: "10px",
        paddingBottom: "10px",
        fontWeight: "bold",
        fontFamily: "Nunito, sans-serif",
    },
    charts: {
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
    },
    shiftHeader: {
        border: "1px solid grey",
        width: "80%",
        background: "#57B78C",
        fontWeight: "normal",
        color: "black",
        fontFamily: "Nunito, sans-serif",
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        padding: "2%"
    },
    tableHeader: {
        fontWeight: "bold",
        background: "#1d1b31",
        color: "#fff",
        fontFamily: "Nunito, sans-serif",
        padding: "8px",
        margin: 0
    }

});
export default Dashboardstyles1;