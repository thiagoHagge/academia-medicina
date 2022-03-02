import axios from 'axios';

export default function apiAdmin() {
	const token = localStorage.getItem('token')
	return axios.create({
		baseURL: `${process.env.URL_API}api/`,
		timeout: 10000,
		headers: {
			'X-Token': token
		}
	});
}	
