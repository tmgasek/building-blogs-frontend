import { useSelector } from 'react-redux';
import { Box, Alert, AlertIcon, AlertTitle } from '@chakra-ui/react';

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) {
    return null;
  }
  return (
    <Box my={4}>
      {notification.className === 'error' ? (
        <Box className={notification.className}>
          <Alert status="error">
            <AlertIcon />
            <AlertTitle mr={2}>{notification.message}</AlertTitle>
          </Alert>
        </Box>
      ) : (
        <Box className={notification.className}>
          <Alert status="success">
            <AlertIcon />
            <AlertTitle mr={2}>{notification.message}</AlertTitle>
          </Alert>
        </Box>
      )}
    </Box>
  );
};

export default Notification;
