import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import Container from '@mui/material/Container';
import AddExpenses from './AddExpenses';
import AddProperties from './AddProperties';
import AddUnits from './AddUnits';
import AddTenants from './AddTenants';

export default function FormContainer({currentUser}){

    const difForms = {
        properties: <AddProperties />,
        expenses: <AddExpenses />,
        units: <AddUnits />,
        tenants: <AddTenants />
    }
    
    let { type } = useParams();

    
    
    return(
        <Container sx={{marginLeft: '20%'}}>
            {difForms[`${type}`]}
        </Container>
    )
}
