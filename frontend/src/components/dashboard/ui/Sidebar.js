'use client'
import { Box, Drawer } from '@mui/material'
import React from 'react'

const Sidebar = () => {

  return (
    <Box
        component={'nav'}
        sx={{
                flexShrink: { lg: 0 },
                width: { lg:  300 },
            }}
        >
                <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: 300,
              bgcolor: 'background.default',
              borderRightStyle: 'double',
            },
          }}
        >
          <div className='h-screen flex justify-center items-center'>
            sidebar
          </div>
        </Drawer>
    </Box>
  )
}

export default Sidebar
