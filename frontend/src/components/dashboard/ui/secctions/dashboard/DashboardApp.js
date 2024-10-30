'use client'
import {Box, Container, Grid2, Paper, Typography } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid2';
import styled from '@emotion/styled';
import AppWelcome from './AppWelcome';
import AppSlider from './AppSlider';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));


export const DashboardApp = () => {

    return (
        <>
        <Container maxWidth="xl">
            <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 8 }}>
              <AppWelcome/>
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <AppSlider/>
            </Grid>
          </Grid>
          </Container>
        </>
    );
}
