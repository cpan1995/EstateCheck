import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useHistory } from 'react-router-dom'
import Searchback from '../headers/Searchback';

export default function AddTenants(){
  const [currentUnits, setUnits] = useState([])
  const [selected, setSelected] = useState('')
  const [toggleTenantForm, setToggle] = useState(false)
  const [tenantValues, setTenantForm] = useState({
    first_name: '',
    last_name: '',
    email: ''
  })
  
  let history = useHistory()

  useEffect(()=>{
    fetch('/units')
    .then(r=>r.json())
    .then(data =>  setUnits(data))
  },[])

  const handleTenantAdd = (prop) => (event) => {
    setTenantForm({...tenantValues, [prop]: event.target.value})
  }

  const handleCreate = ()=>{
    fetch('/tenants',{
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({
          first_name: tenantValues.first_name,
          last_name: tenantValues.last_name,
          email: tenantValues.email,
          unit_id: selected
      })
    })
    .then(r => r.json())
    .then(data => {
      console.log(data)
      history.push('/tenants')
    })
  }

    

    let tenantForm = 
      <Container>
        <h3 style={{textAlign: 'left'}}>Add Tenant</h3>
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'row'
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <TextField 
                id="first_name" 
                label="First Name" 
                variant="outlined"
                onChange={handleTenantAdd('first_name')}
                value={tenantValues.first_name}
                sx={{
                  width: 300
                }}
                />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <TextField 
                id="last_name" 
                label="Last Name" 
                variant="outlined"
                onChange={handleTenantAdd('last_name')}
                value={tenantValues.last_name}
                sx={{
                  width: 300
                }}
                />
            </Grid>
          </Grid>
          <Grid container spacing={4}>
            <Grid item xs={4}>
              <TextField 
                id="email" 
                label="email" 
                variant="outlined"
                onChange={handleTenantAdd('email')}
                value={tenantValues.email}
                sx={{
                  width: 300
                }}
                />
            </Grid>
          </Grid>
        </Container>
      </Container>

    console.log(tenantValues)

    let menuContainers = []

    if(currentUnits.length != 0){
      let filteredUnits = currentUnits.filter(unit => unit.tenant == null)
      menuContainers = filteredUnits.map(element => {
        return <MenuItem key={`units${element.id}`} name= {element.id} value={element.id}>{element.property.address}: Apt {`${element.property.id}0${element.id}`}</MenuItem>
      })
    }

    const handleChange = (event) => {
      setSelected(event.target.value)
      setToggle(true)
    }

    return(
        <Container>
          <Searchback backLink = "/home" title="Add Tenant" searchOption={false}/>
          <Container
            sx={{
              marginTop: 10
            }}
          >
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Select Property</InputLabel>
                    <Select
                      labelId = 'propertList'
                      id = 'propertListId'
                      value = {selected}
                      onChange={handleChange}
                      label = "Select Property"
                      sx={{
                        width: 400,
                      }}
                    >
                        {menuContainers}
                    </Select>
                </FormControl>
            </Container>
            <Container>
              {toggleTenantForm ? tenantForm:<></>}
            </Container>
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
                    onClick={handleCreate}
                >
                    Create
                </Button>
            </Container>
        </Container>
    )
}