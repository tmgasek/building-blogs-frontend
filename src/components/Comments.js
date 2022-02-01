import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
} from '@chakra-ui/react';
import { addComment } from '../reducers/blogReducer';
import { useDispatch } from 'react-redux';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState('');

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    dispatch(addComment(blog.id, comment));
  };

  return (
    <div>
      <Heading size={'lg'} fontWeight={'semibold'} my={4}>
        Comments
      </Heading>
      <Box mt={6}>
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
          {blog.comments.map((comment) => (
            <Box key={comment}>
              <Text>{comment}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </div>
  );
};

export default Comments;
