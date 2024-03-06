import React from 'react'
import { NavLink } from 'react-router-dom';
import {
  ListItemIcon,
  ListItem,
  List,
  styled,
  ListItemText,
  useTheme
} from '@mui/material';

interface Props {
  id: string;
  title: string
  pathname: string
  path: string
  icon: React.ReactNode
}

const NavItem = ({ id, title, path, icon, pathname  }: Props) => {


  const theme = useTheme();
  // const itemIcon = <Icon stroke={1.5} size="1.3rem" />;

  // const ListItemStyled = styled(ListItem)(() => ({
  //   whiteSpace: 'nowrap',
  //   marginBottom: '2px',
  //   padding: '8px 10px',
  //   borderRadius: '8px',
  //   // backgroundColor: level > 1 ? 'transparent !important' : 'inherit',
  //   color:
  //     theme.palette.text.secondary,
  //   paddingLeft: '10px',
  //   '&:hover': {
  //     backgroundColor: theme.palette.primary.light,
  //     color: theme.palette.primary.main,
  //   },
  //   '&.Mui-selected': {
  //     color: 'white',
  //     backgroundColor: theme.palette.primary.main,
  //     '&:hover': {
  //       backgroundColor: theme.palette.primary.main,
  //       color: 'white',
  //     },
  //   },
  // }));  

  return (
    <List component="li" disablePadding key={id}>
      <ListItem
        sx={{
          whiteSpace: 'nowrap',
          marginBottom: '2px',
          padding: '8px 10px',
          borderRadius: '8px',
          color:
          theme.palette.text.secondary,
          paddingLeft: '10px',
          '&:hover': {
            backgroundColor: theme.palette.primary.light,
            color: theme.palette.primary.main,
          },
          '&.Mui-selected': {
            color: 'white',
            backgroundColor: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: 'white',
            },
          },
        }}
        component={NavLink}
        to={path}
        selected={path === pathname}
        // onClick={onClick}
      >
        <ListItemIcon
          sx={{
            minWidth: '36px',
            p: '3px 0',
            color: 'inherit',
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText>
          <>{title}</>
        </ListItemText>
      </ListItem>
    </List>
  );
}

export default NavItem