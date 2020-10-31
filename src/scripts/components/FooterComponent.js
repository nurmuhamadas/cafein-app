import '../../styles/sass/footerComponent.scss';

class footerComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <footer>
                <p>Copyright © 2020 - Cafein Apps</p>
            </footer>
        `;
  }
}

customElements.define('footer-component', footerComponent);
