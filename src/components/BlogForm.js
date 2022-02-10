import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { FormErrorMessage, FormControl, Input, Button } from '@chakra-ui/react';
import { createBlog } from '../reducers/blogReducer';
import Toggleable from './Toggleable';

const BlogForm = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const blogFormRef = useRef();

  const addBlog = (data) => {
    const newBlog = {
      ...data,
    };
    dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
    reset();
  };

  return (
    <Toggleable buttonLabel="Share a new blog" ref={blogFormRef}>
      <form onSubmit={handleSubmit(addBlog)}>
        <FormControl isInvalid={errors.title} mb={4}>
          <Input
            variant={'filled'}
            id="title"
            placeholder="title"
            {...register('title', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.author} mb={4}>
          <Input
            variant={'filled'}
            id="author"
            placeholder="author"
            {...register('author', {})}
          />
          <FormErrorMessage>
            {errors.author && errors.author.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.url} mb={4}>
          <Input
            variant={'filled'}
            id="url"
            placeholder="url"
            {...register('url', {
              required: 'This is required',
              minLength: { value: 4, message: 'Minimum length should be 4' },
            })}
          />
          <FormErrorMessage>
            {errors.url && errors.url.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.description} mb={4}>
          <Input
            variant={'filled'}
            id="description"
            placeholder="description"
            {...register('description', {})}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          id="submitBlogBtn"
          w={'full'}
          my={2}
          colorScheme="themeDark"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Toggleable>
  );
};

export default BlogForm;
