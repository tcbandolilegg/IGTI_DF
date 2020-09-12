import axios from 'axios';

//Define a URL base da origem para consumo do servico
export default axios.create({
  baseURL: 'https://tcbl-igti-desafio-final.herokuapp.com/api',
  headers: {
    'Content-type': 'application/json',
  },
});
