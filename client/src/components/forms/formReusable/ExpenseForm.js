import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Switch from '@mui/material/Switch';

export default function ExpenseForm({formId, callBack}){

    const [currentValues, setValues] = useState({
        amount: '',
        type:'',
        is_weekly: true,
        is_monthly: false,
        is_yearly: false
    })

    useEffect(()=>{
        callBack(formId, currentValues)
    },[currentValues])

    const handleChange = (prop) => (event) => {
        setValues({...currentValues, [prop]: event.target.value})
    }

    const handleSwitchChange = (prop) => () => {
        switch (prop){
            case 'is_weekly':
                setValues({
                    ...currentValues,
                    [prop]: !currentValues.is_weekly,
                    is_monthly: false,
                    is_yearly: false
                })
                break;
            case 'is_monthly':
                setValues({
                    ...currentValues,
                    [prop]: !currentValues.is_monthly,
                    is_weekly: false,
                    is_yearly: false
                })
                break;
            default:
                setValues({
                    ...currentValues,
                    [prop]: !currentValues.is_yearly,
                    is_weekly: false,
                    is_monthly: false
                })
        }
    }

    
    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between'
            }}
        >
            <div>
                <Grid item xs={3}>
                    <TextField
                        id="Type" 
                        label="Expense Type" 
                        variant="outlined"
                        onChange={handleChange('type')}
                        value={currentValues.type}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
            </div>
            <div>
                <Grid item xs={4}>
                    <TextField
                        id="Amount" 
                        label="Amount" 
                        variant="outlined"
                        onChange={handleChange('amount')}
                        value={currentValues.amount}
                        sx={{
                            width: 300
                        }}
                    />
                </Grid>
            </div>
            <div>
                <Switch 
                    checked = {currentValues.is_weekly}
                    onChange = {handleSwitchChange('is_weekly')}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <p>Weekly</p>
            </div>
            <div>
                <Switch 
                    checked = {currentValues.is_monthly}
                    onChange = {handleSwitchChange('is_monthly')}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <p>Monthly</p>
            </div>
            <div>
                <Switch 
                    checked = {currentValues.is_yearly}
                    onChange = {handleSwitchChange('is_yearly')}
                    inputProps={{ 'aria-label': 'controlled' }}
                />
                <p>Yearly</p>
            </div>
        </Container>
    )
}