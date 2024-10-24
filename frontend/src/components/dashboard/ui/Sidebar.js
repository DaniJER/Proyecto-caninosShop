'use client'
import { Box, Drawer, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import useResponsive from '../hooks/useResponsive'
import Image from 'next/image'
import { IoIosCloseCircleOutline } from "react-icons/io";

const Sidebar = ({draweWidth, openNav, onCloseNav, onToggleDrawerWidth}) => {

    const isDesktop = useResponsive('up','lg');

    const content = (
        <>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems:'center',
                borderBottom:2,
                borderColor: 'divider',
                height:70,
            }}>
                <Typography  noWrap component={'div'} >
                    <Image
                        src="/logo.png"
                        width={120}
                        height={50}
                        alt="Logo"
                        title='logo'
                    />
                </Typography>

                <IconButton
                
                edge="start"
                sx={{ display: {lg: 'none'}, color:'black'}}
                onClick={onCloseNav}
                >
                    <IoIosCloseCircleOutline size={35}/>
                    
                </IconButton>
            </Toolbar>
        </>
    )

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
          {
            content
          }
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

            {
                content
            }
            </Drawer>

            )
        } 
            
        </Box>
    );
}

export default Sidebar
