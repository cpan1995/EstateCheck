import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import SearchLocationInput from '../GoogleStuff/SearchLocationInput';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import {useHistory} from 'react-router-dom'
import Searchback from '../headers/Searchback';

function addNewProperty(generalInfo, singleUnit){
    fetch('/properties/add', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            'property_tax': generalInfo.propertyTax,
            'real_estate_value': generalInfo.realEstateValue,
            'mortgage': generalInfo.mortgage,
            'address': generalInfo.address,
            'name': generalInfo.name,
            'year_built': generalInfo.yearBuilt
        })
    })
    .then((r) => r.json())
    .then((newProperty) => {
        addUnits(newProperty, singleUnit)
    })
}

function addUnits(propertyInfo, singleUnitInfo){
    fetch('/units/add', {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            'property_id': propertyInfo.id,
            'bed_num': singleUnitInfo.bed,
            'bath_num': singleUnitInfo.bath,
            'size': singleUnitInfo.size,
            'rent_amount': singleUnitInfo.rent
        })
    })
}


export default function AddProperties(){
    const [generalInfo, setInfo] = useState({
        propertyName: '',
        yearBuilt: '',
        msl: '',
        address: '',
        propertyTax: '',
        mortgage: '',
        realEstateValue: ''
    })
    const [unitsInfo, setUnitsInfo] = useState({
        units: []
    })
    const [singleUnit, setSingle] = useState({
        bed: '',
        bath: '',
        size: '',
        rent: ''
    })

    const [toggleType, setType] = useState(false)

    let history = useHistory()

    const handleChange = (prop) => (event) => {
        setInfo({...generalInfo, [prop]: event.target.value})
    };

    const handleSingleUnitChange = (prop) => (event) => {
        setSingle({...singleUnit, [prop]: event.target.value})
    }

    const handleGoogleChange = (googleAddress) => {
        setInfo({...generalInfo, address: googleAddress })
    }

    const handleCreate = async () => {
        let results = await addNewProperty(generalInfo, singleUnit)
        history.push('/properties')
    }

    // function handleCreate() 

    const googleSearchStyle = {
        display: 'flex',
        width: 1005
    }

    const generalInfoStyle = {
        marginTop: '20px'    
    }

    const headerStyle = {
        display: 'flex'
    }

    const singleType =
    <>
        <h3 style={{textAlign: 'left'}}>Single Unit Information</h3>
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
            <Grid item xs={4} sx={{paddingTop: 10}}>
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
    </>
    return(
        <>
        <Container sx={{
            backgroundColor: '#F0F4F8',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <Searchback backLink='/home' title='Add Property' searchOption={false}/>
            <Box sx={{ flexGrow: 1 }}>
                <h3 style={headerStyle}>General Information</h3>
                <Divider />
                <Grid container spacing={4} sx={generalInfoStyle}>
                    <Grid item xs={7}>
                        <TextField 
                            id="property_name" 
                            label="Property Name" 
                            variant="outlined"
                            onChange={handleChange('propertyName')}
                            value={generalInfo.propertyName}
                            sx={{
                                display: 'flex',
                                width: 600
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="property_year"
                            label="Year Built"
                            variant="outlined"
                            onChange={handleChange('yearBuilt')}
                            value={generalInfo.yearBuilt}
                            sx={{
                                display: 'flex',
                                width: 150
                            }}
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <TextField
                            id="property_year"
                            label="Mls #"
                            variant="outlined"
                            onChange={handleChange('mls')}
                            value={generalInfo.mls}
                            sx={{
                                display: 'flex',
                                width:150
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <SearchLocationInput BoxStyle={googleSearchStyle} callBackHandleChange= {handleGoogleChange}/>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
            
                <Divider sx={{paddingTop: '30px'}}/>
                <h3 style={headerStyle}>Property Type</h3>
                <Grid container spacing={4}
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Grid item xs={5}>
                        <Container
                            fixed
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'left',
                                border: '1px solid grey',
                                minHeight: '280px',
                                borderRadius: '2%'
                            }}
                        >
                            <h5 style={{
                                float: 'left'
                            }}>SINGLE UNIT TYPE</h5>
                            <p>
                                Single family rentals (often abbreviated as SFR) are rentals in which there is only one rental associated to a specific address. This type of rental is usually used for a house, single mobile home, or a single condo. <b>This type of property does not allow to add any units/rooms</b>
                            </p>
                            <Container
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                            >
                                <Radio
                                    checked={!toggleType}
                                    onClick={()=>{setType(false)}}
                                    value="singleUnit"
                                    name="SingleUnitButton"
                                />
                                <p>Single Unit Type</p>
                            </Container>
                        </Container>
                    </Grid>
                    <Grid item xs={5}>
                        <Container
                            fixed
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                textAlign: 'left',
                                border: '1px solid grey',
                                minHeight: '280px',
                                borderRadius: '2%'
                            }}
                        >
                            <h5 style={{
                                float: 'left'
                            }}>MULTI UNIT TYPE</h5>
                            <p>
                            Multi-unit property are for rentals in which there are multiple rental units per a single address. This type of property is typically used for renting out rooms of a house, apartment units, office units, condos, garages, storage units, mobile home park and etc.
                            </p>
                            <Container
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'row'
                                }}
                            >
                                <Radio
                                    checked={toggleType}
                                    onClick={()=>{setType(true)}}
                                    value="singleUnit"
                                    name="SingleUnitButton"
                                />
                                <p>Multi Unit Type</p>
                            </Container>
                        </Container>
                    </Grid>
                </Grid>
            </Box>
            <Box sx={{ flexGrow: 1 }}>
                {!toggleType ? singleType : <></>}
            </Box>
            <Divider 
                sx={{
                    marginTop: 5
                }}
            />
            <Box sx={{ flexGrow: 1 }}>
                <h3 style={headerStyle}>Financial Information</h3>
                <Grid container spacing={4} sx={generalInfoStyle}>
                    <Grid item xs={4}>
                        <TextField 
                            id="property_tax_box" 
                            label="Yearly Property Tax" 
                            variant="outlined"
                            onChange={handleChange('propertyTax')}
                            value={generalInfo.propertyTax}
                            sx={{
                                width: 300
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="monthly_mortgage" 
                            label="Monthly Mortgage" 
                            variant="outlined"
                            onChange={handleChange('mortgage')}
                            value={generalInfo.mortgage}
                            sx={{
                                width: 300
                            }}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <TextField 
                            id="real_estate_value" 
                            label="Property Value" 
                            variant="outlined"
                            onChange={handleChange('realEstateValue')}
                            value={generalInfo.realEstateValue}
                            sx={{
                                width: 300
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Divider 
                sx={{marginTop: 5}}
            />
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
    </>
    )
}