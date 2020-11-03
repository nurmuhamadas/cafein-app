import CafeinLogo from '../../public/icons/CafeinLogo';
import '../../styles/sass/navbar.scss';
import urlParser from '../routes/url-parser';

class Navbar extends HTMLElement {
  constructor() {
    super();

    this._page = '';
  }

  _toggleClassNav(nav) {
    nav.classList.remove('active');
    if (nav.getAttribute('name') === this._page) nav.classList.add('active');
  }

  _handleMenuActiveChange() {
    const navigations = document.querySelectorAll('nav ul li');

    this._page = urlParser.parseUrl().resource;
    if (this._page === null) this._page = 'home';

    navigations.forEach((nav) => this._toggleClassNav(nav));
  }

  _handleToggleMenuClick() {
    this.querySelector('header').classList.toggle('open-menu');
  }

  connectedCallback() {
    this.render();

    this.querySelector('.btn__wrap').addEventListener('click', () => this._handleToggleMenuClick());
    window.addEventListener('hashchange', () => this._handleMenuActiveChange());
    window.addEventListener('load', () => this._handleMenuActiveChange());
  }

  render() {
    this.innerHTML = `
            <header>
                <a href="https://cafein.netlify.app" class="company-logo">${CafeinLogo}</a> 
                <button aria-label="toggle-menu" class="btn__wrap">
                    <div  class="burger"></div>
                </button>
                <nav>
                    <ul>
                        <li name="home" class="${this._page === '' || this._page === 'home' ? 'active' : ''}"><a href="#">Home</a></li>
                        <li name="favorite" class="${this._page === 'favorite' ? 'active' : ''}"><a href="#/favorite">Favorite</a></li>
                        <li name="about"><a href="https://instagram.com/nurmuhamadas">About us</a></li>
                    </ul>
                    <div class="cta">
                        <a href="#">Masuk</a>
                        <button class="outlined">Daftar</button>
                    </div>
                </nav>
                <div class="back-layer"></div>
            </header>
        `;
  }
}

customElements.define('navbar-element', Navbar);
