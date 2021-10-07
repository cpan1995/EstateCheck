import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Doughnut } from 'react-chartjs-2'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import {useHistory} from 'react-router-dom'


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


export default function QuickInfo() {

    const [units, setUnits] = useState(0)

    const [tenants, setTenants] = useState(0)

    let history = useHistory()


    useEffect(() => {
        fetch('/properties')
            .then((r) => r.json())
            .then(data => {
                let unitsLength = 0;
                data.forEach((property) => {
                    unitsLength += property.units.length
                })
                setUnits(unitsLength)
            })
    }, [])

    useEffect(() => {
        fetch('/tenants')
            .then((r) => r.json())
            .then(data => {
                setTenants(data.length)
            })
    }, [])

    const handleClick = () => {
        history.push('/properties')
    }

    const pieChartProp = {
        units: units,
        tenants: tenants
    }

    const containerStyle2 = {
        width: 800,
        height: 400,
        borderRadius: '2%',
        backgroundColor: 'white',
    }

    const headerOutline = {
        paddingTop: '20px',
        textAlign: 'left'
    }

    return (
        <Container sx={containerStyle2} id='quickMenuContainer'>
            <h4 style={headerOutline}>Properties</h4>
            <Divider />
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <div
                    sx={{
                        height: '270px',
                        width: '270px',
                        selfAlign: 'start'
                    }}
                >
                    <div
                        style={{
                            zIndex: '20',
                            position: 'relative',
                            top: 140
                        }}
                    >
                        <div
                        >
                            <h4
                                style={{
                                    marginTop: 0,
                                    marginBottom: 0
                                }}
                            >{pieChartProp.units}</h4>
                            <p
                                style={{
                                    marginTop: 0
                                }}
                            >Total Units</p>
                        </div>
                    </div>
                    <div
                        style={{
                            position: 'relative',
                            bottom: '50px'
                        }}
                    >
                        <PieChart pieChartData={pieChartProp} />
                    </div>
                </div>
                <Container
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <RadioButtonCheckedIcon
                            sx={{
                                color: 'rgb(0,128,0, 0.5)',
                                fontSize: '15px',
                                paddingRight: '10px'
                            }}
                        />
                        {pieChartProp.tenants}
                        <p
                            style={{
                                paddingLeft: '5px'
                            }}
                        >Occupied</p>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}
                    >
                        <RadioButtonCheckedIcon
                            sx={{
                                color: 'rgb(255,165,0, 0.5)',
                                fontSize: '15px',
                                paddingRight: '10px'
                            }}
                        />
                        {pieChartProp.units - pieChartProp.tenants}
                        <p style={{
                            paddingLeft: '5px'
                        }} >Vacant</p>
                    </div>
                    <div
                        style={{
                           paddingTop: '50px'
                        }}
                        onClick ={handleClick}
                    >
                        <h4
                        style={{
                            color: '#41a541'
                        }}
                        >View All</h4>
                    </div>
                </Container>
            </div>
        </Container>
    )
}