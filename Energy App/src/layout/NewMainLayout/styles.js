const styles = theme => ({

    drawerPaper: {
        borderRight: 0,
        zIndex: 1200,
        // width: '7rem',
    },

    content: {
        minHeight: '90vh',
        padding: theme.spacing(3),
        // paddingTop: theme.spacing(6),
        background: "linear-gradient(to bottom, #1d1b31 0%, #1d1b31 35%, rgb(227, 235, 235) 35%, rgb(227, 235, 235) 100%)",//  rgb(227, 235, 235)		
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen
        })
    },
    contentShift: {
        marginLeft: '78px',
        // minHeight: "80vh"
    },
});
export default styles;