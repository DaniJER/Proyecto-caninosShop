import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import React from 'react'

export const UserDeleteDialog = ({ open, onCancel, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onCancel}
      aria-labelledby="delete-user-dialog-title"
      aria-describedby="delete-user-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
            backgroundColor: '#FFFFFF',
            borderRadius:'16px'
        }
      }}
    >
      <DialogTitle id="delete-user-dialog-title" sx={{padding:'24px 24px 16px'}}>
        Eliminar
      </DialogTitle>
      <DialogContent sx={{padding:'0px 24px'}}>
        <DialogContentText id="delete-user-dialog-description" color='#1C252E' component='font' sx={{
            fontSize:'0.875rem',
            color:'#1C252E',
            fontWeight:'500',
        }}>
        ¿Estás seguro que deseas eliminar este usuario?
        </DialogContentText>
      </DialogContent>
      <DialogActions sx={{
        padding:'24px'
      }}>
        <Button onClick={onConfirm} color="error" autoFocus sx={{
            backgroundColor: '#FF5630',
            color: '#FFFFFF',
            padding:'6px 12px;',
            '&:hover':{
                backgroundColor:'#B71D18',
                boxShadow:'rgba(255, 86, 48, 0.24) 0px 8px 16px'
            }
        }}>
          Eliminar
        </Button>
        <Button onClick={onCancel} color="primary" sx={{
            border:'1px solid gainsboro',
            color: '#000000',
            marginLeft: '12px',
            padding: '5px 12px',
            '&:hover':{
                backgroundColor:'rgba(145 158 171 / 0.08)',
            }

        }}>
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  )
}
