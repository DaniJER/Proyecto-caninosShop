'use client';

import PropTypes from 'prop-types';

import styled from '@emotion/styled';
import { alpha, IconButton, InputAdornment, OutlinedInput, Stack, Toolbar, Tooltip } from '@mui/material';
import React from 'react'
import { CiSearch } from 'react-icons/ci';
import { FaFilter } from 'react-icons/fa6';
import { IoCloudDownload } from 'react-icons/io5';


const StyledRoot = styled(Toolbar)(({ theme }) => ({
    height: 96,
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing(0, 1, 0, 3),
  }));
  
  const StyledSearch = styled(OutlinedInput)(({ theme }) => ({
    width: 240,
    transition: theme.transitions.create(['box-shadow', 'width'], {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter,
    }),
    '&.Mui-focused': {
      width: 320,
      boxShadow: theme.customShadows.z8,
    },
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
    },
  }));



export const PetsListToolbar = ({filterName, onFilterName}) => {
  return (
    <StyledRoot
  >
      <StyledSearch
        value={filterName}
        onChange={onFilterName}
        placeholder="Buscar mascota..."
        startAdornment={
          <InputAdornment position="start">
            <CiSearch size={20} />
          </InputAdornment>
        }
      />

      <Stack sx={{display:'flex', flexDirection:'row', gap:1}}>
        <Tooltip title="Filtro">
            <IconButton sx={{p:'10px'}}>
            <FaFilter color='black' size={18}  />
            </IconButton>
        </Tooltip>

        <Tooltip title="Exportar">
            <IconButton sx={{p:'10px'}}>
            <IoCloudDownload color='black' size={20}  />
            </IconButton>
        </Tooltip>
      </Stack>

  </StyledRoot>
  )
}


PetsListToolbar.propTypes = {
    filterName: PropTypes.string,
    onFilterName: PropTypes.func,
};