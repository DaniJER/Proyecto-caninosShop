import Link from 'next/link';
import React from 'react'
import { StyledNavItem, StyledNavItemIcon } from './styles';
import { ListItemText } from '@mui/material';
import { usePathname } from 'next/navigation';

const NavItem = ({ item, draweWidth}) => {
    
    const { title, path, icon, info } = item;

    const pathname = usePathname();

    return (
      <StyledNavItem
        component={Link}
        href={path}
        sx={{ 
          ...( path === pathname && {
            color: 'rgb(7, 141, 238)',
            bgcolor: 'action.selected',
            fontWeight: 'fontWeightBold',
          }),
          ...(draweWidth === 88 && {
              display:'flex',
              flexDirection:'column',
              fontSize:'10px',
              mb:1
          })
          
          ,
        }}
      >
        <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
  
        <ListItemText disableTypography primary={title} />
  
        {info && info}
      </StyledNavItem>
    );
}

export default NavItem
