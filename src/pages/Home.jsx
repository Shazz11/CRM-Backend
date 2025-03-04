import * as React from 'react';
import { useEffect, useState } from 'react';
import { extendTheme } from '@mui/material/styles';
import { AppProvider } from '@toolpad/core/AppProvider';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import { useNavigate, Outlet } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import DescriptionIcon from '@mui/icons-material/Description';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../components/Logo';

// Sidebar navigation items
const NAVIGATION = [
  { kind: 'header', title: 'Analytics' },
  { segment: 'dashboard', title: 'Dashboard', icon: <DashboardIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Records' },
  { segment: 'billing', title: 'Billing', icon: <PointOfSaleIcon /> },
  { segment: 'invoices', title: 'Invoices', icon: <DescriptionIcon /> },
  { segment: 'customers', title: 'Customers', icon: <PeopleAltIcon /> },
  { kind: 'divider' },
  { kind: 'header', title: 'Personal' },
  { segment: 'settings', title: 'Settings', icon: <SettingsIcon /> },
  { segment: 'logout', title: 'Logout', icon: <LogoutIcon /> },
];

// Theme configuration
const demoTheme = extendTheme({
  colorSchemes: { light: true, dark: true },
  colorSchemeSelector: 'class',
  breakpoints: { values: { xs: 0, sm: 600, md: 600, lg: 1200, xl: 1536 } },
});

export default function DashboardLayoutBasic() {
  const navigate = useNavigate(); // Hook to handle navigation

  // Custom router for Toolpad's AppProvider
  const router = {
    pathname: window?.location.pathname || '/dashboard',
    navigate: (path) => navigate(path),
  };


  return (
    <AppProvider navigation={NAVIGATION} router={router} theme={demoTheme} branding={{logo: <Logo/>, title: '', homeUrl:'/dashboard'}} >
      <DashboardLayout> 
        <PageContainer>
          <Outlet /> {/* This will render the respective page content */}
        </PageContainer>
      </DashboardLayout>
    </AppProvider>
  );
}
