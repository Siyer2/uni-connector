import axios from 'axios';

export default axios.create({
  baseURL:
    process.env.REACT_APP_DEPLOYMENT === 'local'
      ? 'http://localhost:3000'
      : 'https://7jc6jqtf51.execute-api.ap-southeast-2.amazonaws.com',
  headers: {
    'Content-type': 'application/json',
  },
});
