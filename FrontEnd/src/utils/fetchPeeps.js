import axios from 'axios';

export const fetchPeeps = async () => {
  try {
    const response = await axios.get('https://chitter-e3j5.onrender.com/api/peeps');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch peeps');
  }
};