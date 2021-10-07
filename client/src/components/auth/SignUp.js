import React, { useState } from 'react'
import Box from '@mui/material/Box';
import { FormControl, TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Link from '@mui/material/Link';
import logo from "/home/cpan1995/personal-projects/estateChecker/estate_checker/client/src/img/estateCheck.png"
import FadeIn from 'react-fade-in';

export default function SignUp({ setUserCallBack }) {
    const [userNameError, setUserNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [confirmPassword, setConfirmpassword] = useState(false)
    const [values, setValues] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        firstName: '',
        lastName: '',
        showPassword: false,
        userNameHelper: '',
        emailHelper: '',
    })

    const handleChange = (prop) => (event) => {
        if (prop == 'email') {
            console.log(prop)
            setValues({ ...values, emailHelper: '' })
            setEmailError(false)

        }
        if (prop == 'username') {
            console.log(prop)
            setValues({ ...values, userNameHelperr: '' })
            setUserNameError(false)

        }
        setValues({ ...values, [prop]: event.target.value })
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        })
    }

    const inputStyle = {
        width: 400,
        marginTop: 2
    }

    const handleSignUpClick = () => {

        fetch("/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password,
                first_name: values.firstName,
                last_name: values.lastName,
                email: values.email
            }),
        })
            .then((r) => {

                if (r.ok) {
                    r.json().then((user) => { setUserCallBack(user) })
                }
                else {
                    r.json().then((errors) => {
                        console.log(errors)
                        errors.error.forEach(message => {
                            console.log(message)
                            if (message == "Email is invalid") {
                                setEmailError(true)
                                let tempValues = JSON.parse(JSON.stringify(values));
                                tempValues.emailHelper = "Email is invalid"
                                setValues(tempValues)
                            }
                            else if (message == "Username has already been taken") {
                                setUserNameError(true)
                                let tempValues = JSON.parse(JSON.stringify(values));
                                tempValues.userNameHelper = "Username has already been taken"
                                setValues(tempValues)
                            }
                        })
                    })
                }
            })
    }

    const ColorButton = styled(Button)(({ theme }) => ({
        marginTop: 20,
        padding: 10,
        color: theme.palette.getContrastText(green[500]),
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[600],
        },
    }));

    const backgroundStyle = {
        background: 'rgb(235,250,215)',
        background: '-moz-linear-gradient(0deg, rgba(235,250,215,0.47102591036414565) 1%, rgba(214,249,221,1) 18%)',
        background: '-webkit-linear-gradient(0deg, rgba(235,250,215,0.47102591036414565) 1%, rgba(214,249,221,1) 18%)',
        background: 'linear-gradient(0deg, rgba(235,250,215,0.47102591036414565) 1%, rgba(214,249,221,1) 18%)',
        filter: 'progid:DXImageTransform.Microsoft.gradient(startColorstr="#ebfad7",endColorstr="#d6f9dd",GradientType=1)',
        height: '100vh',
        width: '100vw'
    }

    return (
        <div
            style={backgroundStyle}
        >
            <img src={logo} alt="Logo" style={{
                position: 'absolute',
                zIndex: 50,
                left: '0.1%',
                height: '150px',
                top: '0.1%'
            }} />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'center',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        height: '80vh'
                    }}
                >
                    <FadeIn>
                        <Box>
                            <FormControl>
                                <TextField
                                    id="signUpUsername"
                                    label="UserName"
                                    variant="standard"
                                    onChange={handleChange('username')}
                                    value={values.username}
                                    sx={inputStyle}
                                    error={userNameError}
                                    helperText={values.userNameHelper}
                                />
                                <TextField
                                    id='signupPassword'
                                    label="Password"
                                    variant="standard"
                                    onChange={handleChange('password')}
                                    value={values.password}
                                    type={values.showPassword ? 'text' : 'password'}
                                    sx={inputStyle}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    id='signupConfirmPassword'
                                    label="Confirm Password"
                                    variant="standard"
                                    onChange={handleChange('confirmPassword')}
                                    value={values.confirmPassword}
                                    type={values.showPassword ? 'text' : 'password'}
                                    sx={inputStyle}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    id='signupFirstName'
                                    label="First Name"
                                    variant="standard"
                                    onChange={handleChange('firstName')}
                                    value={values.firstName}
                                    sx={inputStyle}
                                />
                                <TextField
                                    id='signupLastName'
                                    label="Last Name"
                                    variant="standard"
                                    onChange={handleChange('lastName')}
                                    value={values.lastName}
                                    sx={inputStyle}
                                />
                                <TextField
                                    error={emailError}
                                    helperText={values.emailHelper}
                                    id='signupEmail'
                                    label="Email"
                                    variant="standard"
                                    onChange={handleChange('email')}
                                    value={values.email}
                                    sx={inputStyle}
                                />
                                <ColorButton
                                    variant="contained"
                                    onClick={handleSignUpClick}
                                >Sign Up</ColorButton>
                            </FormControl>
                        </Box>
                        <Box>
                            <Link href="/login">Already Have an Account? Login</Link>
                        </Box>
                    </FadeIn>
                </Box>
            </div>
        </div>
    )
}