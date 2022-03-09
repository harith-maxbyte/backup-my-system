import { MenuItem, Select } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles(theme => ({
    "@global": {
        body: {
            // position:"fixed",
            // overflow: "visible !important",
            // width: "calc(100vw - 1px)",
            // width:"100vw"
        },
    },

    quantityRoot: {
        opacity: 0.9,
        borderRadius: "5px",
        paddingLeft: '.5rem',
        fontFamily: "Poppins, sans-serif",
        fontWeight: 500,
        fontSize: "15px",
        color: "#fff",

        "&:hover": {
            opacity: 1,
        },
        "& .MuiOutlinedInput-notchedOutline": {
            border: "none !important", outline: "none !important",
        },
        "&:hover .MuiOutlinedInput-notchedOutline": {
            border: "none !important", outline: "none !important",
        },
        "& .Mui-focused .MuiOutlinedInput-notchedOutline": {

            borderRadius: "5px 5px 0 0", border: "none !important", outline: "none !important",
        },
        "& .Mui-disabled": {
            color: "#FFFFFF",
            opacity: 0.6, border: "none !important", outline: "none !important",
        },
        "& .Mui-disabled .MuiOutlinedInput-notchedOutline": {
            border: "none !important", outline: "none !important",
        }
    },
    selectRoot: {
        color: "#FFFFFF"
    },
    icon: {
        color: "#FFFFFF"
    },
    selectPaper: {
        width: "100vw",
        backgroundColor: "#1E1E24",
        border: "1px solid #484850",
        borderRadius: "5px",
        color: "#FFFFFF",
        "& li:hover": {
            backgroundColor: "#303039"
        }
    }
}));

// const useStyles = makeStyles({
//     // "@global": {
//     //     body: {
//     //         overflow: "visible !important",
//     //         // width: "calc(100vw - 1px)",
//     //         // width:"100vw"
//     //         // padding: 0
//     //     },
//     // },
//     select: {
//         "&:before": {
//             // normal
//             borderBottom: "1px solid orange"
//         },
//         "&:after": {
//             // focused
//             borderBottom: `3px solid green`
//         },
//         "&:hover:not(.Mui-disabled):not(.Mui-focused):not(.Mui-error):before": {
//             // hover
//             borderBottom: `2px solid purple`
//         }
//     }
// });

function App() {
    const classes = useStyles();
    const [age, setAge] = React.useState("");

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <React.Fragment>
            <Select
                value={age}
                onChange={handleChange}
                displayEmpty
                className={classes.quantityRoot}
                inputProps={{
                    classes: {
                        icon: classes.icon,
                        root: classes.quantityRoot,
                    },
                }}
            >
                <MenuItem value="">Laser Bar Code Printer</MenuItem>
            </Select>
        </React.Fragment>
        // <FormControl sx={{ m: 1, minWidth: 80 }}>
        //     <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
        //     <Select
        //         labelId="demo-simple-select-autowidth-label"
        //         id="demo-simple-select-autowidth"
        //         value={age}
        //         onChange={handleChange}
        //         autoWidth
        //         label="Age"
        //     >
        //         <MenuItem value="">
        //             <em>None</em>
        //         </MenuItem>
        //         <MenuItem value={10}>Twenty</MenuItem>
        //         <MenuItem value={21}>Twenty one</MenuItem>
        //         <MenuItem value={22}>Twenty one and a half</MenuItem>
        //     </Select>
        // </FormControl>

        // <Paper>
        //     <FormControl style={{ minWidth: "200px" }}>
        //         <InputLabel htmlFor="age-simple">Age</InputLabel>
        //         <Select
        //             className={classes.select}
        //             value={age}
        //             onChange={event => setAge(event.target.value)}
        //             inputProps={{
        //                 name: "age",
        //                 id: "age-simple"
        //             }}
        //         >
        //             <MenuItem value="">Laser Bar Code Printer</MenuItem>
        //         </Select>
        //     </FormControl>
        // </Paper>
    );
}

export default React.memo(App);