'use client';

import dynamic from 'next/dynamic';
const ApexCharts = dynamic(() => import('react-apexcharts'), { ssr: false });

import { Box, ButtonBase, Card, CardHeader, MenuItem, Popover } from '@mui/material';
import React, { useState } from 'react';
import { useChart } from '../../chart';



const AppAnnualSalesTrends = ({ title, subheader, chartLabels, chartData, ...other }) => {

    const YEAR = ['2023','2024'];
    const [open, setOpen] = useState(null);
    const [selectionYear, setSetselectionYear] = useState(YEAR[1]);

    const [chartDate] = useState(chartData)


    const handleOpen = (event) => {
        setOpen(event.currentTarget);
    };

    const handleClose = () => {
        setOpen(null);
    };


    const handleYearSelect = (year) => {
        setSetselectionYear(year);
        setOpen(null);
    };

    const chartOptions = useChart({
        plotOptions: { bar: { columnWidth: '16%' } },
        fill: { type: chartDate[selectionYear]?.map((i) => i.fill)  },
        xaxis: { type:'category',  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep','Oct','Nov','Dec']},
        tooltip: {
          shared: true,
          intersect: false,
          y: {
            formatter: (y) => {
              if (typeof y !== 'undefined') {
                return `${y.toFixed(0)} ventas`;
              }
              return y;
            },
          },
        },
      });

    

    const year = (año)=>
        (   <>
                <ButtonBase
                    onClick={handleOpen}
                    type='button' 
                    sx={{

                          display:'inline-flex',
                          alignItems:'center',
                          justifyContent:'center',
                          position:'relative',
                          p:'4px',
                          borderRadius:'8px',
                          fontWeight:'600',
                          lineHeight:'1,57143',
                          fontSize:'0,875rem',
                          background:'rgb(244, 246, 248)',
                          
                          
                        }}
                        
                >{año}
                
                {/* {open ? 'up' :'down'  } */}
                
                </ButtonBase>

                <Popover
                    open={Boolean(open)}
                    anchorEl={open}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    PaperProps={{
                        sx:{
                            
                            p: 0,
                            mt: 1.5,
                            ml: 0.75,
                            width: 140,
                            backgroundColor:'rgba(255, 255, 255, 0.9)',
                            backdropFilter:'blur(20px)',
                            borderRadius:'10px'
                        }
                    }}
                >
                
                {
                    YEAR.map((year)=>(
                        <MenuItem 
                         key={year} 
                         onClick={()=>{handleYearSelect(year)}}
                         sx={{
                               margin:'6px',
                               borderRadius:'6px',
                            ...(selectionYear === year && 
                                {  
                                    color: 'rgb(0, 0, 0)',
                                    bgcolor: 'rgba(145, 158, 171, 0.14)',
                                    fontWeight: '600 !important',
                                })
                         }}
                         >
                          {year}
                        </MenuItem>
                    ))
                }
                

                </Popover>
            </>
        )

    return (
        <Card {...other} >
        <CardHeader title={title} subheader={subheader} sx={{ '& span:first-child':{fontWeight:'700' ,fontSize:'1.125rem'} ,textAlign:'left', padding:'24px 24px 0px'}} action={[year(selectionYear)]}/>
  
        <Box sx={{ p: 3, pb: 1 }} dir="ltr">
          <ApexCharts  type="line" series={chartDate[selectionYear]} options={chartOptions} height={364} />
        </Box>
      </Card>
    );
}

export default AppAnnualSalesTrends;