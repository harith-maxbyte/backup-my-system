const Dashboardstyles2 = theme => ({
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
    backimage: {
        backgroundColor: "transparent",
        borderRadius: '50%',
        padding: 2,
        border: "1px solid #cccccc",
        boxShadow: 'rgb(0 0 0 / 20%) 0px 3px 5px -1px, rgb(0 0 0 / 14%) 0px 6px 10px 0px, rgb(0 0 0 / 12%) 0px 1px 18px 0px',
    },
    myClassName: {
        backgroundColor: "#1d1b31",
        position: "relative",
        "&:hover": {
            backgroundColor: "rgb(227, 235, 235)",
            color: "black"
        }
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
        marginBottom: "2rem",
        marginTop:"-4rem",
    },
    carda: {
        padding: '2.5rem',
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',

        background: "#FEC9B4",//#FEC9B4  #223357
    },

    cardb: {
        padding: '2.5rem',
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        background: "#57B78C",
    },
    Loadvalue: {
        padding: 6,
        lineHeight: 1,
        margin: 0,
        fontSize: "14px",
        color: "black"
    },
    Loadtitle: {
        padding: 6,
        lineHeight: 1,
        margin: 0,
        fontSize: "14px"
    },
    phase: {
        padding: 7,
        margin: 0,
        lineHeight: 1.5,
        fontSize: "14px",
        color: "black"
    },
    [theme.breakpoints.between(900, 1321)]: {
        carda: {
            // background: "violet",
            display: "grid",
            margin: 0,
            padding: "1.7rem",
            height: "9.5rem",
            textAlign: "center",
        },
        cardb: {
            // background: "violet",
            display: "grid",
            margin: 0,
            padding: "1.2rem",
            height: "9.5rem",
            textAlign: "center",
        },
    },
    [theme.breakpoints.between(1321, 1378)]: {
        carda: {
            // background: "violet",
            display: "grid",
            margin: 0,
            padding: "1.7rem",
            height: "9.5rem",
            textAlign: "center",
        },
        cardb: {
            // background: "violet",
            display: "grid",
            margin: 0,
            padding: "1.2rem",
            height: "9.5rem",
            textAlign: "center",
        },
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
        fontSize: "20px",
        fontWeight: "bold",
        color: "rgb(33, 33, 33)",
        lineHeight: 2
    },
    belowval: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#4f77ea",
    },
    carda1: {
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        background: "#5EC8E6",//#223357
        fontWeight: "500",
    },
    carda2: {
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
        display: 'flex',
        flexDirection: 'column',
        background: "#5EC8E6",//#223357
        fontWeight: "500",
        height: "9.3rem"
    },
    rdtitle: {
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        padding: "10px 24px",
        fontWeight: "bold",
    },
    unorderlist: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: "600",
        margin: "0 13%"
    },
    unorderlist1: {
        display: 'flex',
        justifyContent: 'space-between',
        fontWeight: "600",
        margin: "0 10%"
    },
    rd1title: {
        display: "flex",
        justifyContent: "space-evenly",
        padding: "10px 0",
        // fontWeight: "bold",
        fontWeight: "600",
    },
    charts: {
        boxShadow: '5px 5px 5px grey',
        borderRadius: '15px',
    },


});
export default Dashboardstyles2;