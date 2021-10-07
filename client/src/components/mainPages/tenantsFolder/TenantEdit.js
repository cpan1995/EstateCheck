import Container from '@mui/material/Container';
import { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import PropertyCards from '../propertiesFolder/PropertyCards';

export default function TenantEdit({tenantInfo, editCallback, closeCallBack}){

    const [currentUserInfo, setInfo] = useState({
        id: tenantInfo.id,
        email: tenantInfo.email,
        first_name: tenantInfo.first_name,
        last_name: tenantInfo.last_name
    })

    console.log(currentUserInfo)

    const handleChange = (prop) => (event) => {
        setInfo({...currentUserInfo, [prop]: event.target.value})
    }

    const handleEdit = () => {
        editCallback(currentUserInfo)
        closeCallBack()
    }
    

    return(
        <Container>
            <Grid container spacing={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <Grid item>
                    <TextField 
                        id='first_name'
                        label='First Name'
                        variant="outlined"
                        onChange={handleChange('first_name')}
                        value={currentUserInfo.first_name}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        id='last_name'
                        label='Last Name'
                        variant="outlined"
                        onChange={handleChange('last_name')}
                        value={currentUserInfo.last_name}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
                <Grid item>
                    <TextField 
                        id='email'
                        label='Email'
                        variant="outlined"
                        onChange={handleChange('email')}
                        value={currentUserInfo.email}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
            </Grid>
            <Container
                sx={{
                    display: 'flex',
                    alignItems: 'right',
                    justifyContent: 'right',
                    marginTop: 2
                }}
            >
                <Button 
                    key='properties_submit'
                    variant="contained" 
                    color="success"
                    sx={{
                        width: 120,
                        backgroundColor: '#41A541',
                        fontWeight: 'bold',
                        fontSize: 'small'
                    }}
                    onClick={handleEdit}
                >
                    Edit
                </Button>
            </Container>
        </Container>
    )
}