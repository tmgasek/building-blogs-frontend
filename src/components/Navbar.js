import { Box, Button, Flex, Heading, Link, Text } from '@chakra-ui/react';
import React from 'react';

import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/currUser';

const Navbar = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.currUser);
  const navigate = useNavigate();

  const logOut = () => {
    dispatch(logoutUser());
    navigate('/');
    console.log('logged out');
  };

  return (
    <Flex as="nav" justify={'space-between'} align={'center'} m={4}>
      <Box>
        <Heading size={'sm'}>[dev-blogs]</Heading>
      </Box>
      <Flex gap={4} align={'center'}>
        <Link as={ReactLink} to="/">
          Home
        </Link>
        {currUser && (
          <Link as={ReactLink} to="/users ">
            Users
          </Link>
        )}
        {currUser && <Button onClick={logOut}>Log Out</Button>}
      </Flex>
    </Flex>
  );
};

export default Navbar;
