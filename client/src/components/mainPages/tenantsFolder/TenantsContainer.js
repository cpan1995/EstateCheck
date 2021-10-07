import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import TenantsCards from './TenantsCards'
import Container from '@mui/material/Container';
import Searchback from '../../headers/Searchback';

export default function TenantsContainer(){
    const [currentTenants, setCurrentTenants] = useState([])
    const [currentSearch, setSearch] = useState('')
    
    useEffect(() => {
        fetch('/tenants')
        .then(r => r.json())
        .then(data => setCurrentTenants(data))
    },[])

    const searchCallback = (newValues) => {
        console.log(newValues)
        setSearch(newValues)
    }


    const handleDeleteCallBack = (id) => {
        let newArray = currentTenants.filter(tenant => tenant.id != id)
        setCurrentTenants(newArray)
    }

    const handleEdit = (userInfo) => {
        console.log(userInfo)
        fetch(`/tenants/${userInfo.id}`, {
            method: "PATCH",
            headers: {    "Content-type": "application/json"  },
            body: JSON.stringify({
                first_name: userInfo.first_name,
                last_name: userInfo.last_name,
                email: userInfo.email
            })
        })
        .then(r=>r.json())
        .then(data => setCurrentTenants(data))
    }

    let tenantsCardsContainer = []
    if (currentTenants.length != 0){
        let filtered = []
        filtered = currentTenants.filter(tenant => {
            if(tenant.email.toLowerCase().includes(currentSearch.toLowerCase()) || tenant.first_name.toLowerCase().includes(currentSearch.toLowerCase()) || tenant.last_name.toLowerCase().includes(currentSearch.toLowerCase())){
                return tenant
            }
        })
        console.log(filtered)
        tenantsCardsContainer = filtered.map(tenant => {
            return <TenantsCards key={`tenant${tenant.id}`} tenantInfo = {tenant} callBack={handleDeleteCallBack} editCallback = {handleEdit}/>
        })
    }
   

    return (
        <Container
            sx={{
                display: 'flex',
                flexDirecton: 'column',
                marginTop: '20px'
            }}
        >
            <Searchback searchCallBack = {searchCallback} title="Tenants" backLink = {'/home'}/>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    flexWrap: 'wrap'
                }}
            >
                    {tenantsCardsContainer}
            </div>
        </Container>
    )
}