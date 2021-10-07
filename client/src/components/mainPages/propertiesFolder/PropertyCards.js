import React, { useEffect, useState } from 'react'
import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import CardMedia from '@mui/material/CardMedia';
import RoomIcon from '@mui/icons-material/Room';
import { useHistory } from 'react-router-dom';
import { ButtonBase } from '@mui/material';
import { Divider } from '@mui/material';
import FadeIn from 'react-fade-in/lib/FadeIn';

export default function PropertyCards({ propertyInfo }) {

    const [unitsValues, setUnitValues] = useState([])

    let history = useHistory()

    const handleClick = () => {
        history.push(`/properties/${propertyInfo.id}/info`)
    }

    let listOfUnits = []

    const totalUnits = unitsValues.length
    const totalVacant = () => {
        let counter = 0;
        unitsValues.forEach((unit) => {
            if (unit.tenant == null) {
                counter++
            }
        })
        return counter
    }
    const totalOccuplied = () => {
        let counter = 0;
        unitsValues.forEach((unit) => {
            if (unit.tenant != null) {
                counter++
            }
        })
        return counter
    }

    useEffect(() => {
        let units = propertyInfo.units
        let fetchPromises = []
        units.forEach(unitCheck => {
            fetchPromises.push(
                fetch(`/units/${unitCheck.id}`)
                    .then(r => r.json())
                    .then(data => listOfUnits.push(data))
            )
        })
        Promise.all(fetchPromises).then(() => {
            setUnitValues(listOfUnits)
        })
    }, [])

    let parsedAddress = ''
    let googleMapsSnapShot = ''
    let moreParsedAddress = ''
    if (propertyInfo.address != null) {
        moreParsedAddress = propertyInfo.address.split(',')
        parsedAddress = propertyInfo.address.replace(' ', '+')
        googleMapsSnapShot = `https://maps.googleapis.com/maps/api/staticmap?center=${parsedAddress}&size=600x300&key=[API_KEY]`
    }
    return (
        <FadeIn>
            <Card
                sx={{
                    display: 'flex',
                    width: 600,
                    height: 200,
                    margin: '30px',
                    borderRadius: '10px'
                }}>
                <ButtonBase onClick={handleClick}>
                    <CardMedia
                        component="img"
                        sx={{
                            width: 151,
                            height: 151,
                            padding: '10px',
                            borderRadius: '10px'
                        }}
                        image={googleMapsSnapShot}
                        alt="Location of Property"
                    />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: '400px'
                    }}>
                        <h6
                            style={{
                                marginTop: '5px',
                                marginBottom: '1px',
                                display: 'flex',
                                justifyContent: 'left',
                                fontSize: '13px'
                            }}
                        >{moreParsedAddress[0]}</h6>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'left',
                                textAlign: 'left'
                            }}
                        >
                            <RoomIcon
                                sx={{
                                    marginTop: '20px',
                                    color: '#6d6f70'
                                }}
                            />
                            <Box>
                                <p style={{
                                    fontSize: '12px',
                                    width: '100px',
                                    color: '#6d6f70'
                                }}>{propertyInfo.address}</p>
                            </Box>
                        </div>
                        <h4
                            style={{
                                textAlign: 'left',
                                marginBottom: '0px'
                            }}
                        >{propertyInfo.units.length} Units</h4>
                        <Divider
                            sx={{
                                background: 'rgb(2,0,36)',
                                background: '-moz-linear-gradient(276deg, rgba(2,0,36,1) 0%, rgba(215,250,250,0.47102591036414565) 0%, rgba(214,230,249,1) 30%, rgba(209,142,244,1) 64%)',
                                background: '-webkit-linear-gradient(276deg, rgba(2,0,36,1) 0%, rgba(215,250,250,0.47102591036414565) 0%, rgba(214,230,249,1) 30%, rgba(209,142,244,1) 64%)',
                                background: "linear-gradient(276deg, rgba(2,0,36,1) 0%, rgba(215,250,250,0.47102591036414565) 0%, rgba(214,230,249,1) 30%, rgba(209,142,244,1) 64%)",
                                height: '3px',
                                borderBottomColor: 'rgba(0, 0, 0, 0)',
                            }}
                        >
                        </Divider>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between'
                            }}
                        >
                            <h6>{totalOccuplied()} OCCUPIED</h6>
                            <h6>{totalVacant()} VACANT</h6>
                        </div>
                        <div>
                            <a onClick={handleClick}
                                style={{
                                    color: '#41a541',
                                    float: 'right'
                                }}
                            >{"view >"}</a>
                        </div>
                    </div>
                </ButtonBase>
            </Card>
        </FadeIn>
    )
}