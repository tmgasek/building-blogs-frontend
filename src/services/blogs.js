import axios from 'axios';
const baseUrl = 'http://localhost:3001/api/blogs';

const getAll = () => {
  const req = axios.get(baseUrl);
  return req.then((res) => res.data);
};

const exports = {
  getAll,
};

export default exports;
