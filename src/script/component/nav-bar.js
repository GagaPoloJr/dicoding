class NavBar extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
        <style> 
        .navbar-nav .nav-item{
            font-family:"Montserrat", sans-serif;
            margin: 0 10px;
        }
        .navbar-brand {
        }
        </style>
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
             <div class="container">

                <button onClick="window.location.reload()" class="navbar-brand btn btn-dark">GagaTrailer</button>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                 </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav ml-auto ">
                    <button onClick="window.location.reload()" class="btn btn-dark nav-item nav-link active" href="#">Home <span class="sr-only">(current)</span></button>
                  
                    </div>
                </div>
                </div>
            </nav>
                    `
    }
}
customElements.define("nav-bar", NavBar);