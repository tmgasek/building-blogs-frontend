import React from 'react';
import { useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';

import { Box, Flex, Heading, Link, Text, Divider } from '@chakra-ui/react';

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);

  console.log(blogs);

  return (
    <Box>
      <Heading my={4} fontSize={['xl', '3xl']} letterSpacing={'wide'}>
        Popular Blogs
      </Heading>
      <Box id="BlogListContainer">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Box key={blog.id}>
              <Flex justify={'space-between'} align={'center'} mt={2}>
                <Link as={ReactLink} to={`/blogs/${blog.slug}`} noOfLines={2}>
                  <Text fontSize={['sm', 'xl']} id="blogLink">
                    {blog.title}
                  </Text>
                </Link>
                <Text fontSize={['sm', 'xl']} ml={2}>
                  {blog.user?.name}
                </Text>
              </Flex>

              <Divider />
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Blogs;
