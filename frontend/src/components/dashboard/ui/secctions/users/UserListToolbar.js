'use client'
import PropTypes from 'prop-types';
// @mui

import { Toolbar, Tooltip, IconButton, Typography, OutlinedInput, InputAdornment, styled, alpha } from '@mui/material';
import { FaUserPlus } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import Link from 'next/link';

// component

// ----------------------------------------------------------------------

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

// ----------------------------------------------------------------------

UserListToolbar.propTypes = {
  numSelected: PropTypes.number,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
};

export default function UserListToolbar({ filterName, onFilterName }) {
  return (
    <StyledRoot
    >
        <StyledSearch
          value={filterName}
          onChange={onFilterName}
          placeholder="Buscar usuario..."
          startAdornment={
            <InputAdornment position="start">
              <CiSearch size={20} />
            </InputAdornment>
          }
        />

        <Tooltip title="Nuevo Usuario">
           <Link href={'/dashboard/users/new'}>
            <IconButton>
                <FaUserPlus color='gray' />
            </IconButton>
          </Link>
        </Tooltip>
    </StyledRoot>
  );
}