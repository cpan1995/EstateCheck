import React, { useState } from 'react'
import { FormControl, TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { green } from '@mui/material/colors';
import Link from '@mui/material/Link';
import { useHistory } from "react-router-dom"
import logo from "/home/cpan1995/personal-projects/estateChecker/estate_checker/client/src/img/estateCheck.png"
import FadeIn from 'react-fade-in';

export default function Login({ loginCallback }) {
    const [error, setError] = useState(false)
    const [values, setValues] = useState({
        username: '',
        password: '',
        showPassword: false
    })
    const [defaultErrorText, setErrorText] = useState('')

    let history = useHistory();

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value })
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        })
    }

    const handleLoginClick = () => {
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: values.username,
                password: values.password
            }),
        })
            .then((r) => {
                if (r.ok) {
                    r.json().then((user) => {
                        loginCallback(user)
                    })
                }
                else {
                    r.json().then((error) => {
                        setError(true)
                        setErrorText(error.errors)
                    })
                }
            })
    }

    const inputStyle = {
        width: 400,
        marginTop: 2
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
                    height: '80vh',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}
                >
                    <FadeIn>
                        <Box>

                            <FormControl>
                                <TextField
                                    id="user-name"
                                    label="UserName"
                                    variant="standard"
                                    onChange={handleChange('username')}
                                    value={values.username}
                                    sx={inputStyle}
                                />
                                <TextField
                                    error={error}
                                    helperText={defaultErrorText}
                                    id="password"
                                    label="Password "
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
                                <ColorButton
                                    variant="contained"
                                    onClick={handleLoginClick}
                                >Login</ColorButton>
                            </FormControl>
                        </Box>
                        <Box>
                            <Link href="/signup">Don't Have An Account SignUp</Link>
                        </Box>
                    </FadeIn>
                </Box>
            </div>
        </div>
    )
}