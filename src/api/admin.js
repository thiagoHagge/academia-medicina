import axios from 'axios';

const token = localStorage.getItem('token')

export default apiAdmin = axios.create({
    baseURL: `${process.env.URL_API}api/`,
	timeout: 10000,
	headers: {
		'X-Token': token
	}
});
