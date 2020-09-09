// import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class SearchBar extends HTMLElement {

    connectedCallback() {
        this.render();
    }

    set clickEvent(event) {
        this._clickEvent = event;
        this.render();
    }

    get value() {
        return this.querySelector("#searchElement").value;
    }

    render() {
        this.innerHTML = `
        <style> .search-container {
            max-width: 800px;
            box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            padding: 16px;
            border-radius: 15px;
            display: flex;
            top: 10px;
            background-color: white;
        }
        
        .search-container > input {
            width: 75%;
            padding: 16px;
            border: 0;
            // border-bottom: 1px solid  #232b2b;
            font-weight: bold;
            background-color: #f8f8f8;
            border-radius: 15px;
        }
        
        .search-container > input:focus {
            outline: 0;
            // border-bottom: 2px solid  #232b2b;
        }
        
        .search-container > input:focus::placeholder {
            font-weight: bold;
        }
        
        .search-container >  input::placeholder {
            color:  #232b2b;
            font-weight: normal;
        }
        
        .search-container > button {
            width: 23%;
            cursor: pointer;
            margin-left: auto;
            padding: 16px;
            background-color: #232b2b;
            color: white;
            border-radius: 30px;
            border-width:5px;
            border-color: #232b2b;
            text-transform: uppercase;

        }
        .search-container > button:hover {
            background-color: transparent;
            color: black;
        }
        
        @media screen and (max-width: 550px){
            .search-container {
                flex-direction: column;
                position: static;
            }
        
            .search-container > input {
                width: 100%;
                margin-bottom: 12px;
            }
        
            .search-container > button {
                width: 100%;
            }
        } </style>
        
      
        
        <div id="search-container" class="search-container">
            <input placeholder="Cari film kamu...." id="searchElement" type="search">
            <button class="btn button-transparent" id="searchButtonElement" type="submit">Search</button>
        </div>
    
        
    `;

        this.querySelector("#searchButtonElement").addEventListener("click", this._clickEvent);
    }
}
customElements.define("search-bar", SearchBar);