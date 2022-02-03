import {
  Box,
  Button,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { BsMoon, BsSun } from 'react-icons/bs';
import { MdOutlineMenu } from 'react-icons/md';
import { Link as ReactLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../reducers/currUser';

const Navbar = () => {
  const dispatch = useDispatch();
  const currUser = useSelector((state) => state.currUser);
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  const logOut = () => {
    dispatch(logoutUser());
    navigate('/');
    console.log('logged out');
  };

  return (
    <Box as="nav" pb={6}>
      <Flex justify={'space-between'} align={'center'} my={4}>
        <Flex justify={'center'} align={'center'}>
          <Heading size={'sm'}>[dev-blogs]</Heading>

          <Button
            mx={2}
            size={'xs'}
            onClick={toggleColorMode}
            display={{ base: 'none', sm: 'inline-block' }}
            _hover={{
              background: colorMode === 'light' ? 'yellow.500' : 'gray.500',
            }}
            color={colorMode === 'light' ? 'white' : 'black'}
            bg={colorMode === 'light' ? 'gray.500' : 'yellow.500'}
          >
            {colorMode === 'light' ? <BsMoon /> : <BsSun />}
          </Button>
        </Flex>

        <Flex gap={4} align={'center'} display={{ base: 'none', sm: 'flex' }}>
          <Link as={ReactLink} to="/">
            Home
          </Link>
          {currUser && (
            <Link as={ReactLink} to="/users ">
              Users
            </Link>
          )}

          {currUser && (
            <Button
              size={'sm'}
              id="logOutBtn"
              onClick={logOut}
              _hover={{ background: 'red.500' }}
              borderRadius={'lg'}
              w={'fit-content'}
            >
              Log Out
            </Button>
          )}
        </Flex>

        <Box display={{ base: 'inline-block', sm: 'none' }}>
          <Menu>
            <MenuButton
              as={IconButton}
              icon={<MdOutlineMenu size={25} />}
              variant="outline"
              aria-label="Options"
            />
            <MenuList>
              <Link as={ReactLink} to="/">
                <MenuItem>Home</MenuItem>
              </Link>
              {currUser && (
                <Link as={ReactLink} to="/users ">
                  <MenuItem>Users</MenuItem>
                </Link>
              )}
              <Text onClick={toggleColorMode}>
                <MenuItem>
                  {colorMode === 'light' ? <BsMoon /> : <BsSun />}
                </MenuItem>
              </Text>
              {currUser && (
                <Box
                  id="logOutBtn"
                  onClick={logOut}
                  bg={'red.600'}
                  borderRadius={'lg'}
                  m={2}
                  mt={6}
                  w={'fit-content'}
                >
                  <MenuItem>Log Out</MenuItem>
                </Box>
              )}
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

export default Navbar;
