// Seu javascript aqui :)
// Use a Star Wars API: https://swapi.dev/
// para fazer uma requisição assíncrona e:
//  - Pegar a lista de filmes (AJAX) e preencher no HTML
//  - Quando um filme for clicado, exibir sua introdução

import { play } from './music.js' //tocador de musica mp3
import { restartAnimation } from './restart-animation.js'
import friendlyFetch from './friendly-fetch.js'

// para tocar a música sem o tocador 
//const musica = new Audio(url)
//musica.play()

play({
  audioUrl: 'audio/tema-sw.mp3',
  coverImageUrl: 'imgs/logo.svg',
  title: 'Intro',
  artist: 'John Williams'
}, document.body)


const API_ENDPOINT = 'https://swapi.py4e.com/api'
const filmListEl = document.querySelector('#filmes ul')

const toRoman = {
  1: 'I',
  2: 'II',
  3: 'III',
  4: 'IV',
  5: 'V',
  6: 'VI',
  7: 'VII',
  8: 'VIII',
  9: 'IX',
  10: 'X',
  11: 'XI',
  12: 'XII'
}

// chamada ajax
const data = await friendlyFetch(API_ENDPOINT + '/films')
const films = data.results.sort((a, b) => a.episode_id - b.episode_id)


// limpa a lista
filmListEl.innerHTML = ''

// percorre vetor de filmes adicionando cada um à lista
films.forEach(addFilmToList)


function addFilmToList(film) {
  const filmTemplate = `<li>Episode ${toRoman[film.episode_id].padEnd(3, ' ')} - ${film.title}</li>`

  // mudando para inserir usando um fragmento de DOM,
  // pra poder associar evento de click ao <li>
  const filmEl = document.createRange().createContextualFragment(filmTemplate).firstElementChild
  filmEl.addEventListener('click', loadIntro(film))
  filmListEl.appendChild(filmEl)
}

// a loadIntro retorna uma função que, essa sim, será registrada ao
// evento de 'click' de uma <li>. Fiz assim para associar o filme
// (por meio do parâmetor film) ao <li> sem ter que salvar nenhuma
// informação no DOM (eg, via atributos de dados) 
function loadIntro(film) {
  const introEl = document.querySelector('pre.introducao')
  
  return () => {
    introEl.innerHTML = `Episode ${toRoman[film.episode_id]}
      ${film.title.toUpperCase()}
      
      ${film.opening_crawl}
    `
    restartAnimation(introEl)
  }
}
