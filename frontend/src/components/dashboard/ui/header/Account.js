'use client';

import { Avatar, Box, Divider, IconButton, MenuItem, Popover, Stack, Typography, alpha } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';


const menuItems = [
    { name: 'Inicio',  route: '/dashboard' },
    { name: 'Perfil',  route: '/dashboard/perfil' },
    { name: 'Ajustes', route: '/dashboard/ajustes' },
];


const Account = () => {

    const [open, setOpen] = useState(null);


    const onLogout = ()=>{
        return
    }
    
    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };
    
    const handleClose = () => {
        setOpen(null);
    };



    return (
        <>
           <IconButton
           onClick={handleOpen}
           sx={{
            
           }}
            
            >
                <Avatar 
                    sx={{ height:30, width:30,
                        ...(open && {
            '&:before': {
              zIndex: 0,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[600], 0.8),
            },
          })
                    }} 
                    alt="Cindy Baker" 
                    src="https://inversionesdiomardisas.vercel.app/assets/images/avatars/avatar_default.jpg"
                />
            </IconButton> 

            <Popover
            open={Boolean(open)}
            anchorEl={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
            sx: {
                p: 0,
                mt: 1.5,
                ml: 0.75,
                width: 180,
                overflow:'inherit',
                backdropFilter:'blur(20px)',
                backgroundColor:'rgba(255, 255, 255, 0.75)',
                '& .MuiMenuItem-root': {
                typography: 'body2',
                borderRadius: 0.75,
                },
            },
            }}
            >
            <Typography variant='span' 
                sx={{
                    width:14,
                    height:14,
                    position:'absolute',
                    backdropFilter:'blur(20px)',
                    backgroundColor:'rgba(255, 255, 255, 0.75)',
                    clipPath:'polygon(0% 0%, 100% 100%, 0% 100%)',
                    border:'1px solid rgba(145, 158, 171, 0.12)',
                    top:-6.5,
                    transform:'rotate(135deg)',
                    right:20,
                }}
            />
            <Box sx={{ my: 1.5, px: 2.5 , }} >

          <Typography variant="subtitle2" noWrap>
            name
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            example@gmail.com
          </Typography>
        </Box>
        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>{
            menuItems?.map(({name , route})=>(
                <Link key={name} href={route}>
                <MenuItem  onClick={handleClose} >
                    <Typography variant='span'> {name}</Typography>
                </MenuItem>
            </Link>
          ))
          }
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={onLogout} sx={{ m: 1}} >
        <Typography variant='span'  sx={{  color:'red', fontWeight:500}}>
        Cerrar sesión
        </Typography>
     
        </MenuItem>
            </Popover>
        </>
    );
}

export default Account;