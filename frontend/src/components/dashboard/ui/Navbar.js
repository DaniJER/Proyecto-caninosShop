import { AppBar, Box, IconButton, Toolbar } from '@mui/material'
import React from 'react'
import { CgMenuLeft } from "react-icons/cg";

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
            <Box>
                Navbar
            </Box>
        </Toolbar>
            
        </AppBar>
  )
}

export default Navbar
