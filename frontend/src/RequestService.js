import axios from 'axios';
const API_URL = 'http://localhost:3000/';

const axiosInstance = axios.create({
	baseURL: API_URL
});

const RequestService = {

	create(url, data) {
		return axiosInstance.post(API_URL+url, data);
	},

	retrieve(url, id, filters) {
		let config = {
			params: filters || {}
		};

		if(id) {
			url = url+'/'+id;
		}

		return axiosInstance.get(API_URL+url, config);
	},

	update(url, id, data) {

		return axiosInstance.put(API_URL+url+'/'+id, data);
	},

	delete(url, id) {
		return axiosInstance.delete(API_URL+url+'/'+id);
	}

}

export default RequestService;
