import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Searchback from '../headers/Searchback';

export default function AddUnits() {

    const [propertyList, setPropertyList] = useState([])
    const [selected, setSelected] = useState('')
    const [toggleUnitForm, setToggle] = useState(false)
    const [singleUnit, setSingle] = useState({
        bed: '',
        bath: '',
        size: '',
        rent: ''
    })
    const handleSingleUnitChange = (prop) => (event) => {
        setSingle({ ...singleUnit, [prop]: event.target.value })
    }

    let history = useHistory()

    const handleCreate = () => {
        fetch('/units', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                bed_num: singleUnit.bed,
                bath_num: singleUnit.bath,
                rent_amount: singleUnit.rent,
                size: singleUnit.size,
                property_id: selected
            })
        })
            .then(r => r.json())
            .then(data => {
                history.push('/properties')
            })
    }

    useEffect(() => {
        fetch('/properties')
            .then(r => r.json())
            .then(data => {
                setPropertyList(data)
            })
    }, [])

    const handleChange = (event) => {
        setSelected(event.target.value)
        setToggle(true)
    }

    let menuContainers = [];

    if (propertyList.length != 0) {
        menuContainers = propertyList.map(element => {
            return <MenuItem key={`selected${element.id}`} value={element.id}>{element.address}</MenuItem>
        })
    }

    console.log(propertyList)


    let addUnitForm =

        <Container>
            <h3 style={{ textAlign: 'left' }}>Add Unit</h3>
            <Grid container spacing={4}
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'left',
                    justifyContent: 'left',
                    marginTop: 2
                }}
            >
                <Grid item xs={4}>
                    <TextField
                        id="single_bed"
                        label="Bed"
                        variant="outlined"
                        onChange={handleSingleUnitChange('bed')}
                        value={singleUnit.bed}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="single_bath"
                        label="Bath"
                        variant="outlined"
                        onChange={handleSingleUnitChange('bath')}
                        value={singleUnit.bath}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
                <Grid item xs={4}>
                    <TextField
                        id="single_size"
                        label="SqFt"
                        variant="outlined"
                        onChange={handleSingleUnitChange('size')}
                        value={singleUnit.size}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
                <Grid item xs={4} sx={{ paddingTop: 10 }}>
                    <TextField
                        id="single_rent"
                        label="Market Rent"
                        variant="outlined"
                        onChange={handleSingleUnitChange('rent')}
                        value={singleUnit.rent}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
            </Grid>
        </Container>

    return (
        <Container>
            <Container>
                <Searchback backLink='/home' title="Add Unit" searchOption={false}/>
                <FormControl
                    sx={{
                        marginTop: 10
                    }}
                >
                    <InputLabel id="demo-simple-select-label">Select Property</InputLabel>
                    <Select
                        labelId='propertList'
                        id='propertListId'
                        value={selected}
                        onChange={handleChange}
                        label="Select Property"
                        sx={{
                            width: 400
                        }}
                    >
                        {menuContainers}
                    </Select>
                </FormControl>
            </Container>
            {toggleUnitForm ? addUnitForm : null}
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