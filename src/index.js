import './css/styles.css';
import ApiSearchPictures from './js/fetchPictures';
import Notiflix from 'notiflix';
import templateCard from './template/templateCard';
import SimpleLightbox from "simplelightbox";


const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMore: document.querySelector('.load-more'),
};
refs.searchForm.addEventListener('submit', searchPictures);
refs.loadMore.addEventListener('click', loadMore)

const searchPicturesAPI = new ApiSearchPictures();

function addLoadMore() {
    refs.loadMore.classList.remove('is-hidden');
}
function removeLoadMore() {
    refs.loadMore.classList.add('is-hidden');
}

function searchPictures(evt) {
    evt.preventDefault();
    clearResult();
    searchPicturesAPI.inputValue = evt.currentTarget.elements.searchQuery.value;
    // searchPicturesAPI.resetPage();
    searchPicturesAPI.fetchPictures().then(renderCard);
}

function clearResult() {
    refs.gallery.innerHTML = '';
};

function lightbox() {
    const lightbox = new SimpleLightbox('.gallery a',
    {
        captionsData: "alt", captionDelay: 250,
    });   
} 
function scroll() {
    const { height: cardHeight } = document
    .querySelector(".gallery")
    .firstElementChild.getBoundingClientRect();
    
    window.scrollBy({
        top: cardHeight * 2,
        behavior: "smooth",
    });
}
function loadMore() {
    searchPicturesAPI.fetchPictures().then(loadMoreRenderCard);
}

function loadMoreRenderCard(data) {
    refs.gallery.insertAdjacentHTML('beforeend', templateCard(data.hits));
    lightbox();
    scroll();
    const maxFreePage = data.totalHits / 40;
    
    if (searchPicturesAPI.page > maxFreePage) {
        Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
        removeLoadMore();
    }
}

function renderCard(data) {
    if (data.hits.length === 0) {
        return Notiflix.Notify.warning('Sorry, there are no images matching your search query. Please try again.');
    } else if(data.hits.length < 40) {
        removeLoadMore();
    } else {
        addLoadMore() 
    }
    refs.gallery.insertAdjacentHTML('beforeend', templateCard(data.hits));
    Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)
    lightbox()
};






// Notiflix.Notify.success('Sol lucet omnibus');

// Notiflix.Notify.failure('Qui timide rogat docet negare');

// Notiflix.Notify.warning('Memento te hominem esse');

// Notiflix.Notify.info('Cogito ergo sum');


