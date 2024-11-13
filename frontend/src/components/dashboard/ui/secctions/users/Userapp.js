'use client';

import { Avatar, Box, Card, Container, IconButton, MenuItem, Paper, Popover, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Typography } from '@mui/material'
import React, { useState } from 'react'
import UserListToolbar from './UserListToolbar';
import ScrollBar from '../../scrollbar/ScrollBar';
import UserListHead from './UserListHead';
import Label from '../../label';
import { sentenceCase } from 'change-case';
import { SlOptionsVertical } from "react-icons/sl";
import { filter } from 'lodash';
import { useRouter } from 'next/navigation';
import { UserDeleteDialog } from './UserDeleteDialog';

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

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  function applySortFilter(array, comparator, query) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    if (query) {
      return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
    return stabilizedThis.map((el) => el[0]);
  }
  
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
    // Lógica para eliminar el usuario
    console.log('Delete user', selectedUserId);
    setOpenDeleteDialog(false);
    handleCloseMenu();
  };

  const handleCancelDelete = () => {
    setOpenDeleteDialog(false); // Cierra el cuadro de diálogo
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

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
            <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />
            <ScrollBar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                    <UserListHead
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
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                            background: 'rgba(145, 158, 171, 0.1)',
                            padding: '12px'
                          }}
                        >
                          <Stack sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',

                          }}>
                            <Box
                                component="img"
                                alt="contenido vacío"
                                src="/images/ic-content.svg"
                                width={160}
                                height={160}
                            />
                            <Typography variant="body2">
                            No se han encontrado resultados para &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> Intente comprobar si hay errores tipográficos o usar palabras completas.
                          </Typography> 
                            </Stack>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}

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

    <UserDeleteDialog
        open={openDeleteDialog}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
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
    )}
