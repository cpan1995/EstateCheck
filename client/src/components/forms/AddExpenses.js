import React, { useEffect, useState } from 'react'
import ExpenseForm from './formReusable/ExpenseForm'
import Container from '@mui/material/Container';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import {useHistory} from 'react-router-dom';
import Searchback from '../headers/Searchback';



export default function AddExpenses(){
    const [currentProperties, setProperties] = useState([])
    const [selected, setSelected] = useState('')
    const [toggleExpenseForm, setToggle] = useState(false)
    const [formValues, setFormValues] = useState([])
    const [formCounter, setFormCounter] = useState(1)

    let history = useHistory()

    useEffect(() => {
        fetch('/properties')
        .then(r=>r.json())
        .then(data => setProperties(data))
    },[])

    const handleFormCallBack = (formId, values) => {
        let newValues = [...formValues]

        console.log(newValues)

        if(newValues.length==0){
            newValues.push(
                {
                    id: formId,
                    values: {values}
                }
            )
        }
        else{
            let found = false
            newValues.forEach((element,index) => {
                if(element.id==formId){
                    newValues[index] = {
                        id: formId,
                        values: values
                    }
                    found = true
                }
            })
            if(!found){  
                newValues.push({
                    id: formId,
                    values: {values}
                })
            }
        }
        setFormValues(newValues)
    }

    let formContainer = []

    for (let i = formCounter; i>0 ; i--){
        formContainer.push(<ExpenseForm key={`form+${i}`} formId={i} callBack = {handleFormCallBack}/>)
    }

    let menuContainers = [];

    if(currentProperties.length!=0){
        menuContainers= currentProperties.map(property => {
            return <MenuItem key ={`property${property.id}`} name={property.id} value={property.id}>{property.address}</MenuItem>
        })
    }

    const handleIncrement = () => {
        let currentCounter = formCounter
        currentCounter += 1
        setFormCounter(currentCounter)
    }

    const handleCreate = () => {
        let fetchPromises = []
        formValues.forEach((element) => {
            fetchPromises.push(
                fetch('/expenses',{
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: "POST",
                    body: JSON.stringify({
                        expense_type: element.values.type,
                        amount: element.values.amount,
                        property_id: selected,
                        is_weekly: element.values.is_weekly,
                        is_monthly: element.values.is_monthly,
                        is_yearly: element.values.is_yearly
                    })
                })
                .then(r=>r.json())
                .then(data => console.log(data))
            )
            
        })
        Promise.all(fetchPromises).then(()=>{
            history.push('/records')
        })
    }

    const handleChange = (event) => {
        setSelected(event.target.value)
        setToggle(true)
    }
    
    return(
        <Container>
            <Searchback backLink="/home" title="Add Expenses" searchOption={false}/>
            <Container
                sx={{
                    marginTop: 5,
                    display: 'flex'
                }}
            >
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Select Property</InputLabel>
                    <Select
                      labelId = 'propertList'
                      id = 'propertListId'
                      value = {selected}
                      onChange={handleChange}
                      label = "Select Property"
                      sx={{
                        width: 400,
                      }}
                    >
                        {menuContainers}
                    </Select>
                </FormControl>
            </Container>
            <div
                style={{
                    marginTop: 80
                }}
            >
                {formContainer}
            </div>
            <Container
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 2
                }}
            >
                <div 
                    onClick={handleIncrement}
                >
                    <h5 
                        style={{
                            color: '#41a541',
                            margin: 0
                        }}
                    >Add Another Expense +</h5>
                </div>
                <Button 
                    key='properties_submit'
                    variant="contained" 
                    color="success"
                    sx={{
                        width: 120,
                        backgroundColor: '#41A541',
                        fontWeight: 'bold',
                        fontSize: 'small'
                    }}
                    onClick={handleCreate}
                >
                    Create
                </Button>
            </Container>
        </Container>
    )
}