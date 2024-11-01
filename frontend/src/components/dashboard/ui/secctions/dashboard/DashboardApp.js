'use client'
import {Box, Container, Grid2, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid2';
import styled from '@emotion/styled';
import AppWelcome from './AppWelcome';
import AppSlider from './AppSlider';
import AppStatistics from './AppStatistics';
import AppPreferenceRace from './AppPreferenceRace';

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

  const theme = useTheme();

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

              <Grid size={{ xs: 12, md: 4 }} >
                <AppStatistics
                  title={'Total de ventas'}
                  porcentaje={'+2.6%'}
                  valores={'$10,000,000'}
                  charDate={[5,18,12,51,68,11,39,37]}
                  colorColumn={'rgb(66, 153, 225)'}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }} >
                <AppStatistics
                  title={'Total de mascotas'}
                  porcentaje={'+0.2 %'}
                  valores={'100'}
                  charDate={[5,18,12,51,68,11,39,37]}
                  colorColumn={'#00B8D9'}
                />
              </Grid>

              <Grid size={{ xs: 12, md: 4 }} >
                <AppStatistics
                  title={'Total de usuarios'}
                  porcentaje={'-0.1%'}
                  valores={'110'}
                  charDate={[5,18,12,51,68,11,39,37]}
                  colorColumn={'#FF5630'}
                />
              </Grid>

              <Grid2 size={{ xs: 12, md: 4 }}>
                <AppPreferenceRace 
                  title="Razas mas vendidas"
                  chartData={[
                    { label: 'Golden Retriever', value: 100 },
                    { label: 'Bulldog', value: 50 },
                    { label: 'Pastor aleman', value: 101 }, 
                    { label: 'Pitbull', value: 61 },  
                  ]}
                  chartColors={[
                    theme.palette.primary.main,
                    theme.palette.info.main,
                    theme.palette.warning.main,
                    theme.palette.error.main,
                  ]}

                />

              </Grid2>

            </Grid>
        </Container>
        </>
    );
}
