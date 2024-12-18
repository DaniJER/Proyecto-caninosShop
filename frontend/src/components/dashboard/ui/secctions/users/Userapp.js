'use client';

import { Avatar, Box, Card, Container, IconButton, MenuItem, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserListToolbar from './UserListToolbar';
import ScrollBar from '../../scrollbar/ScrollBar';
import Label from '../../label';
import { sentenceCase } from 'change-case';
import { SlOptionsVertical } from "react-icons/sl";
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ListHead from '../ui/ListHead';
import { applySortFilter, getComparator } from '@/utils';
import { EmptyContent } from '../ui/EmptyContent';
import { DeleteDialog } from '../ui/DeleteDialog';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
    { id: 'name', label: 'Nombre', alignRight: false },
    { id: 'email', label: 'Correo', alignRight: false },
    { id: 'role', label: 'Role', alignRight: false },
    { id: 'status', label: 'Estado', alignRight: false },
    { id: '' },
  ];

  const USERLIST = [
    { id: 1, name: 'Juan Pérez', email: 'juan.perez@gmail.com', role: 'administrador', status: 'activo' },
    { id: 2, name: 'María Gómez', email: 'maria.gomez@gmail.com', role: 'asesor de ventas', status: 'activo' },
    { id: 3, name: 'Pedro Martínez', email: 'pedro.martinez@gmail.com', role: 'cliente', status: 'inactivo' },
    { id: 4, name: 'Ana Rodríguez', email: 'ana.rodriguez@gmail.com', role: 'administrador', status: 'activo' },
    { id: 5, name: 'Luis Fernández', email: 'luis.fernandez@gmail.com', role: 'cliente', status: 'activo' },
    { id: 6, name: 'Sofía Ramírez', email: 'sofia.ramirez@gmail.com', role: 'asesor de ventas', status: 'inactivo' },
    { id: 7, name: 'Carlos Sánchez', email: 'carlos.sanchez@gmail.com', role: 'administrador', status: 'activo' },
    { id: 8, name: 'Laura Torres', email: 'laura.torres@gmail.com', role: 'cliente', status: 'activo' },
    { id: 9, name: 'David Morales', email: 'david.morales@gmail.com', role: 'asesor de ventas', status: 'activo' },
    { id: 10, name: 'Elena Gutiérrez', email: 'elena.gutierrez@gmail.com', role: 'administrador', status: 'inactivo' },

  ];

// ----------------------------------------------------------------------


export const Userapp = () => {

  const [open, setOpen] = useState(null);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [selectedUserId, setSelectedUserId] = useState(null);

  const router = useRouter();

  const handleOpenMenu = (event, userId) => {
    setOpen(event.currentTarget);
    setSelectedUserId(userId);
  };

  const handleCloseMenu = () => {
    setOpen(null);
  };

  const handleEdit = () => {
    router.push(`/dashboard/users/edit/${selectedUserId}`); 
    handleCloseMenu();
  };

  const handleDelete = () => {
    handleCloseMenu();
    setOpenDeleteDialog(true)
  }

  const handleConfirmDelete = () => {
    // todo: Lógica para eliminar el usuario
    console.log('Delete user', selectedUserId);
    setOpenDeleteDialog(false);
    handleCloseMenu();
    toast.success(`Usuario eliminado`)
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false); 
    handleCloseMenu();
  }
  
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName, orderBy);

  const isNotFound = !filteredUsers.length && !!filterName;


  return (
    <>
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} mt={2}>
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>
        </Stack>

        <Card>
        
            <UserListToolbar filterName={filterName} onFilterName={handleFilterByName} />

            <ScrollBar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                    <ListHead
                    order={order}
                    orderBy={orderBy}
                    headLabel={TABLE_HEAD}
                    rowCount={USERLIST.length}
                    numSelected={selected.length}
                    onRequestSort={handleRequestSort}
                    onSelectAllClick={handleSelectAllClick}
                    />

                <TableBody>
                  {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                    const { id, name, role, status, email, avatarUrl } = row;
                    const selectedUser = selected.indexOf(name) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>

                        <TableCell component="th" scope="row" >
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Avatar alt={name} src={avatarUrl ?? `https://inversionesdiomardisas.vercel.app/assets/images/avatars/avatar_${id}.jpg`} />
                            <Typography variant="subtitle2" noWrap>
                              {name}
                            </Typography>
                          </Stack>
                        </TableCell>

                        <TableCell align="left">{email}</TableCell>

                        <TableCell align="left">{role}</TableCell>

                        <TableCell align="left">
                          <Label color={(status === 'inactivo' && 'error') || 'success'}>{sentenceCase(status)}</Label>
                        </TableCell>

                        <TableCell align="right">
                          <IconButton size="small" sx={{padding:'12px'}} color="inherit" onClick={ (event) => handleOpenMenu(event, id)}>
                          <SlOptionsVertical />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
                {
                    USERLIST.length <= 0 && (
                        <TableBody>
                            <TableRow>
                                <TableCell colSpan={6} align="center">
                                    <Typography variant="h6" color="textSecondary" noWrap>
                                        No hay usuarios registrados
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    ) 
                }
                {
                    isNotFound && (
                        <EmptyContent filterName={filterName} colSpan={6}/>
                    )
                }

                    </Table>   
                </TableContainer>
            </ScrollBar>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={USERLIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />  
        </Card>

    </Container>

    <Options open={open} handleCloseMenu={handleCloseMenu} handleEdit={handleEdit} handleDelete={handleDelete}/>

    <DeleteDialog
        open={openDeleteDialog}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        subtitle='¿Estás seguro que deseas eliminar este usuario?'
        
    />

    </> 
  )
}


const Options = ({open, handleCloseMenu, handleEdit, handleDelete })=>{
    return (
        <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleCloseMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 1,
            width: 140,
            '& .MuiMenuItem-root': {
              px: 1,
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <MenuItem onClick={handleEdit}>
          Editar
        </MenuItem>

        <MenuItem sx={{ color: 'error.main' }} onClick={handleDelete}>
          Eliminar
        </MenuItem>
      </Popover>
  )
}

