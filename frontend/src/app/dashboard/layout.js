import theme from '@/components/dashboard/themes';import LayoutWrapper from '@/components/dashboard/ui/LayoutWrapper';
import { CssBaseline } from '@mui/material';
;
import { ThemeProvider } from '@mui/material/styles';

export const metadata = {
    title: "Dashboard",
    description: "",
  };

export default function DashboardLayout({
 children
}) {
  return (
 <ThemeProvider theme={theme}>
    <CssBaseline />
    <LayoutWrapper children={children}/>
 </ThemeProvider>
  );
}