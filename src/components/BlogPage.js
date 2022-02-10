import { useParams, useNavigate, Link as ReactLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { MdThumbUpOffAlt } from 'react-icons/md';
import { likeBlog, deleteBlog } from '../reducers/blogReducer';
import Comments from './Comments';

const BlogPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const slug = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const currUser = useSelector((state) => state.currUser);
  const blog = blogs.find((blog) => blog.slug === slug);

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
  };

  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog));
    navigate('/');
  };

  if (!blog) {
    return <div>NO BLOG FOUND</div>;
  }

  return (
    <Box>
      <Flex
        justify={'space-between'}
        align={['flex-start', 'center']}
        flexDir={['column', 'row']}
      >
        <Box>
          <Heading fontSize={['xl', '2xl']}>{blog.title}</Heading>
          {blog.author && (
            <Text as={'i'} fontSize={'sm'}>
              by {blog.author}
            </Text>
          )}
        </Box>

        <Flex align={'center'} gap={2}>
          {currUser && (
            <Button
              mt={2}
              size={'sm'}
              onClick={() => handleLike(blog)}
              id="likeBtn"
            >
              <MdThumbUpOffAlt />
            </Button>
          )}
          <Text fontSize={'2xl'} fontWeight={'semibold'} id="likes">
            {blog.likes}
          </Text>
        </Flex>
      </Flex>

      <Box>
        <Link href={blog.url} isExternal>
          <Button
            size={'lg'}
            mt={4}
            w={'full'}
            colorScheme={'themeDark'}
            letterSpacing={'wider'}
          >
            GO TO BLOG
          </Button>
        </Link>
      </Box>
      <Flex my={1} fontSize={'sm'} color={'gray.500'} gap={1}>
        <Text>Posted by</Text>
        <Link as={ReactLink} to={`/users/${blog.user?.id}`}>
          {blog.user?.username}
        </Link>
      </Flex>

      <Text my={4}>{blog.description}</Text>
      <Divider my={4} />

      <Comments blog={blog} />

      <Flex alignItems={'end'} justify={'space-between'} mt={10}>
        <Box></Box>
        {currUser?.username === blog.user?.username && (
          <Popover id="deleteBtn">
            <PopoverTrigger>
              <Button colorScheme={'red'} variant={'ghost'}>
                Delete
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Confirmation!</PopoverHeader>
              <Button
                textAlign={'right'}
                w={'fit-content'}
                m={2}
                onClick={() => handleDelete(blog)}
                colorScheme={'red'}
                id="deleteBtnConfirm"
              >
                Delete blog
              </Button>
              <PopoverBody>
                Are you sure you want to delete your blog?
              </PopoverBody>
            </PopoverContent>
          </Popover>
        )}
      </Flex>
    </Box>
  );
};

export default BlogPage;
