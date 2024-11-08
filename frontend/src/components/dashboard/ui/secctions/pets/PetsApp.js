import { Button, Card, Container, Stack, Typography } from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import Link from 'next/link'
import React from 'react'
import { PetsListToolbar } from './PetsListToolbar';



export const PetsApp = () => {
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
        </Card>
    </Container>
  )
}
