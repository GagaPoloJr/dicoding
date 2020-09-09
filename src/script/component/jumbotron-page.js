// import montage from "../../assets/images/montage.jpg";
import montage from "../../assets/img/montage.jpg";


class JumbotronPage extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
        <style>
        .jumbotron{
            font-family:"Montserrat", sans-serif;
            background: url('${montage}');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            height: 60vh;
           
           
        }
      
            #btn-jumbo {
                border-radius: 20px;
                padding: 7px 30px;
                background-color: transparent;
                border-width: 3px;
                color: white;
                margin-top: 50px;

                border-color: #white;
            }
            #btn-jumbo:hover{
                background-color: 	white;
                color: 	#232b2b;

            }
        
        </style>
        <div class="jumbotron">
            <br><br><br><br>
            <div class="row justify-content-center">
                <div class="col-12">
                    <h2 style="color: white" class="text-center"> Menyediakan Trailer Film Film Terbaru </h2>
                </div>
                <p class="lead">
                    <a id="btn-jumbo" class="btn btn-info" href="#container-list">Lihat Film</a>
                </p>
            </div>
        </div>`;
    }
}

customElements.define("jumbotron-page", JumbotronPage);