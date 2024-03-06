import { Box, Container} from "@mui/material";
import useAuth from "src/hooks/useAuth";
import RoleSales from "../roleSales";


export default function Products() {
  const { user } = useAuth()
  const role = user?.role ?? ''


  if(role !== 'admin' && role !== 'sales') {
    return (<RoleSales />)
  } 

  return (
    <Box>
     <Container >

     </Container>
    </Box>
  );
}
