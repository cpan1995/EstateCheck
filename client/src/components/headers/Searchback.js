import Button from '@mui/material/Button';
import { useParams, useHistory } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';
import { withStyles } from "@material-ui/core/styles";
import { Container } from '@material-ui/core';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import { letterSpacing } from '@mui/system';

const AnimatedSearch = ({search}) =>{
    const node = useRef()
    const [changeSearchStyle, setSearchStyle] = useState(0)
    const [values, setValues] = useState("")

    const hiddenCheck = (changeSearchStyle === 0) ? 'hidden' : 'visible'
    
    const searchStyle = {
        width: changeSearchStyle,
        transition: 'width 0.2s',
        visibility: hiddenCheck
    }
    const handleClickOutside = e => {
        if(node.current.contains(e.target)){
            return
        }
        else{
            setSearchStyle(0)
        }
    }

    const handleClickSearch = () => {
        search(values)
    }

    search(values)


    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    },[])
    
    return (
        <Container
            style={{
                display: 'flex',
                flexDirection: 'row',
                width: '300px',
                marginLeft:0,
                marginRight:0,
            }}
        >
                <div>
                    <IconButton onMouseOver={()=>setSearchStyle('200px')}
                        onClick={handleClickSearch}
                    >
                        <SearchIcon
                            sx = {{
                                marginTop: '5px',
                                fontSize: '30px',
                            }}
                        />
                    </IconButton>
                </div>
                <TextField
                    ref= {node}
                    id ="searchbox"
                    label = 'Search...'
                    sx={searchStyle}
                    values={values}
                    onChange={(e) => setValues(e.target.value)}
                />
        </Container>
    )
}

export default function Searchback({backLink, title, searchCallBack, searchOption = true }){
    const [searchValues, setValues] = useState('')
    
    let history = useHistory()

    const handleClick = () => {
        history.push(backLink)
    }

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'row',
            }}
        >
            <IconButton aria-label="back" size="large" onClick={handleClick}>
                <ArrowBackIcon 
                    sx = {{
                        fontSize: '30px',
                        border: '3px solid #6d6f70',
                        borderRadius: '20%'
                    }}
                />
            </IconButton>
            <h2
                style={{
                    alignSelf: 'left'
                }}
            >{title}</h2>
            <div
                style = {{
                    marginLeft: 'auto'
                }}
            >
                {searchOption ? <AnimatedSearch search = {searchCallBack}/> : null}
            </div>
        </div>
    )
}