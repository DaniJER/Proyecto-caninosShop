'use client'

import { Box } from '@mui/material';
import React, { useState } from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styled from '@emotion/styled';

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 64;

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: APP_BAR_MOBILE + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: APP_BAR_DESKTOP + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

const LayoutWrapper = ({children}) => {

    const [drawerWidth, setDrawerWidth] = useState(300); 
  

    const toggleDrawerWidth = () => {
        setDrawerWidth((prevWidth) => (prevWidth === 280 ? 88 : 280)); 
    };

    const [open, setOpen] = useState(false)

  return (
    <Box display={'flex'}>
        <Navbar  draweWidth={drawerWidth} onOpenNav={() => setOpen(true)} />
        <Sidebar draweWidth={drawerWidth} openNav={open} onCloseNav={() => setOpen(false)}  onToggleDrawerWidth={toggleDrawerWidth}/>
        <Main>
            {
                children
            }
       </Main>
    </Box>
  )
}

export default LayoutWrapper
