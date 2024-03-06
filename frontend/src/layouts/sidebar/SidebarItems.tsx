import { useState, useEffect } from 'react';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';
import AdminPanelSettingsOutlinedIcon from '@mui/icons-material/AdminPanelSettingsOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';
import StorefrontOutlinedIcon from '@mui/icons-material/StorefrontOutlined';
import { useLocation } from 'react-router-dom';
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

  useEffect(() => {
    const menuHome: any = {
      title: 'Inicio',
      items: [],
    };

    const menuShopping: any = {
      title: "Compras",
      items: []
    }
    
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
      title: 'Tienda',
      path: '/',
      icon: <StorefrontOutlinedIcon />,
    });

    menuShopping.items.push({
      id: 11,
      title: 'Compras',
      path: '/orders',
      icon: <InventoryOutlinedIcon />
    })

    if (isAdmin) {
      menuHome.items.push({
        id: 2,
        title: 'Dashboard',
        path: '/dashboard',
        icon: <DashboardOutlinedIcon />,
      });
    }

    // Inventario
    menuInventory.items.push({
      id: 3,
      title: 'Productos',
      path: '/products',
      icon: <InventoryOutlinedIcon />,
    });

    if (isAdmin || isSales) {
      menuInventory.items.push({
        id: 4,
        title: 'Categorías',
        path: '/categories',
        icon: <CategoryOutlinedIcon />,
      });

      menuInventory.items.push({
        id: 5,
        title: 'Ventas',
        path: '/sales',
        icon: <ReceiptLongOutlinedIcon />,
      });
    }

    // Usuarios
    if (isAdmin) {
      menuUsers.items.push({
        id: 6,
        title: 'Usuarios',
        path: '/users',
        icon: <AdminPanelSettingsOutlinedIcon />,
      });
    }

    if (menuHome.items.length > 0) {
      menuArray.push(menuHome);
    }

    if (menuShopping.items.length > 0) {
      menuArray.push(menuShopping)
    }

    if (menuInventory.items.length > 0) {
      menuArray.push(menuInventory);
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
