import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import BedroomParentOutlinedIcon from '@mui/icons-material/BedroomParentOutlined';
import {useHistory} from "react-router-dom"

export default function QuickButtonContainer(){

    let history = useHistory()

    const handleClick = (keyValue) => {
        history.push(`/${keyValue}/add`)
    }

    const buttonStyle  = {
        display: 'flex',
        flexDirection: 'column',
        height: 100,
        width: 180,
        color: 'green',
        border: '1px solid green',

    }

    const iconStyle = {
        height: 40,
        width: 40,
    }

    const buttons = [
        <Button key="properties" sx={buttonStyle}
            startIcon={<HomeOutlinedIcon sx={iconStyle}/>}
            size='large'
            onClick={() => handleClick("properties")}
        >Add Property</Button>,
        <Button key="tenants" sx={buttonStyle}
            startIcon={<GroupAddOutlinedIcon sx={iconStyle}/>}
            size='large'
            onClick={() => handleClick("tenants")}
        >Add Tenant</Button>,
        <Button key="expenses" sx={buttonStyle}
            startIcon={<AddchartOutlinedIcon sx={iconStyle}/>}
            size='large'
            onClick={() => handleClick("expenses")}
        >Add Expenses</Button>,
        <Button key="units" sx={buttonStyle}
            startIcon={<BedroomParentOutlinedIcon sx={iconStyle}/>}
            size='large'
            onClick={() => handleClick("units")}
        >Add Units</Button>
    ]

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

    const buttonGroupStyle = {
        paddingTop: '15%',
        paddingBottom: '20%',
    }

    return (
        <Container sx={containerStyle2} id = 'quickMenuContainer'>
            <h4 style={headerOutline}>Quick Buttons</h4>
            <Divider />
            <Box>
                <ButtonGroup size='large' aria-label='large button group' sx={buttonGroupStyle}>
                    {buttons} 
                </ButtonGroup>
            </Box>
        </Container>
    )
}