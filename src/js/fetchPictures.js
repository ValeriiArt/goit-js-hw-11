import axios from "axios";
const BASE_URL = 'https://pixabay.com/api/';

export default class ApiSearchPictures {
    
    constructor() {
        this.inputValue = '';
        this.page = 1;
    };

    async fetchPictures() {
        
        const fetchOptions = {
            key: '27064773-d5b51f526778ba93a6d48a229',
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
        };

        const response = await axios.get(`${BASE_URL}?key=${fetchOptions.key}&q=${this.inputValue}&image_type=${fetchOptions.image_type}&orientation=${fetchOptions.orientation}&safesearch=${fetchOptions.safesearch}`);
        if (response.status === 200) {
            this.page += 1;
        };
        return response.data;
    };

    resetPage() {
        this.page = 1;
    };
};
