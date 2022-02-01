import React from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { Heading } from '@chakra-ui/react';
import { Link, Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

const Users = () => {
  const currUser = useSelector((state) => state.currUser);
  const users = useSelector((state) => state.users);

  if (!currUser) {
    return <Heading>You must be logged in to see the users.</Heading>;
  }

  if (!users) {
    return <div>LOADING</div>;
  }

  return (
    <Table variant={'simple'} colorScheme={'teal'} size={'sm'}>
      <Thead>
        <Tr>
          <Th>Username</Th>
          <Th>Blogs posted</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users
          .sort((a, b) => b.blogs.length - a.blogs.length)
          .map((user) => (
            <Tr key={user.username}>
              <Td>
                <Link as={ReactLink} to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </Td>
              <Td>{user.blogs.length}</Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

export default Users;
