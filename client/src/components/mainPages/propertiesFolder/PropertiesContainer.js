import React, { useEffect, useState } from 'react'
import Container from '@mui/material/Container';
import PropertyCards from './PropertyCards'
import Searchback from '../../headers/Searchback';

export default function PropertiesContainer(){
    const [currentProperties, setCurrentProperties] = useState([])
    const [currentSearch, setSearch] = useState('')


    useEffect(() => {
        fetch('/properties')
        .then(r =>  r.json())
        .then(data => {
            setCurrentProperties(data)
        })
    }, [])

    let propertyCardsContainer = []
    
    if (currentProperties.length != 0){
        let filter = currentProperties.filter((property) => {
            if(property.address.toLowerCase().includes(currentSearch.toLowerCase())){
                return property
            }
        })
        propertyCardsContainer = filter.map(property => <PropertyCards key={property.id} propertyInfo = {property}/>)
    }

    const searchCallbacks = (newValues) => {
        setSearch(newValues)
    }
    
    return (
        <div
            style={{
                paddingLeft: '30px',
                paddingRight: '30px',
                width: '100%',
                marginLeft: 'auto',
                marginRight: 'auto',
                maxWidth: '1280px',
                marginTop: '20px',
                flexWrap: 'warp'
            }}
        >
            <Searchback searchCallBack = {searchCallbacks} title = "Properties" backLink="/home"/>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '1400px'
                }}
            >
                {propertyCardsContainer}
            </div>
        </div>
    )
}