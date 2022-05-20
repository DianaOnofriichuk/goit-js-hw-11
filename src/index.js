import './css/styles.css';
import { refs, fetchPhotoes } from './fetchPhotoes';
import createMarkup from './markup.js';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

refs.form.addEventListener('submit', searchPhotoes);

let pageCounter = 1;
let gallery = new SimpleLightbox('.gallery a');

function searchPhotoes(e) {
  e.preventDefault();
  const inputValue = e.currentTarget.elements.searchQuery.value;

  try {
    if (inputValue.trim() !== '') {
      fetchPhotoes(inputValue.trim(), pageCounter).then(photoes => {
        onSearchValidate(photoes);
      });
    } else {
      refs.gallery.innerHTML = '';
    }
  } catch (error) {
    console.log(error);
  }
}

function onSearchValidate(photoes) {
  if (photoes.hits.length < 1) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
    );
    refs.gallery.innerHTML = '';
  } else {
    Notiflix.Notify.success(`Hooray! We found ${photoes.totalHits} images.`);
    createMarkup(photoes);
    gallery.refresh();
  }
}
