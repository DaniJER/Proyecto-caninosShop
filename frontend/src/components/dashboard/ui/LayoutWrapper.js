'use client'

import { Box } from '@mui/material';
import React from 'react'
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import styled from '@emotion/styled';

const Main = styled('div')(({ theme }) => ({
    flexGrow: 1,
    overflow: 'auto',
    minHeight: '100%',
    paddingTop: 1 + 24,
    paddingBottom: theme.spacing(10),
    [theme.breakpoints.up('lg')]: {
      paddingTop: 1 + 24,
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },
  }));

const LayoutWrapper = ({children}) => {
  return (
    <Box display={'flex'}>
        <Navbar/>
        <Sidebar/>
        <Main>
            {
                children
            }
       </Main>
    </Box>
  )
}

export default LayoutWrapper
