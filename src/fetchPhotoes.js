export const refs = {
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

export async function fetchPhotoes(name, pageCounter) {
  const KEY = '24505023-aa89cf58f0072335e9d83656d';
  const response = await fetch(
    `https://pixabay.com/api/?key=${KEY}&q=${name}&image_type=photo&orientation="horizontal"&safesearch="true&page=${pageCounter}&per_page=40`,
  );
  const photoes = await response.json();
  return photoes;
}
