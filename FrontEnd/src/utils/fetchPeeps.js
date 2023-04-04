import axios from 'axios';

export const fetchPeeps = async () => {
  try {
    const response = await axios.get('http://localhost:4000/api/peeps');
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to fetch peeps');
  }
};