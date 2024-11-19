'use client';

import { Avatar, Button, Card, Container, IconButton, LinearProgress, Stack, Table, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip, Typography } from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link'
import React, { useState } from 'react'
import { PetsListToolbar } from './PetsListToolbar';
import ScrollBar from '../../scrollbar/ScrollBar';
import ListHead from '../ui/ListHead';
import { applySortFilter, getComparator } from '@/utils';
import { RiDeleteBin6Fill } from "react-icons/ri";
import { GrEdit } from "react-icons/gr";
import { EmptyContent } from '../ui/EmptyContent';

const TABLE_HEAD = [
    { id: 'pet', label: 'Mascota', alignRight: false },
    { id: 'createAt', label: 'Creado en', alignRight: false },
    { id: 'price', label: 'Precio', alignRight: false },
    { id: 'stock', label: 'Existencias', alignRight: false },
    { id: '' },
  ];

const PETS_LIST = [
  { id: 1, pet: 'Pastor alemán', createAt: '2022-11-15', price: '500,000', stock: 10, imageUrl:'https://images.pexels.com/photos/29443619/pexels-photo-29443619/free-photo-of-retrato-de-un-perro-pastor-aleman.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 2, pet: 'Bulldog Francés', createAt: '2023-01-10', price: '600,000', stock: 4, imageUrl:'https://images.pexels.com/photos/160846/french-bulldog-summer-smile-joy-160846.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { id: 3, pet: 'Golden Retriever', createAt: '2023-02-20', price: '550,000', stock: 3, imageUrl:'https://images.pexels.com/photos/2409503/pexels-photo-2409503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { id: 4, pet: 'Labrador', createAt: '2023-03-05', price: '480,000', stock: 6, imageUrl:'https://images.pexels.com/photos/35638/labrador-breed-dogs-animal.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { id: 5, pet: 'Beagle', createAt: '2023-04-12', price: '450,000', stock: 10, imageUrl:'https://images.pexels.com/photos/7288/animal-dog-pet-park.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { id: 6, pet: 'Shih Tzu', createAt: '2023-05-18', price: '350,000', stock: 5, imageUrl:'https://images.pexels.com/photos/130771/pexels-photo-130771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { id: 7, pet: 'Husky Siberiano', createAt: '2023-06-25', price: '700,000', stock: 0, imageUrl:'https://images.pexels.com/photos/29392780/pexels-photo-29392780/free-photo-of-retrato-de-otono-de-un-husky.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { id: 8, pet: 'Dálmata', createAt: '2023-07-30', price: '520,000', stock: 7, imageUrl:'https://images.pexels.com/photos/3763311/pexels-photo-3763311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { id: 9, pet: 'Pug', createAt: '2023-08-15', price: '400,000', stock: 8, imageUrl:'https://images.pexels.com/photos/3475680/pexels-photo-3475680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
  { id: 10, pet: 'Border Collie', createAt: '2023-09-21', price: '580,000', stock: 0, imageUrl:'https://images.pexels.com/photos/3908821/pexels-photo-3908821.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'  },
];


export const PetsApp = () => {

    const [page, setPage] = useState(0);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('pet');
    const [filterName, setFilterName] = useState('')
    const [rowsPerPage, setRowsPerPage] = useState(5);


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
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

      const filteredUsers = applySortFilter(PETS_LIST, getComparator(order, orderBy), filterName, orderBy);

      const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} mt={2}>
          <Typography variant="h4" gutterBottom>
            Mascotas
          </Typography>
          <Link href={'/dashboard/pets/new'}>
          <Button variant="contained" startIcon={<FaPlus />} sx={{background:'rgba(56, 189, 248 , 0.9)'}}>
            Nueva mascota
          </Button>
          </Link>
        </Stack>

        <Card>
            <PetsListToolbar filterName={filterName} onFilterName={handleFilterByName}/>
            <ScrollBar>
                <TableContainer sx={{ minWidth: 800 }}>
                    <Table>
                        <ListHead
                            order={order}
                            orderBy={orderBy}
                            headLabel={TABLE_HEAD}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                        {filteredUsers?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)?.map((row) => {
                            const { id, pet,createAt,price, stock , imageUrl } = row;

                            const inStock = Number(stock);

                            return (
                            <TableRow hover key={id} tabIndex={-1}  >

                                <TableCell component="th" scope="row" >
                                <Stack direction="row" alignItems="center" spacing={2}>
                                    <Avatar
                                        variant="rounded"
                                        alt="Urban Explorer Sneakers"
                                        src={imageUrl ?? `https://images.pexels.com/photos/236622/pexels-photo-236622.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1`}
                                        sx={{ width: 56, height: 56 }}
                                    />
                                    <Typography variant="subtitle2" noWrap>
                                    {pet}
                                    </Typography>
                                </Stack>
                                </TableCell>

                                <TableCell align="left">{createAt}</TableCell>

                                <TableCell align="left">${price}</TableCell>

                                <TableCell align="left">
                                    <Stack spacing={2}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={(inStock > 5 ? 100 : (inStock / 12) * 100)}
                                            color={inStock === 0 ? "error" : inStock >= 1 && inStock <= 5 ? "warning" : inStock >= 6 && "success"}
                                            sx={{ width: '100%', flexGrow: 1 , maxWidth:'80px' , borderRadius:'4px', height:'6px'}}
                                        />
                                        <Typography variant="body2" color="textSecondary">
                                        {
                                            inStock !== 0 && inStock 
                                        }
                                        {' '}
                                        {
                                        inStock === 0 ? 'agotado' :
                                        inStock >= 1 && inStock <= 5 ? 'Existencias bajas' :
                                        inStock >= 6 && 'Existencias'
                                        }   
                                        </Typography>
                                        
                                    </Stack>
                                </TableCell>

                                <TableCell align="right" >
                                <Tooltip title="Editar">
                                    <IconButton size="small" sx={{padding:'12px'}} color="inherit" >
                                    <GrEdit ize={20} />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Eliminar">
                                    <IconButton size="small" sx={{padding:'12px'}} color="inherit" >
                                    <RiDeleteBin6Fill size={20} color='red'/>
                                    </IconButton>
                                </Tooltip>
                                </TableCell>
                            </TableRow>
                            );
                        })}
                        </TableBody>
                        {
                            PETS_LIST.length <= 0 && (
                                <TableBody>
                                    <TableRow>
                                        <TableCell colSpan={6} align="center">
                                            <Typography variant="h6" color="textSecondary" noWrap p={6}>
                                                No hay mascotas registradas
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
                count={PETS_LIST.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />

        </Card>
    </Container>
  )
}
