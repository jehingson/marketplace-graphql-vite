import { ListSubheader } from '@mui/material';

interface Props {
  title: any;
}

const NavGroup = ({ title }: Props) => {

  return (
    <ListSubheader 
      component="div" 
      disableSticky
      sx={{
        marginTop: 1,
        marginBottom: 0,
        color: "textPrimary",
        lineHeight: '26px',
        padding: '3px 12px',
        fontWeight: '700',
      }}
    >
      { title }
    </ListSubheader>
  )
}

export default NavGroup