import { Box, Container } from '@chakra-ui/react';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <Box as={'main'} pb={8}>
      <Container maxW={'container.md'}>
        <Navbar />
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
