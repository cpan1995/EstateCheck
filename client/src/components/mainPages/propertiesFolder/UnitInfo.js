import { useEffect, useState } from 'react'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Container } from '@mui/material';
import BarChart from '../../charts/BarChart'
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

function calculateExpense(allExpenses){
    let yearlyExpense = {
        'January': 0,
        'February': 0,
        'March': 0,
        'April': 0,
        'May': 0,
        'June': 0,
        'July': 0,
        'August': 0,
        'September': 0,
        'October': 0,
        'November': 0,
        'December': 0
    }

    //loop through all expense
    if(allExpenses.length!=0){
        let totalExpenseMonthly = 0.0;
        allExpenses.forEach(expense => {
            if(expense.is_monthly){
                totalExpenseMonthly += expense.amount
            }
            else if(expense.is_weekly){
                totalExpenseMonthly += (4*expense.amount)
            }
            else if(expense.is_yearly){
                totalExpenseMonthly += (expense.amount/12)
            }
        })
        //add expenses to each month
        for (const [key, value] of Object.entries(yearlyExpense)) {
            yearlyExpense[key] += Math.floor(totalExpenseMonthly)
        }
    }
    return yearlyExpense
}

function calculateRevenue(units){
    let yearlyRevenue = {
        'January': 0,
        'February': 0,
        'March': 0,
        'April': 0,
        'May': 0,
        'June': 0,
        'July': 0,
        'August': 0,
        'September': 0,
        'October': 0,
        'November': 0,
        'December': 0
    }

    //loop through units
    if(units.length != 0){
        let totalMonthlyRevenue = 0.0
        units.forEach(unit => {
            if(unit.tenant!=null){
                totalMonthlyRevenue += 1600
            }
        })
        for (const [key, value] of Object.entries(yearlyRevenue)) {
            yearlyRevenue[key] += Math.floor(totalMonthlyRevenue)
        }
    }
    return yearlyRevenue
}

const IndiviualUnit = ({unit}) => {
    
    let formatter = new Intl.NumberFormat('en-US',{
        style: 'currency',
        currency: 'USD'
    })

    const headerStyle = {
        color: 'grey',
        fontSize: "14px"
    }

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'row',
                color: 'black',
                justifyContent: 'space-evenly',
            }}
        >
            <div>
                <h4 style = {headerStyle}>Unit Number</h4>
                <p>{`Unit ${unit.property_id}0${unit.id}`}</p>
            </div>
            <div>
                <h4 style = {headerStyle}>Bath </h4>
                <p>{unit.bath_num}</p>
            </div>
            <div>
                <h4 style = {headerStyle}>Bed </h4>
                <p>{unit.bed_num}</p>
            </div>
            <div>
                <h4 style = {headerStyle}>Bath </h4>
                <p>{unit.bath_num}</p>
            </div>
            <div>
                <h4 style = {headerStyle}>Rent Amount/Monthly </h4>
                <p>{formatter.format(unit.rent_amount)}</p>
            </div>
        </Container>
    )
}

const ExpensesUnitChart = ({propertyInfo, currentUnits, currentExpense}) => {


    const yearlyExpenses = calculateExpense(currentExpense)
    const yearlyRevenue = calculateRevenue(currentUnits)
    return (
        <div>
            <BarChart expenses = {yearlyExpenses} revenues = {yearlyRevenue}/>
        </div>
    )
}


export default function UnitInfo({currentUnits, propertyInfo, currentExpense}){

    const [selected, setSelected] = useState({})
    
    const unitSelect = currentUnits.map(unit => {
        return <MenuItem key={`unit+#123${unit.id}`}value={unit}>{`Unit ${unit.property_id}0${unit.id}`}</MenuItem>
    })
    
    const handleChange = (event) => {
        setSelected(event.target.value)
    }
    
    useEffect(() => {
        if(currentUnits.length!=0){
            setSelected(currentUnits[0])
        }
    },[currentUnits])
    
    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
            <FormControl 
                sx={{
                    width: '200px',
                    float: 'left',
                    marginLeft: '10px'
                }}
            >
                <InputLabel id="slectUnit">Units...</InputLabel>
                <Select
                    labelId="selectUnit"
                    id="selectUnitId"
                    label= "Units"
                    onChange={handleChange}
                >
                    {unitSelect}
                </Select>
            </FormControl>
            <IndiviualUnit unit = {selected}/>
            <div>
                <div 
                    style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}
                >
                    <AccountBalanceIcon sx={{
                        marginTop: '20px'
                    }}/>
                    <h4>Basic Financial</h4>
                </div>
                <ExpensesUnitChart propertyInfo={propertyInfo} currentUnits = {currentUnits} currentExpense={currentExpense}/>
            </div>
        </div>
    )
}