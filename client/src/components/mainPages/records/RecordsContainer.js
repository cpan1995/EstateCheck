import { useEffect, useState } from 'react'
import Records from './Records'
import Container from '@mui/material/Container';
import Searchback from '../../headers/Searchback';


function createData(propertyAddress, type, amount, id, weekly, monthly, yearly){

    let currentType = ''
    if(monthly){
        currentType = "Monthly Expense"
    }
    else if(weekly){
        currentType = 'Weekly Expense'
    }
    else if(yearly){
        currentType = 'Yearly Expense'
    }
    
    return {propertyAddress, type, amount, id, currentType}
}

export default function RecordsContainer(){
    
    const [currentExpenses, setExpenses] = useState([])
    const [searchValues, setSearchValues] = useState('')
    
    useEffect(()=>{
        fetch('/expenses')
        .then(r=>r.json())
        .then(data => setExpenses(data))
    },[])

    console.log(currentExpenses)

    const rows = []
    
    if (currentExpenses.length!=0){
        let filteredExpenses = currentExpenses.filter((expense) => {
            if(expense.property.address.toLowerCase().includes(searchValues.toLowerCase())){
                return expense
            }
        })
        filteredExpenses.map(expense => {
            rows.push(createData(expense.property.address, expense.expense_type, expense.amount, expense.id, expense.is_weekly, expense.is_monthly, expense.is_yearly))
        })
    }

    const handleDelete = (id) => {
        fetch(`/expenses/${id}`, {
            method: 'DELETE',
        })
        .then(res => res.json())
        .then(data => console.log(data))

        let newExpenses = currentExpenses.filter(element => element.id != id)
        setExpenses(newExpenses)
    }

    const handleSearch = (values) => {
        setSearchValues(values)
    }

    return (
        <Container
            sx={{
                marginTop: '20px'
            }}
        >
            <Searchback backLink='/home' title="Expenses" searchCallBack={handleSearch}/>
            <div
                style={{
                    marginTop: 60
                }}
            >
                <Records dataRows={rows} handleDeleteCallBack = {handleDelete}/>
            </div>
        </Container>
    )
}