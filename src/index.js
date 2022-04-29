import './css/styles.css';
import './css/styles.css';
import ApiSearchPictures from './js/fetchPictures';
import Notiflix from 'notiflix';
import templateCard  from './template/templateCard';


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
};

const searchPicturesAPI = new ApiSearchPictures();

refs.searchForm.addEventListener('submit', searchPictures);

function searchPictures(evt) {
    evt.preventDefault();
    clearResult();
    searchPicturesAPI.inputValue = evt.currentTarget.elements.searchQuery.value;
    searchPicturesAPI.resetPage();
    searchPicturesAPI.fetchPictures().then(renderCard);
}

function clearResult() {
    refs.gallery.innerHTML = '';
};

function renderCard(data) {
    refs.gallery.insertAdjacentHTML('beforeend', templateCard(data.hits));
};






Notiflix.Notify.success('Sol lucet omnibus');

Notiflix.Notify.failure('Qui timide rogat docet negare');

Notiflix.Notify.warning('Memento te hominem esse');

Notiflix.Notify.info('Cogito ergo sum');


