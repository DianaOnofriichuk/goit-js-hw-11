import { refs } from './fetchPhotoes';

export default function createMarkup(photoes) {
  const markup = photoes.hits
    .map(hit => {
      return `<div class="photo-card">
      <a href=${hit.largeImageURL}>
     <img src=${hit.webformatURL} alt=${hit.tags} loading="lazy" class="image"/></a>
     <div class="info">
       <p class="info-item">
         <b>Likes</b>${hit.likes}
       </p>
       <p class="info-item">
         <b>Views</b>${hit.views}
       </p>
       <p class="info-item">
         <b>Comments</b>${hit.comments}
       </p>
       <p class="info-item">
         <b>Downloads</b>${hit.downloads}
       </p>
     </div>
   </div>`;
    })
    .join('');

  refs.gallery.innerHTML = markup;
}
