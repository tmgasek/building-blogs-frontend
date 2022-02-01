import userService from '../services/users';
import { setNotification } from './notificationReducer';

const userReducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT_USERS':
      return action.data;
    case 'ADD_BLOG_TO_USER':
      return state.map((user) =>
        user.id === action.data.user.id
          ? { ...user, blogs: [...user.blogs, action.data] }
          : user
      );
    case 'REMOVE_BLOG_FROM_USER':
      return state.map((user) =>
        user.id === action.data.user.id
          ? {
              ...user,
              blogs: user.blogs.filter((blog) => blog.id !== action.data.id),
            }
          : user
      );
    case 'REGISTER':
      return [...state, action.data];
    default:
      return state;
  }
};

export const initUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();
    dispatch({
      type: 'INIT_USERS',
      data: users,
    });
  };
};

export const registerUser = ({ username, name, password }) => {
  return async (dispatch) => {
    try {
      const user = await userService.register({
        username,
        name,
        password,
      });

      dispatch({
        type: 'REGISTER',
        data: user,
      });

      dispatch(
        setNotification(
          'success',
          `${user.username} registered in successfully`,
          3000
        )
      );
    } catch (exception) {
      console.log(exception.response.data.error);
      dispatch(
        setNotification(
          'error',
          `${
            exception.response.data.error || 'There was a problem signing up.'
          }`,
          3000
        )
      );
    }
  };
};

export const addBlogToUser = (blog) => {
  console.log(blog);
  return {
    type: 'ADD_BLOG_TO_USER',
    data: blog,
  };
};

export const removeBlogFromUser = (blog) => {
  return {
    type: 'REMOVE_BLOG_FROM_USER',
    data: blog,
  };
};

export default userReducer;
