// @mui
import { styled } from '@mui/material/styles';
import { ListItemIcon, ListItemButton } from '@mui/material';

// ----------------------------------------------------------------------

export const StyledNavItem = styled((props) => <ListItemButton disableGutters {...props} />)(({ theme }) => ({
  height: 48,
  position: 'relative',
  textTransform: 'capitalize',
  fontSize:14,
  borderRadius:10
}));

export const StyledNavItemIcon = styled(ListItemIcon)({
  width: 22,
  height: 22,
  color: 'inherit',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});