'use client'
import {Box, Container, Grid2, Paper, Typography, useTheme } from '@mui/material';
import React from 'react';
import Grid from '@mui/material/Grid2';
import styled from '@emotion/styled';
import AppWelcome from './AppWelcome';
import AppSlider from './AppSlider';
import AppStatistics from './AppStatistics';
import AppPreferenceRace from './AppPreferenceRace';
import AppAnnualSalesTrends from './AppAnnualSalesTrends';

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

              <Grid size={{ xs: 12, md: 8 }}>
                  <AppAnnualSalesTrends
                    title="Ventas de Caninos"
                    subheader="Crecimiento comparado con el año anterior"
                    chartLabels={[
                      '01/01/2023',
                      '02/01/2023',
                      '03/01/2023',
                      '04/01/2023',
                      '05/01/2023',
                      '06/01/2023',
                      '07/01/2023',
                      '08/01/2023',
                      '09/01/2023',
                      '10/01/2023',
                      '11/01/2023',
                      '12/01/2023',
                    ]}
                    chartData={{
                      '2023': [
                        {
                          name: '2023',
                          type: 'line',
                          fill: 'solid',
                          data: [10, 41, 35, 40, 49, 62, 69, 91, 148, 35, 51, 49],
                        },
                        {
                          name: '2024',
                          type: 'line',
                          fill: 'solid',
                          data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                        },
                      ],
                      '2024': [
                        {
                          name: '2023',
                          type: 'line',
                          fill: 'solid',
                          data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62],
                        },
                        {
                          name: '2024',
                          type: 'line',
                          fill: 'solid',
                          data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 82 ],
                        },
                      ],
                    }}

                  />
              </Grid>

            </Grid>
        </Container>
        </>
    );
}
