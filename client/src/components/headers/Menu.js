import React, { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Menu({handleLogoutCallback}){
    let history = useHistory()
    const drawerWidth = 240;

    const handleMenuClick = (text) => {
        history.push(`/${text}`)
    }

    const handleLogout = () => {
        fetch('/logout', {
            method: 'DELETE'
        })
        .then(()=>{
            handleLogoutCallback()
            history.push('/home')
        })
    }
    
    const iconStyle = {
        color: "white"
    }

    return (
        <Drawer
            sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                background: '#272828',
                background: '-webkit-linear-gradient(top left, #272828, #242424)',
                background: '-moz-linear-gradient(top left, #272828, #242424)',
                background: 'linear-gradient(to bottom right, #272828, #242424)',
            },
            }}
            variant="permanent"
            anchor="left"
            >
            <List>
                <ListItem button key="Home" onClick = {() => handleMenuClick("home")}>
                    <ListItemIcon>
                        <HomeIcon sx={iconStyle}/>
                    </ListItemIcon>
                    <ListItemText primary="Home" sx={iconStyle}>
                    </ListItemText>
                </ListItem>
                <ListItem button key="Tenants" onClick = {() => handleMenuClick("tenants")}>
                    <ListItemIcon>
                        <PeopleIcon sx={iconStyle}/>
                    </ListItemIcon>
                    <ListItemText primary="Tenants" sx={iconStyle}>
                    </ListItemText>
                </ListItem>
                <ListItem button key="Properties" onClick = {() => handleMenuClick("properties")}>
                    <ListItemIcon>
                        <ApartmentIcon sx={iconStyle}/>
                    </ListItemIcon>
                    <ListItemText primary="Properties" sx={iconStyle}>
                    </ListItemText>
                </ListItem>
                <ListItem button key="Records" onClick = {() => handleMenuClick("records")}>
                    <ListItemIcon>
                        <AccountBalanceIcon sx={iconStyle}/>
                    </ListItemIcon>
                    <ListItemText primary="Records" sx={iconStyle}>
                    </ListItemText>
                </ListItem>
                <ListItem 
                    button key="LogOut" 
                    onClick = {handleLogout}
                    sx={{
                        marginTop: 'auto'
                    }}
                >
                    <ListItemIcon>
                        <LogoutIcon sx={iconStyle}/>
                    </ListItemIcon>
                    <ListItemText primary="Log Out" sx={iconStyle}>
                    </ListItemText>
                </ListItem>
            </List>
        </Drawer>
    )
}