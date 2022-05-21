import './css/styles.css';
import { refs, fetchPhotoes } from './fetchPhotoes';
import createMarkup from './markup.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.form.addEventListener('submit', searchPhotoes);

let pageCounter = 1;
let inputValue = '';
let gallery = new SimpleLightbox('.gallery a');

function searchPhotoes(e) {
  e.preventDefault();
  inputValue = e.currentTarget.elements.searchQuery.value.trim();
  refs.gallery.innerHTML = '';
  pageCounter = 1;
  refs.loadMoreBtn.classList.remove('visible');

  try {
    fetchPhotoes(inputValue, pageCounter).then(photoes => {
      onSearchValidate(photoes);
    });
  } catch (error) {
    console.log(error);
  }
}

function onSearchValidate(photoes) {
  if (photoes.hits.length < 1) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
  } else if (inputValue === '') {
    Notiflix.Notify.failure('Enter a name.');
  } else if (photoes.totalHits / 40 < pageCounter) {
    Notiflix.Notify.warning("We're sorry, but you've reached the end of search results.");
    refs.loadMoreBtn.classList.remove('visible');
    createMarkup(photoes);
    gallery.refresh();
  } else {
    Notiflix.Notify.success(
      `Hooray! We found ${photoes.totalHits - pageCounter * 40 + 40} images.`,
    );
    createMarkup(photoes);
    gallery.refresh();
    refs.loadMoreBtn.classList.add('visible');
  }
}

refs.loadMoreBtn.addEventListener('click', onLoadMore);

function onLoadMore(e) {
  pageCounter += 1;
  fetchPhotoes(inputValue, pageCounter).then(photoes => {
    onSearchValidate(photoes);
  });
}
