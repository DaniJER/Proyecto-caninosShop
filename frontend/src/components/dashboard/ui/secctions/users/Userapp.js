import { Button, Card, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { FaPlus } from "react-icons/fa6";
import UserListToolbar from './UserListToolbar';

export const Userapp = () => {
  return (
    <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={4} mt={2}>
          <Typography variant="h4" gutterBottom>
            Usuarios
          </Typography>
        </Stack>

        <Card>
            <UserListToolbar/>
        </Card>

    </Container>
  )
}
