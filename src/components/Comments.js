import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  Divider,
} from '@chakra-ui/react';
import { addComment } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(addComment(blog.id, comment));
    setComment('');
  };

  return (
    <div>
      <Heading size={'md'} fontWeight={'semibold'} my={4}>
        {blog.comments.length} Comments
      </Heading>
      <Box>
        <FormControl>
          <FormLabel htmlFor="comment">Add comment</FormLabel>
          <Input
            id="comment"
            value={comment}
            onChange={({ target }) => setComment(target.value)}
          />
          <Button my={2} onClick={handleCommentSubmit}>
            Add
          </Button>
        </FormControl>
        <Box>
          {/* ADD A BETTER KEY HERE */}
          {blog.comments.map((comment, index) => (
            <Box key={index}>
              <Text my={2}>{comment}</Text>
              <Divider />
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Comments;
