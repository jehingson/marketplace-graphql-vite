import { useState, useEffect } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AppShortcutOutlinedIcon from '@mui/icons-material/AppShortcutOutlined';
import AddBusinessOutlinedIcon from '@mui/icons-material/AddBusinessOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import ContactPhoneOutlinedIcon from '@mui/icons-material/ContactPhoneOutlined';
import { useLocation } from 'react-router-dom';
import CurrencyExchangeOutlinedIcon from '@mui/icons-material/CurrencyExchangeOutlined';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import useAuth from 'src/hooks/useAuth';
import { Box, List } from '@mui/material';
import NavGroup from './NavGroup';
import NavItem from './NavItem';

const SidebarItems = () => {
  const auth = useAuth();
  const { user } = auth;
  const isAdmin = user?.role === 'admin';
  const isSales = user?.role === 'sales';
  const { pathname } = useLocation();
  const [menuItem, setMenuItem] = useState<any>();

  console.log('user', user);

  useEffect(() => {
    const menuHome: any = {
      title: 'Inicio',
      items: [],
    };

    const menuAnalysis: any = {
      title: 'Análisis',
      items: [],
    };

    const menuBranchoffice: any = {
      title: 'Sucursal',
      items: [],
    };

    const menuInventory: any = {
      title: 'Inventario',
      items: [],
    };

    const menuUsers: any = {
      title: 'Usuarios',
      items: [],
    };

    const menuArray = [];

    // Home

    menuHome.items.push({
      id: 1,
      title: 'Dashboard',
      path: '/dashboard',
      icon: <DashboardOutlinedIcon />,
    });

    menuInventory.items.push({
      id: 3,
      title: 'Productos',
      path: '/products',
      icon: <InventoryOutlinedIcon />,
    });

    // Inventario
    if (isAdmin || isSales) {
      menuInventory.items.push({
        id: 2,
        title: 'Categorías',
        path: '/categories',
        icon: <CategoryOutlinedIcon />,
      });

      menuInventory.items.push({
        id: 4,
        title: 'Ventas',
        path: '/sales',
        icon: <ReceiptLongOutlinedIcon />,
      });
    }

    // Sucursales

    menuBranchoffice.items.push({
      id: 5,
      title: 'Sucursales',
      path: '/branchoffice',
      icon: <AddBusinessOutlinedIcon />,
    });

    menuBranchoffice.items.push({
      id: 6,
      title: 'Multimonedas',
      path: '/currency',
      icon: <CurrencyExchangeOutlinedIcon />,
    });

    // Usuarios
    if (isAdmin) {
      menuUsers.items.push({
        id: 7,
        title: 'Vendedores',
        path: '/vendors',
        icon: <BadgeOutlinedIcon />,
      });

      menuUsers.items.push({
        id: 8,
        title: 'Clientes',
        path: '/clients',
        icon: <AdminPanelSettingsOutlinedIcon />,
      });
    }

    if (menuHome.items.length > 0) {
      menuArray.push(menuHome);
    }

    if (menuAnalysis.items.length > 0) {
      menuArray.push(menuAnalysis);
    }

    if (menuInventory.items.length > 0) {
      menuArray.push(menuInventory);
    }

    if (menuBranchoffice.items.length > 0) {
      menuArray.push(menuBranchoffice);
    }

    if (menuUsers.items.length > 0) {
      menuArray.push(menuUsers);
    }

    setMenuItem(menuArray);
  }, [auth]);

  if (!menuItem) return <></>;

  return (
    <Box px={3}>
      <List sx={{ pt: 1 }}>
        {menuItem?.map((element: any) => {
          return (
            <Box key={element.title}>
              <NavGroup title={element.title} />
              {element.items &&
                element.items.map((item: any) => {
                  return (
                    <Box key={item.id}>
                      <NavItem {...item} pathname={pathname} />
                    </Box>
                  );
                })}
            </Box>
          );
        })}
      </List>
    </Box>
  );
};

export default SidebarItems;
