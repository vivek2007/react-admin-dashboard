import axios from 'axios';

const setAuthToken1 = token1 => {
    if(token1) {
        axios.defaults.headers.common['Authorization1'] = token1;
    }
    else {
        delete axios.defaults.headers.common['Authorization1'];
    }
}

export default setAuthToken1;
