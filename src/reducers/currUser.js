import loginService from '../services/login';
import userService from '../services/users';
import storage from '../utils/storage';
import { setNotification } from './notificationReducer';

const currUserReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOAD':
      return action.data;
    case 'LOGIN':
      return action.data;
    case 'REGISTER':
      return null;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export const loadUser = () => {
  const user = storage.loadUser();
  return {
    type: 'LOAD',
    data: user,
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
      });
      dispatch(
        setNotification(
          'success',
          `${user.username} registered in successfully`,
          3000
        )
      );
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification('error', 'wrong username / password', 3000));
    }
  };
};

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      storage.saveUser(user);
      dispatch({
        type: 'LOGIN',
        data: user,
      });
      dispatch(
        setNotification(
          'success',
          `${user.username} logged in successfully`,
          3000
        )
      );
    } catch (exception) {
      console.log(exception);
      dispatch(setNotification('error', 'wrong username / password', 3000));
    }
  };
};

export const logoutUser = () => {
  return async (dispatch) => {
    storage.logoutUser();
    dispatch({
      type: 'LOGOUT',
    });
    dispatch(setNotification('success', 'logged out successfully', 3000));
  };
};
export default currUserReducer;
