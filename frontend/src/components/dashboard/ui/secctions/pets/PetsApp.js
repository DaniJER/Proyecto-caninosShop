'use client';

import { Button, Card, Container, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link'
import React, { useState } from 'react'
import { PetsListToolbar } from './PetsListToolbar';
import ScrollBar from '../../scrollbar/ScrollBar';
import ListHead from '../ui/ListHead';

const TABLE_HEAD = [
    { id: 'pet', label: 'Mascota', alignRight: false },
    { id: 'createAt', label: 'Creado en', alignRight: false },
    { id: 'price', label: 'Precio', alignRight: false },
    { id: 'stock', label: 'Existencias', alignRight: false },
    { id: '' },
  ];

const PRODUCTS_LIST = []



export const PetsApp = () => {

    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('pet');


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
      };

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
            <PetsListToolbar/>
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
                            {/* TODO: MOSTRAR MASCOTAS */}
                        </TableBody>
                        {
                            PRODUCTS_LIST.length <= 0 && (
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
                    </Table>
                </TableContainer>
            </ScrollBar>

        </Card>
    </Container>
  )
}
