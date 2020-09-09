class DataSource {
    static searchMovie(keyword) {
        return fetch(`https://api.themoviedb.org/3/search/movie?api_key=f07e399a0e0da1400fabdea6fb557cf9&query=${keyword}`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`film ${keyword} tidak ditemukan`);
                }
            })

    }
    static upcomingMovies() {
        return fetch(`https://api.themoviedb.org/3/movie/upcoming?api_key=f07e399a0e0da1400fabdea6fb557cf9&language=en-US`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson.results) {
                    return Promise.resolve(responseJson.results);
                } else {
                    return Promise.reject(`film tidak ditemukan`);
                }
            })

    }
    static detailMovie(id) {
        return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=f07e399a0e0da1400fabdea6fb557cf9&language=en-US`)
            .then(response => {
                return response.json();
            })
            .then(responseJson => {
                if (responseJson) {
                    return Promise.resolve(responseJson);
                } else {
                    return Promise.reject(`${id} film tidak ditemukan`);
                }
            })

    }

}

export default DataSource;