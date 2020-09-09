import '../component/movie-list.js';
import '../component/search-bar.js'
import DataSource from '../data/data-source.js';

const main = () => {
    const searchElement = document.querySelector("search-bar");
    const movieListElement = document.querySelector("movie-list");
    const loaderElement = document.querySelector("#overlay-detail");


    const onButtonSearchClicked = async() => {
        //asynchronous
        const upcomingElement = document.querySelector("#upcoming");
        const searchedElement = document.querySelector("#searched");
        const hasilElement = document.querySelector("#hasil");

        loaderElement.style.display = 'block';

        try {
            const result = await DataSource.searchMovie(searchElement.value);
            upcomingElement.style.display = 'none';
            searchedElement.style.display = 'block';
            hasilElement.style.display = 'block';

            document.getElementById('hasil').innerText = "Kata Yang kamu cari: " + searchElement.value;
            renderResult(result);
        } catch (message) {
            fallbackResult(message);
        }
    };
    //memunculkan movie default saat diakses 
    const upcomingMovies = async() => {
        const searhElement = document.querySelector("main");
        searhElement.style.display = 'block';
        try {
            const result = await DataSource.upcomingMovies();
            renderResult(result);
        } catch (message) {
            fallbackResult(message);
        }
    }
    upcomingMovies();

    const renderResult = results => {
        loaderElement.style.display = 'none';
        movieListElement.movies = results;
    };
    const fallbackResult = message => {
        movieListElement.renderError(message);
    };

    searchElement.clickEvent = onButtonSearchClicked;
};

export default main;