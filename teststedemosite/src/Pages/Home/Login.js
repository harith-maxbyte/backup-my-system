import * as React from 'react';
import { Button, CssBaseline, TextField, FormControlLabel, Checkbox, Link, Box, Grid, Avatar, Typography } from '@mui/material';
import { AiOutlineUnlock } from "react-icons/ai";
import axios from "axios";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ENDPOINT } from "../../Helpers/Constatnt";
import Logo from '../../assets/images/png/byte-Operations-logo.png';
import poster from '../../assets/poster.jpeg';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useForm } from 'react-hook-form';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props} style={{ fontSize: "15px", fontFamily:"Poppins, sans-serif", fontWeight: 500, color: "#1d1b31" }}>
            {'Copyright © '}
            <Link color="inherit" href="https://maxbyte.co/" target={"_blank"}>
                Maxbyte Technologies
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

function SignInSide(props) {
    const { register, handleSubmit, formState: { errors }, } = useForm()
    const [msg, setMsg] = React.useState("")

    const submit = (event) => {
        const user = {
            Email: event.email,
            password: event.password,
        };

        axios({
            method: 'post',
            url: `${ENDPOINT}/auth`,
            data: user,
        })
            .then(res => {
                localStorage.removeItem("auth-token")
                localStorage.setItem("auth-token", JSON.stringify(res.data.payload.jwt))
                localStorage.setItem("email", event.email)
                props.history.push("/energy-meter-dashboard", event.email)
                toast.success('Logged In!!', {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
            .catch(err => {
                // console.log(`Invalid Credentials->${err}`);
                setMsg('Invalid Credentials')
            });
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: `url(${poster})`,
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item
                    xs={12}
                    sm={8}
                    md={5}
                    // component={Paper} 
                    elevation={6}
                // square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                        style={{ width: "22rem", margin: "10rem 8rem" }}
                    >
                        <img src={Logo} alt="Byte-Operations" />
                        <Avatar sx={{ m: 1, bgcolor: '#1d1b31' }}>
                            <AiOutlineUnlock />
                        </Avatar>
                        <Typography component="h1" variant="h5" style={{fontFamily:"Poppins, sans-serif",fontWeight:"500"}}>
                            Sign in
                        </Typography>
                        {msg ? <h4 style={{ color: "red" }}>{msg}</h4> : ""}
                        <Box component="form" noValidate onSubmit={handleSubmit(submit)} sx={{ mt: 1 }}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,  // /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                                        message: "Invalid email address"
                                    }
                                })}
                                error={!!errors?.email}
                                helperText={errors?.email ? errors.email.message : null}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 3,
                                        message: "Password must have at least 3 characters"
                                    }
                                })}
                                error={!!errors?.password}
                                helperText={errors?.password ? errors.password.message : null}
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                style={{ background: "#1d1b31" }}
                            >
                                Sign In
                            </Button>

                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default React.memo(SignInSide);