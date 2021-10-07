import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import ActionButton from '../../headers/ActionButton'
import RoomIcon from '@mui/icons-material/Room';
import { ButtonBase } from '@mui/material';
import { Doughnut } from 'react-chartjs-2'
import UnitInfo from './UnitInfo'
import MapsHomeWorkIcon from '@mui/icons-material/MapsHomeWork';
import HomeIcon from '@mui/icons-material/Home';
import Searchback from '../../headers/Searchback'


const PieChart = ({ pieChartData }) => {
    const styling = {
        cutout: '96%',
        borderColor: null
    }
    return (
        <div>
            <Doughnut
                data={{
                    datasets: [{
                        label: 'ActiveTenants',
                        data: [pieChartData.tenants, pieChartData.units - pieChartData.tenants],
                        backgroundColor: [
                            'rgb(255, 99, 132)',
                            'rgb(54, 162, 235)',
                        ],
                        hoverOffset: 4
                    }]
                }}
                options={styling}
            />
        </div>
    )
}

export default function PropertyDetails() {

    const [currentProperty, setProperty] = useState({

        units: []
    })
    const [currentUnits, setCurrentUnits] = useState([])
    const [currentTenants, setTenants] = useState([])
    const [currentExpense, setCurrentExpense] = useState([])

    const headerStyle = {
        color: 'grey',
        fontSize: "14px"
    }

    let formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    })
    let propertyAddress = ''

    if (currentProperty.address != null) {
        propertyAddress = currentProperty.address.split(',')[0]
    }

    const pieChartProp = {
        units: currentUnits.length,
        tenants: currentTenants.length
    }


    let history = useHistory()

    let { id } = useParams()

    let parsedAddress = ''
    let googleMapsSnapShot = ''
    let moreParsedAddress = ''

    if (currentProperty.address != null) {
        moreParsedAddress = currentProperty.address.split(',')
        parsedAddress = currentProperty.address.replace(' ', '+')
        googleMapsSnapShot = `https://maps.googleapis.com/maps/api/staticmap?center=${parsedAddress}&size=1000x1000&key=[API_KEY]`
    }

    const handleDeleteCallback = () => {
        fetch(`/properties/${currentProperty.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            }
        })
            .then(r => r.json())
            .then(data => {
                history.push('/properties')
            })
    }

    useEffect(() => {
        fetch(`/properties/${id}`)
            .then((r) => r.json())
            .then(data => setProperty(data))
    }, [])

    useEffect(() => {
        fetch(`/units/property/${id}`)
            .then((r) => r.json())
            .then(data => {
                let allTenants = [];
                data.forEach(unit => {
                    if (unit.tenant != null) {
                        allTenants.push(unit.tenant)
                    }
                })
                setCurrentUnits(data)
                setTenants(allTenants)
            })
    }, [])

    useEffect(() => {
        fetch(`/expenses/property/${id}`)
            .then((r) => r.json())
            .then(data => {
                setCurrentExpense(data)
            })
    }, [])

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <Container>
                <Searchback backLink="/properties" title={propertyAddress} searchOption={false} />
            </Container>
            <Container
                sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: '10px',
                }}
            >

                <Box
                    sx={{
                        background: '#272828',
                        background: '-webkit-linear-gradient(top left, #272828, #242424)',
                        background: '-moz-linear-gradient(top left, #272828, #242424)',
                        background: 'linear-gradient(to bottom right, #272828, #242424)',
                        height: 900,
                        width: 300,
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <img
                        src={googleMapsSnapShot}
                        style={{
                            marginTop: 10,
                            paddingLeft: 20,
                            paddingTop: 10,
                            height: 250,
                            width: 250,
                        }}
                    />
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            color: 'white'
                        }}
                    >
                        <h5>{moreParsedAddress[0]}</h5>
                        <RoomIcon
                            sx={{
                                alignSelf: 'center'
                            }}
                        />
                        <p>{currentProperty.address}</p>
                    </Container>
                    <Container
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            backgroundColor: '#565D69',
                            width: 260,
                            height: 70,
                            borderRadius: '6%',
                            justifyContent: 'center',
                            marginTop: 5,
                        }}
                        id="justNukeIt"
                    >
                        <ButtonBase
                            sx={{
                                color: '#CDCDCF',
                                width: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRightColor: 'white',
                                    width: 100,
                                }}
                            >
                                <h1>{currentUnits.length}</h1>
                                <h4
                                    style={{
                                        marginTop: 0
                                    }}
                                >Units</h4>
                            </Box>
                        </ButtonBase>
                        <ButtonBase

                            sx={{
                                borderLeft: '1px solid #797F88',
                                color: '#CDCDCF',
                                width: '100%'
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    borderRightColor: 'white',
                                    width: 100
                                }}
                            >
                                <h1>{currentTenants.length}</h1>
                                <h4
                                    style={{
                                        marginTop: 0
                                    }}
                                >Tenants</h4>
                            </Box>
                        </ButtonBase>
                    </Container>
                    <div
                        style={{
                            marginTop: '40px',
                            height: '280px',
                            width: '280px'
                        }}
                    >
                        <div
                            style={{
                                zIndex: '20',
                                position: 'relative',
                                width: '298px',
                                top: '100px'
                            }}
                        >
                            <h3
                                style={{
                                    marginTop: 0,
                                    color: 'white',
                                    fontSize: '30px'
                                }}
                            >
                                {Number(pieChartProp.tenants / pieChartProp.units).toLocaleString(undefined, { style: 'percent', minimumFractionDigits: 0 })}
                            </h3>
                        </div>
                        <div
                            style={{
                                position: 'relative',
                                bottom: '85px',
                                left: '5px'

                            }}
                        >
                            <PieChart pieChartData={pieChartProp} />
                        </div>
                    </div>
                    <h3
                        style={{
                            marginTop: 0,
                            color: 'white'
                        }}
                    >Occupancy</h3>
                </Box>

                <Box
                    sx={{
                        backgroundColor: '#F0F4F8',
                        height: 900,
                        width: 900,
                        display: 'flex',
                        flexDirection: 'column'

                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <HomeIcon
                                sx={{
                                    paddingTop: '7px'
                                }} />
                            <h1
                                style={{
                                    textAlign: 'left',
                                    fontSize: '15px'
                                }}
                            >General Information</h1>
                        </div>
                        <div
                            style={{
                                marginTop: '10px'
                            }}
                        >
                            <ActionButton type='Property' clickCallBack={handleDeleteCallback} />
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}
                    >
                        <Container>
                            <h4 style={headerStyle}>Property Address:</h4>
                            <p>{propertyAddress}</p>
                        </Container>
                        <Container>
                            <h4 style={headerStyle}>Property Tax</h4>
                            <p>{formatter.format(currentProperty.property_tax)}</p>
                        </Container>
                        <Container>
                            <h4 style={headerStyle}>Property Value</h4>
                            <p>{formatter.format(currentProperty.real_estate_value)}</p>
                        </Container>
                        <Container>
                            <h4 style={headerStyle}>Total Units</h4>
                            <p>{currentProperty.units.length}</p>
                        </Container>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column'
                        }}

                    >
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row'
                            }}
                        >
                            <MapsHomeWorkIcon sx={{ paddingTop: '16px' }} />
                            <h4
                                style={{
                                    fontSize: '15px',
                                    alignSelf: 'start'
                                }}
                            >Unit Info</h4>
                        </div>
                        <UnitInfo currentUnits={currentUnits} propertyInfo={currentProperty} currentExpense={currentExpense} />
                    </div>
                </Box>
            </Container>
        </Box>
    )
}