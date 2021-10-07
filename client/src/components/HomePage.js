import React, { useEffect, useState } from 'react'
import Login from './auth/Login'
import { NavLink, Switch, Route, useHistory, Redirect } from "react-router-dom"
import SignUp from './auth/SignUp'
import Menu from './headers/Menu'
import HomePageContainer from './homeContainers/HomePageContainer'
import FormContainer from './forms/FormContainer'
import AddTenants from './forms/AddTenants'
import PropertiesContainer from './mainPages/propertiesFolder/PropertiesContainer'
import PropertyDetails from './mainPages/propertiesFolder/PropertyDetails'
import TenantsContainer from './mainPages/tenantsFolder/TenantsContainer'
import RecordsContainer from './mainPages/records/RecordsContainer'
import Searchback from './headers/Searchback'


function useForceUpdate(){
    const [value, setValue] = useState(0); // integer state
    return () => setValue(value => value + 1); // update the state to force render
}

export default function HomePage() {

    const [isLoggedIn, setLogin] = useState(false)
    const [user, setUser] = useState({})
    const [currentErrors, setErrors] = useState({})

    let history = useHistory()
    
    useEffect(() => {
        fetch("/me").then((r) => {
            console.log(r)
            if(r.ok) {
                r.json().then((user) => {
                    setUser(user)
                    setLogin(true)
                })
            }
        })
    }, [])

    const forceUpdate = useForceUpdate();

    const handleSignIn = (userInfo) => {
        setUser(userInfo)
        setLogin(true)
    }

    const handleSignout = () => {
        setUser({})
        setLogin(false)
    }
    
    return (
        <div>
            <Switch>
                <Route exact path = '/testpath'>
                    <Searchback />
                </Route>
                <Route exact path = '/'>
                   {isLoggedIn ? 
                        <Redirect to="/home"/>
                        :
                        <Login loginCallback = {handleSignIn}/>
                    }
                </Route> 
                <Route exact path = '/signup'>
                    <SignUp setUserCallBack = {handleSignIn}/>
                </Route>
                <Route exact path = '/login'>
                    {isLoggedIn ? 
                        <Redirect to="/home"/>
                        :
                        <Login loginCallback = {handleSignIn}/>
                    }
                </Route>
                <Route exact path = '/home'>
                    {isLoggedIn ? 
                        <>
                            <Menu handleLogoutCallback = {handleSignout}/>
                            <HomePageContainer />
                        </>
                        :
                        <Redirect to="/login"/>    
                    }
                </Route>
                <Route exact path = '/tenants'>
                    {isLoggedIn ? 
                        <>
                            <Menu handleLogoutCallback = {handleSignout}/>
                            <TenantsContainer />
                        </>
                        :
                        <Redirect to="/login"/>    
                    }
                </Route>
                <Route exact path = '/properties'>
                    {isLoggedIn ? 
                        <>
                            <Menu handleLogoutCallback = {handleSignout}/>
                            <PropertiesContainer />
                        </>
                        :
                        <Redirect to="/login"/>    
                    }
                </Route>
                <Route exact path = '/records'>
                    {isLoggedIn ? 
                        <>
                            <Menu handleLogoutCallback = {handleSignout}/>
                            <RecordsContainer />
                        </>
                        :
                        <Redirect to="/login"/>    
                    }
                </Route>
                <Route exact path = '/:type/add'>
                    {isLoggedIn ? 
                        <>
                            <Menu handleLogoutCallback = {handleSignout}/>
                            <FormContainer currentUser = {user}/>
                        </>
                        :
                        <Redirect to="/login"/>    
                    }
                </Route>
                <Route exact path = '/properties/:id/info'>
                    {isLoggedIn ? 
                        <>
                            <Menu handleLogoutCallback = {handleSignout}/>
                            <PropertyDetails />
                        </>
                        :
                        <Redirect to="/login"/>    
                    }
                </Route>

            </Switch>
        </div>
    )
}