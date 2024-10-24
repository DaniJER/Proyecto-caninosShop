import { Box } from '@mui/material';
import React, { memo } from 'react';
import PropTypes from 'prop-types';

import { StyledRootScrollbar, StyledScrollbar } from './styles';

  const ScrollBar = ({ children, sx, ...other }) => {
    
    const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent;

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }
    return (
        <StyledRootScrollbar >
            <StyledScrollbar timeout={500} clickOnTrack={false}  {...other} sx={sx}>
                {children}
            </StyledScrollbar>
        </StyledRootScrollbar>
    );
}

ScrollBar.propTypes = {
    sx: PropTypes.object,
    children: PropTypes.node,
  };

export default memo(ScrollBar);
