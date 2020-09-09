import '@fortawesome/fontawesome-free/js/fontawesome';
import '@fortawesome/fontawesome-free/js/solid';
import '@fortawesome/fontawesome-free/js/regular';
import '@fortawesome/fontawesome-free/js/brands';

class DetailMovie extends HTMLElement {

    set update(value) {
        this.setAttribute('title', value.title);
        this.setAttribute('overview', value.overview);
        this.setAttribute('id', value.id);
        this.setAttribute('poster_path', value.poster_path);
        this.setAttribute('backdrop_path', value.backdrop_path);
        this.setAttribute('vote_count', value.vote_count);
        this.setAttribute('vote_average', value.vote_average);
        this.setAttribute('status', value.status);
        this.setAttribute('tagline', value.tagline);


        this.render();
    }



    render() {
        // fungsi video dari yutub
        function frameVideo(video) {
            const videoKey = (video && video.key) || 'key tidak ditemukan';
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoKey}`;
            iframe.width = 360;
            iframe.height = 315;
            iframe.allowFullscreen = true;
            return iframe;
        }

        //konfigurasi api untuk gambar dan video
        const BASE_URL = "https://api.themoviedb.org/3/movie/"
        const VIDEO_URL = "/videos?api_key=f07e399a0e0da1400fabdea6fb557cf9&language=en-US"
        const ImageURL = "https://image.tmdb.org/t/p/w500";

        // preloader animation
        const loaderElement = document.querySelector("#overlay-detail");

        //menghilangkan search 
        const searhElement = document.querySelector("main");
        searhElement.style.display = 'none';

        // memunuclkan video trailer
        document.onclick = (event) => {
            const target = event.target;

            if (target.tagName.toLowerCase() === 'button') {
                loaderElement.style.display = 'block';
                document.getElementById("show_videos").disabled = "true";
                const url = `${BASE_URL+this.id+VIDEO_URL}`
                fetch(url)
                    .then((response) =>
                        response.json())
                    .then((data) => {
                        console.log("video", data);
                        const videos = data.results;
                        const length = videos.length > 4 ? 4 : videos.length;

                        for (let i = 0; i < length; i++) {
                            const video = videos[i];
                            const iframe = frameVideo(video);
                            this.appendChild(iframe);
                            loaderElement.style.display = 'none';
                        }

                    })
                    .catch((error) => {
                        console.log('error:', error);
                    })

            }
        }
        this.title = this.getAttribute("title") || null;
        this.overview = this.getAttribute("overview") || null;
        this.id = this.getAttribute("id") || null;
        this.poster_path = this.getAttribute("poster_path") || null;
        this.vote_average = this.getAttribute("vote_average") || null;
        this.status = this.getAttribute("status") || null;
        this.tagline = this.getAttribute("tagline") || null;
        this.backdrop_path = this.getAttribute("backdrop_path") || null;


        this.innerHTML = `
        <style>
        .back-button{
            border-radius: 20px;
            border-width: 2px;
            color: white;
            border-color: #232b2b;
            font-size: 14px;
            width: 70%; 
            margin-bottom: 30px;  
        }
        #detail-container{
            box-shadow: 0px 0px 18px -5px rgba(173,173,173,1);
            padding: 10px;
            background: url (${ImageURL+this.poster_path});

        }
        @media (min-width:992px){
            #detail-container{
                padding: 50px;
            }
            .back-button{
                width: 100%; 

            }
        }
        iframe{
            width: 100%;
            margin-bottom: 20px;

        }
        </style>
        <div class="row justify-content-center">
            <button  onClick="window.location.reload()" class="btn btn-dark back-button" id="back-button">Kembali</button>
        </div>
        <div id="detail-container" class="container">
            <div class="row">
                <div class="col-4">
                    <img  class="img-fluid" src="${ImageURL+this.poster_path}" alt="${this.title}">
                </div>
                <div class="col-8">
                    <h2>${this.title}</h2>
                    <h5>  <i style="color: rgb(255, 210, 86);" class="fa fa-star"> </i>${this.vote_average} / 10 </h5>
                    <p> ${this.overview}</p>
                    <p> ${this.status} </p>
                    <p> Tagline:  <i style="color:gray;">${this.tagline}</i> </p>
    
                    <button  class="btn btn-dark back-button" id="show_videos" style="display: block;">Show Trailers </button>
                    </div>        
            </div>
       </div>
        <br>
        <br>
        <br>
      
        `
    }
    connectedCallback() {
        this.render();
    }
}
customElements.define("detail-movie", DetailMovie);