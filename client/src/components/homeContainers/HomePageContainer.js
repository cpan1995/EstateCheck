import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import QuickButtonContainer from './QuickButtonContainer';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import QuickInfo from './QuickInfo'

export default function HomePageContainer(){
    const containerStyle = {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingLeft: '240px',
        paddingRight: '240px',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 'auto'
        
    }

    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    return(
        <div style={containerStyle}>
            <Grid container spacing={2} columns={16} sx ={{
                paddingTop: '15%',
                marginLeft: '20px'
            }}>
                <Grid item xs={8}
                    sx={{
                        paddingRight: '100px'
                    }}
                >
                    <QuickButtonContainer/>
                </Grid>
                <Grid item xs={8}>
                    <QuickInfo /> 
                </Grid>
            </Grid>
        </div>
    )
}