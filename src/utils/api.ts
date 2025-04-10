import axios from 'axios';
import md5 from 'md5';

const limit = 20;
const publicKey = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
const privateKey = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
const isProduction = process.env.REACT_APP_NODE_ENV === 'production';

export const fetchComics = async (activeFormat: string, pageParam: number = 0) => {
  if (!publicKey) {
    throw new Error('Marvel API public key is not configured');
  }

  let url = `https://gateway.marvel.com/v1/public/comics?apikey=${publicKey}&limit=${limit}&offset=${pageParam}`;
  
  if (isProduction) {
    if (!privateKey) {
      throw new Error('Marvel API private key is not configured');
    }
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);
    url += `&ts=${ts}&hash=${hash}`;
  }
  
  if (activeFormat !== 'All') {
    url += `&format=${activeFormat.toLowerCase()}`;
  }
  
  try {
    const response = await axios.get(url);
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 401) {
        throw new Error('Invalid API credentials. Please check your API keys.');
      } else if (error.response?.status === 429) {
        throw new Error('Too many requests. Please try again later.');
      } else if (error.response?.status === 404) {
        throw new Error('No comics found for the selected format.');
      }
    }
    throw new Error('Failed to fetch comics. Please try again later.');
  }
}; 