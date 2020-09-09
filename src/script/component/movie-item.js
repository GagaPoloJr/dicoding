import './detail-movie.js';
import DataSource from '../data/data-source.js';

import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

class MovieItem extends HTMLElement {



    set movie(movie) {
        this._movie = movie;
        this.render();
    }
    HidePage() {
        const listMovieElement = document.querySelector("#container-list");
        const detailMovieElement = document.querySelector("#detail-movie");
        listMovieElement.style.display = 'none';
        detailMovieElement.style.display = 'block';

    }

    render() {
        const ImageURL = "https://image.tmdb.org/t/p/w500";
        this.innerHTML = `
           <style>      
               :host {
                   display: block;
                   margin-bottom: 18px;
                   box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
                   border-radius: 10px;
                   overflow: hidden;
               }
              
               .poster-image {
                   max-height: 300px;
                   object-fit: cover;
                   object-position: center;
                   border-top-left-radius: 20px;
                   border-top-right-radius: 20px;
               }
               .card{
                  border-radius: 20px;
                  box-shadow: 0px 0px 18px -5px rgba(173,173,173,1);
                  transition: all 500ms ease;
                  transform : scale(0.97);
                  filter: grayscale(0.5);
               }
               .card:hover{
                  box-shadow: 0px 0px 30px -5px rgba(173,173,173,1);
                  transform : scale(1);
                  filter: grayscale(0);
              

               }
               .detail-button{
                border-radius: 20px;
                background-color: transparent;
                border-width: 2px;
                color: black;
                border-color: #232b2b;
                font-size: 14px;
            }
            .detail-button:hover{
                background-color: 	#232b2b;
                color: white;

            }   
           </style>
           <div class="card card-movie" style="width: 18rem;">
                <a>
                    <img  class="poster-image card-img-top" src="${ImageURL+this._movie.poster_path}" alt="${this._movie.title}">
                </a>
                <div class="card-body">
                        <h4 class="card-title">${this._movie.title}</h4>
                        <i id="star" style=" filter: grayscale(0) !important;color: rgb(255, 210, 86);" class="star fa fa-star"> </i>
                        ${this._movie.vote_average}
                        <p style="font-size:14px; class="card-text">Release Date: ${this._movie.release_date}</p>
            <a  data-movie-id="${this._movie.id}"  class="btn btn-dark detail-button" id="detail-button">Selengkapnya</a>
                </div>
            </div>       
                `;

        // preloader animation
        const loaderElement = document.querySelector("#overlay-detail");

        // Mendapatkan data detail id dari datasource
        const detailMovie = async(id) => {
                loaderElement.style.display = 'block';
                try {
                    const result = await DataSource.detailMovie(id);
                    renderResult(result);
                } catch (message) {
                    fallbackResult(message)
                }
            }
            // render hasil detail movie
        const renderResult = results => {
            const btnJumboElement = document.querySelector("#btn-jumbo");

            // menghilangkan tombol lihat film
            btnJumboElement.style.display = 'none';
            loaderElement.style.display = 'none';

            // menyembunyikan halaman utama
            this.HidePage();

            // memasukkan nilai detail movie
            const detailMovieElement = document.querySelector("detail-movie");
            const dataMovie = {
                'title': (results.title ? results.title : '-'),
                'overview': (results.overview ? results.overview : '-'),
                'id': (results.id ? results.id : 'NaN'),
                'poster_path': (results.poster_path ? results.poster_path : 'NaN'),
                'vote_average': (results.vote_average ? results.vote_average : 'NaN'),
                'vote_count': (results.vote_count ? results.vote_count : 'NaN'),
                'status': (results.status ? results.status : 'NaN'),
                'tagline': (results.tagline ? results.tagline : '-'),
                'backdrop_path': (results.backdrop_path ? results.backdrop_path : '-'),
            }
            detailMovieElement.update = dataMovie;
        }

        // Callback Failed
        const fallbackResult = message => {
            alert(message);
        };
        //mendapatkan id movie 
        const detailButton = this.querySelector(".detail-button");
        detailButton.addEventListener("click", () => {
            const idMovie = detailButton.getAttribute("data-movie-id");
            // console.log(idMovie);
            detailMovie(idMovie);
        })


    }
}

customElements.define("movie-item", MovieItem);