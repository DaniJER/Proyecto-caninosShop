import { Box, Paper, Stack, TableBody, TableCell, TableRow, Typography } from '@mui/material'
import React from 'react'

export const EmptyContent = ({filterName , colSpan }) => {
  return (
    <TableBody>
        <TableRow>
            <TableCell align="center" colSpan={colSpan} sx={{ py: 3 }}>
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
  )
}
