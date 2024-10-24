import { Box, List, ListItemText } from '@mui/material';
import React from 'react';
import NavItem from './NavItem';

const NavSetion = ({data=[], ...other}) => {
    return (
        <Box {...other}>
      <List disablePadding sx={{ p: 1 }}>
        {data.map((item) => (
          <NavItem key={item.title} item={item} draweWidth={other.draweWidth} />
        ))}
      </List>
    </Box>
    );
}

export default NavSetion;
