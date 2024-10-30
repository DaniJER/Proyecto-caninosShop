import { Box, Card, Stack, Typography } from '@mui/material';
import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { IoIosTrendingDown, IoIosTrendingUp } from "react-icons/io";

const AppStatistics = ({porcentaje, title , valores, charDate, colorColumn}) => {
 
    const chartOptions = {
        chart: {
          type: 'bar',
          width: 100,
          height: 36,
          sparkline: {
            enabled: true,
          },
        },
        plotOptions: {
          bar: {
            columnWidth: '80%',
            borderRadius: 2,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 100,
                  color: colorColumn,
                },
              ],
            },
          },
        },
        labels: Array.from({ length: charDate.length }, (_, i) => i + 1),
        xaxis: {
          crosshairs: {
            width: 1,
          },
        },
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: () => '',
            },
          },
          marker: {
            show: false,
          },
        },
      };
    

    return (
        <>
            <Card sx={{
                        padding:'24px',
                        display:'flex',
                        alignItems:'center',
                        textAlign:'left',
                        boxShadow:'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
                        borderRadius:'16px'
                        
                        }} >
                <Box sx={{
                    flexGrow:'1',
                }}>
                    <Typography component={'h6'} variant='subtitle2' 
                        sx={{
                            fontWeight:'700',
                        }}
                    >
                    {title}
                    </Typography>
                    

                    <Typography component={'h3'} variant='h3' sx={{
                        fontWeight:'700',
                        fontSize:'1.5rem',
                        marginTop:'10px',
                        marginBottom:'10px'
                    }}>
                    {valores}
                    </Typography>

                    <Stack sx={{
                        display:'flex',
                        flexDirection:'row',
                        alignItems: 'center',
                        gap: '5px'
                    }}>
                    { parseFloat(porcentaje) > 0.0 ? <IoIosTrendingUp size={24} color='green'/> : <IoIosTrendingDown size={24} color='red' />}

                    <Typography component={'div'} variant='subtitle2' sx={{
                        fontWeight:'600',
                    }}>
                    {porcentaje}
                    </Typography>
                    <Typography component={'span'} variant='font' sx={{color:'#637381', fontWeight:'500'}}>
                        últimos 7 días
                    </Typography> 
                        
                    </Stack>

                </Box>

                <Box dir="ltr">
                    <ReactApexChart options={chartOptions} series={[{ data: charDate }]} type="bar" height={36} width={60} />
                </Box>

            </Card>
        </>
    );
}

export default AppStatistics;
