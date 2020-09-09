class footerPage extends HTMLElement {

    connectedCallback() {
        this.innerHTML = `
        <footer class="page-footer font-small blue">
        
          <div class="footer-copyright text-center py-3">© 2020 Copyright:
            <a href="https://mdbootstrap.com/"> GagaMovies</a>
          </div>
        
        </footer>
        `
    }
}

customElements.define("footer-footer", footerPage);