import { useDispatch } from 'react-redux';
import { Box, Button, Heading } from '@chakra-ui/react';
import { loginUser } from '../reducers/currUser';

const GuestLogin = () => {
  const dispatch = useDispatch();
  const handleGuestLogin = () => {
    dispatch(
      loginUser({
        username: 'guest',
        password: 'guest',
      })
    );
  };
  return (
    <Box>
      <Heading size={'md'}>
        If you wish to browse this site without creating an account, I have
        created a public guest account you can use.
      </Heading>
      <Button
        my={4}
        w={'full'}
        size={'lg'}
        colorScheme="teal"
        type="submit"
        id="guestLoginSubmitBtn"
        onClick={handleGuestLogin}
      >
        Enter as Guest
      </Button>
    </Box>
  );
};

export default GuestLogin;
