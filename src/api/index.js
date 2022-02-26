import axios from 'axios';
// console.log(`${process.env.URL_API}api/`)
const api = axios.create({
	baseURL: `${process.env.URL_API}api/`,
	// timeout: 1000,
	// headers: {
	// 	'X-Custom-Header': 'foobar'
	// }
});

export default api;