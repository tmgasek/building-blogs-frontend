import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import Toggleable from './Toggleable';
import { FormErrorMessage, FormControl, Input, Button } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';

const BlogForm = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const blogFormRef = useRef();

  const addBlog = (data) => {
    console.log(data);
    const newBlog = {
      ...data,
    };
    dispatch(createBlog(newBlog));
    blogFormRef.current.toggleVisibility();
  };

  return (
    <Toggleable buttonLabel="Share a new blog" ref={blogFormRef}>
      <form onSubmit={handleSubmit(addBlog)}>
        <FormControl isInvalid={errors.title} mb={4}>
          <Input
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
          <Input id="author" placeholder="author" {...register('author', {})} />
          <FormErrorMessage>
            {errors.author && errors.author.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.url} mb={4}>
          <Input
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
            id="description"
            placeholder="description"
            {...register('description', {})}
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          w={'full'}
          mb={2}
          colorScheme="teal"
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
