import axios from 'axios';

const apiKey = 'ec304aad-1474-41e2-9d45-9f1860c9509c'

export const fetchNewsData = async () => {

    try {
         const response = await axios.get(`https://content.guardianapis.com/search?page-size=6&order-by=newest&show-fields=byline%2Cthumbnail%2Cheadline%2CbodyText&api-key=${apiKey}`);
        return response.data.response.results;
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchNewsData;