import { AppBar, IconButton, Toolbar } from '@mui/material'
import React from 'react'

const Navbar = () => {
  return (
    <AppBar
            
            position="fixed"
            sx={{
                width: { lg: `calc(100% - ${300}px)` },
                ml:{sm:`${300}px`}, backgroundColor:'rgba(56, 189, 248, 0.8)', backdropFilter:'blur(6px)'
                }}
                
        >
        <Toolbar>
            <div>
                Navbar
            </div>
        </Toolbar>
            
        </AppBar>
  )
}

export default Navbar
