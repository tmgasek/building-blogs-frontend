import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Text,
  Divider,
  FormErrorMessage,
} from '@chakra-ui/react';
import { addComment } from '../reducers/blogReducer';

const Comments = ({ blog }) => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const handleCommentSubmit = (data) => {
    dispatch(addComment(blog.id, data.comment.trim()));
    reset();
  };

  return (
    <div>
      <Heading size={'md'} fontWeight={'semibold'} my={4}>
        {blog.comments.length} Comments
      </Heading>
      <Box>
        <form onSubmit={handleSubmit(handleCommentSubmit)}>
          <FormControl isInvalid={errors.comment} mb={2}>
            <Input
              variant={'filled'}
              id="comment"
              placeholder="comment"
              {...register('comment', {
                required: 'This is required',
                minLength: { value: 4, message: 'Minimum length should be 4' },
                pattern: { value: /.*\S.*/, message: 'Empty!' },
              })}
            />
            <FormErrorMessage>
              {errors.comment && errors.comment.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            id="submitBlogBtn"
            mb={2}
            isLoading={isSubmitting}
            type="submit"
          >
            Comment
          </Button>
        </form>

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
