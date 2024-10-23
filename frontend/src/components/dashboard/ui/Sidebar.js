'use client'
import { Box, Drawer } from '@mui/material'
import React from 'react'
import useResponsive from '../hooks/useResponsive'

const Sidebar = ({draweWidth, openNav, onCloseNav, onToggleDrawerWidth}) => {

    const isDesktop = useResponsive('up','lg');

    return (
        <Box
            component={'nav'}
            sx={{
                flexShrink: { lg: 0 },
                width: { lg:  draweWidth },
            }}
        >
        {
            isDesktop ? (
                <Drawer
            open
            variant="permanent"
            PaperProps={{
                sx: {
                width: draweWidth,
                bgcolor: 'background.default',
                borderRightStyle: 'double',
                },
            }}
        >
          <div  className='flex justify-center items-center h-screen'>
             sidebar desktop
          </div>
        </Drawer>

            ):(
                <Drawer
          
              
                open={openNav}
                onClose={onCloseNav}

                ModalProps={{
                    keepMounted: true,
                }}

                PaperProps={{
                    sx:{
                        width: draweWidth,
                        bgcolor: 'background.default',
                        borderRightStyle: 'double',
                    }
                }}
            >

            <div  className='flex justify-center items-center h-screen'>
             sidebar phone
            </div>
            </Drawer>

            )
        } 
            
        </Box>
    );
}

export default Sidebar
