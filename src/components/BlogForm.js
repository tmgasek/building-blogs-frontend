import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogReducer';
import Toggleable from './Toggleable';
import { Button, FormControl, FormLabel, Input } from '@chakra-ui/react';

const BlogForm = () => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const blogFormRef = useRef();

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();

    if (!newTitle || !newUrl) {
      return;
    }

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      description: newDescription,
    };

    dispatch(createBlog(newBlog));

    setNewAuthor('');
    setNewTitle('');
    setNewUrl('');
    setNewDescription('');

    blogFormRef.current.toggleVisibility();
  };

  return (
    <Toggleable buttonLabel="Add new blog" ref={blogFormRef}>
      <FormControl>
        <FormLabel my={2} htmlFor="">
          Title
        </FormLabel>
        <Input
          type={'text'}
          id="Title"
          placeholder="Title"
          value={newTitle}
          onChange={({ target }) => setNewTitle(target.value)}
        />

        <FormLabel my={2} htmlFor="author">
          Author
        </FormLabel>
        <Input
          type={'author'}
          id="author"
          placeholder="Author"
          value={newAuthor}
          onChange={({ target }) => setNewAuthor(target.value)}
        />

        <FormLabel my={2} htmlFor="url">
          URL
        </FormLabel>
        <Input
          type={'url'}
          id="url"
          placeholder="URL"
          value={newUrl}
          onChange={({ target }) => setNewUrl(target.value)}
        />

        <FormLabel my={2} htmlFor="description">
          Description
        </FormLabel>
        <Input
          type={'description'}
          id="description"
          placeholder="Description"
          value={newDescription}
          onChange={({ target }) => setNewDescription(target.value)}
        />

        <Button mt={8} mb={2} onClick={(e) => addBlog(e)}>
          Add new blog
        </Button>
      </FormControl>
    </Toggleable>
  );
};

export default BlogForm;
