import axios from 'axios';

class Api {
    url = 'https://jsonplaceholder.typicode.com/posts';

    get = () => axios.get(this.url);

    patch = (id, data) => {
        const endpoint = this.url + '/' + id;
        return axios.patch(endpoint, data);
    }

    delete = (id, data) => {
        const endpoint = this.url + '/' + id;
        return axios.delete(endpoint, data);
    }
}
export default Api