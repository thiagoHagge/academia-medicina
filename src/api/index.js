import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8000/api/',
	// timeout: 1000,
	// headers: {
	// 	'X-Custom-Header': 'foobar'
	// }
});

export default api;