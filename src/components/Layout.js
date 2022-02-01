import React from 'react';
import Navbar from './Navbar';
import { Box, Container } from '@chakra-ui/react';

const Layout = ({ children }) => {
  return (
    <Box as={'main'} pb={8}>
      <Navbar />

      <Container maxW={'container.md'} pt={14}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
