import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { styled, Box } from '@mui/system';
import ModalUnstyled from '@mui/core/ModalUnstyled';
import TenantEdit from './TenantEdit';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import FadeIn from 'react-fade-in';

export default function TenantsCards({ tenantInfo, callBack, editCallback }) {

    const [anchor, setAnchor] = useState(null)
    const deleteOpen = Boolean(anchor)
    const handleDeleteClick = (event) => {
        setAnchor(event.currentTarget)
    }

    const handleDeleteClose = () => {
        setAnchor(null)
    }

    const [currentProperty, setProperty] = useState({})
    const [open, setOpen] = useState(false)

    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false);

    const style = {
        width: 1000,
        bgcolor: 'white',
        border: '1px solid #000',
        p: 2,
        px: 4,
        pb: 3,
        borderRadius: '20px'
    };

    const Backdrop = styled('div')`
        z-index: -1;
        position: fixed;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.5);
        -webkit-tap-highlight-color: transparent;
    `;

    const StyledModal = styled(ModalUnstyled)`
        position: fixed;
        z-index: 1300;
        right: 0;
        bottom: 0;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    `;

    useEffect(() => {
        fetch(`/properties/${tenantInfo.unit.property_id}`)
            .then(r => r.json())
            .then(data => setProperty(data))
    }, [])

    const userIconStyle = {
        background: 'rgb(2,0,36)',
        background: 'linear-gradient(153deg, rgba(2,0,36,1) 0%, rgba(152,233,149,1) 0%, rgba(157,244,212,1) 28%)',
        height: '85px',
        width: '85px',
        margin: 'auto',
        borderRadius: '50%',
    }

    const handleClick = () => {
        fetch(`/tenants/${tenantInfo.id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8' // Indicates the content 
            }
        })
            .then(r => r.json())
            .then(() => {
                callBack(tenantInfo.id)
            })
    }

    return (
        <FadeIn>
            <Card
                sx={{
                    borderRadius: '3%',
                    width: 275,
                    height: 350,
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <div
                    style={{
                        marginLeft: '220px'
                    }}
                >
                    <IconButton
                        aira-label="actions"
                        id='deleteActionCards'
                        aira-controls='menu-options'
                        aria-expanded={deleteOpen ? 'true' : undefined}
                        aria-haspopup="true"
                        onClick={handleDeleteClick}
                    >
                        <MoreHorizIcon />
                    </IconButton>
                    <Menu
                        id="long-menu"
                        MenuListProps={{
                            'aria-labelledby': 'long-button',
                        }}
                        anchorEl={anchor}
                        open={deleteOpen}
                        onClose={handleDeleteClose}
                    >
                        <MenuItem key="deleteOption" onClick={handleClick}>Delete</MenuItem>
                    </Menu>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        marginTop: '10px'
                    }}
                >
                    <div
                        style={userIconStyle}
                    >
                        <div
                            style={{
                                textAlign: 'center',
                                marginTop: '20px',
                                color: 'white',
                                fontSize: '30px'
                            }}
                        >
                            {tenantInfo.first_name.split('')[0]}
                            {tenantInfo.last_name.split('')[0]}
                        </div>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <h3
                        style={{
                            fontSize: '15px',
                            marginBottom: '1px',
                            marginTop: '1px'
                        }}
                    >{tenantInfo.first_name} {tenantInfo.last_name}</h3>
                    <p
                        style={{
                            color: 'grey',
                            marginTop: '0px',
                            marginBottom: '0px'
                        }}
                    >{tenantInfo.email}</p>
                </div>
                <h4>{currentProperty.address}</h4>
                <Divider
                    sx={{
                        width: '400px',
                        marginBottom: 'auto'
                    }}
                />
                <div
                    style={{
                        marginBottom: 'auto'
                    }}
                >
                    <Button onClick={handleOpen}>
                        Edit Profile
                    </Button>
                    <StyledModal
                        aria-labelledby="unstyled-modal-title"
                        aria-describedby="unstyled-modal-description"
                        open={open}
                        onClose={handleClose}
                        BackdropComponent={Backdrop}
                    >
                        <Box sx={style}>
                            <TenantEdit tenantInfo={tenantInfo} editCallback={editCallback} closeCallBack={handleClose} />
                        </Box>
                    </StyledModal>
                </div>
            </Card>
        </FadeIn>
    )
}