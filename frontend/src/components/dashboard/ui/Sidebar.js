'use client'
import { alpha, Avatar, Box, Drawer, IconButton, Link, Toolbar, Typography } from '@mui/material'
import React from 'react'
import useResponsive from '../hooks/useResponsive'
import Image from 'next/image'
import { IoIosCloseCircleOutline } from "react-icons/io";
import styled from '@emotion/styled'

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));


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
            <Box sx={{ 
                    mb: draweWidth === 88 ? 1 : 3, 
                    mx:  draweWidth === 88 ? 1: 2.5, 
                    mt: draweWidth === 88 ? 1: 2, 
                }}>
                <Link underline="none">
                <StyledAccount sx={{
                    flexDirection: draweWidth === 88 ? 'column':'row',

                }}>
                    <Avatar src={'https://inversionesdiomardisas.vercel.app/assets/images/avatars/avatar_default.jpg'} alt="photoURL" />

                    <Box sx={{ ml:draweWidth === 88 ? 0 : 1 }}>
                    <Typography 
                        variant="subtitle2" 
                        sx={{ 
                            color: 'text.primary',
                            fontWeight:'700',
                            ...(draweWidth === 88 && {
                                lineHeight:'2.2',
                                fontSize:'0.76rem',
                            }),
                            }}>
                        name
                    </Typography>
                    </Box>
                </StyledAccount>
                </Link>
            </Box>
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
