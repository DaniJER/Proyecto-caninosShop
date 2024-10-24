import { AppBar, Box, Grid, IconButton, Toolbar } from '@mui/material'
import React from 'react'
import { CgMenuLeft } from "react-icons/cg";
import Account from './header/Account';
import { IoSearchOutline } from "react-icons/io5";
import Link from 'next/link';

const Navbar = ({draweWidth, onOpenNav }) => {
  return (
    <AppBar
            
            position="fixed"
            sx={{
                width: { lg: `calc(100% - ${draweWidth}px)` },
                ml:{sm:`${draweWidth}px`}, backgroundColor:'rgba(56, 189, 248, 0.8)', backdropFilter:'blur(6px)'
                }}
                
        >
        <Toolbar>
            <IconButton
                
                edge="start"
                sx={{ display: {lg: 'none'}, color:'rgb(151 151 151)'}}
                onClick={onOpenNav}
            >
                <CgMenuLeft/>
                
            </IconButton>
            <Grid 
                container
                direction={'row'}
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                 <IoSearchOutline  size={24}/>
                 
                <Grid
                  sx={{display:'flex', alignItems:'center', gap:'8px'}}
                >
                
                <Account/>
                
                </Grid>
                
            </Grid>
        </Toolbar>
            
        </AppBar>
  )
}

export default Navbar
