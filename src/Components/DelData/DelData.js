import axios from 'axios';
import { toast } from 'react-toastify';

const DelData = async (id, page) => {
  const apiUrl = process.env.API_URL1;
  try {
    await axios.delete(`${apiUrl}/${page}/${id}`); 
    toast.info(`${page.slice(0, -1)} was deleted!`);
  } catch (error) {
    toast.error(error.message);
    throw error; 
  }
};

export default DelData;