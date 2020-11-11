/* eslint-disable class-methods-use-this */
/* eslint-disable camelcase */
import '../../styles/sass/HeroComponent.scss';
import arrowLeftIcon from '../../public/icons/keyboard_arrow_left-24px.svg';
import arrowRightIcon from '../../public/icons/keyboard_arrow_right-24px.svg';
import arrowDownIcon from '../../public/icons/keyboard_arrow_down-24px.svg';

class HeroComponent extends HTMLElement {
  constructor(props) {
    super(props);

    this.state = {
      index: 0,
      touch: {
        x: 0,
        y: 0,
        x_end: 0,
        y_end: 0,
      },
      tagline: [
        'Solusi tempat makan terbaik bersama keluarga ada disini',
        'Makanan yang disajikan dengan resep warisan Indonesia',
        'Temukan makanan favorit dari setiap daerah Indonesia',
      ],
    };
  }

  connectedCallback() {
    this.render();

    // change hero item
    this._heroChangeInterval = setInterval(() => this._nextElement(), 12000);

    // navigator click
    this.querySelectorAll('.navigator span').forEach((navigator, index) => {
      navigator.addEventListener('click', () => this._handleNavigatorClick(index));
    });

    // hero swipe
    const heroSection = document.querySelector('#hero-section');
    heroSection.addEventListener('touchstart', (event) => this._handleTouchStart(event), { passive: true });
    heroSection.addEventListener('touchmove', (event) => this._handleTouchMove(event), { passive: true });
    heroSection.addEventListener('touchend', () => this._handleTouchEnd(), { passive: true });

    // arrow slide click
    this.querySelector('.next').addEventListener('click', () => this._nextElement());
    this.querySelector('.prev').addEventListener('click', () => this._prevElement());
  }

  disconnectedCallback() {
    clearInterval(this._heroChangeInterval);
  }

  render() {
    this.innerHTML = `
            <div id="hero-section" class="heroElement__image-0">
                <button aria-label="next hero image" class="arrow prev">
                    <img width="36" height="36" class="material-icons md-light" src="${arrowLeftIcon}" alt="Arrow left icon" />
                </button>
                <div class="wrap">
                    <h1 class="tagline">Solusi tempat makan terbaik bersama keluarga ada disini</h1>
                    <a href="#top-section" class="arrow__down">
                      <img width="36" height="36" class="material-icons" src="${arrowDownIcon}" alt="Arrow Down icon" />
                      <img width="36" height="36" class="material-icons" src="${arrowDownIcon}" alt="Arrow Down icon" />
                    </a>
                    <div class="navigator">
                        <span class="active"></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <button aria-label="Prev hero image" class="arrow next">
                  <img width="36" height="36" class="material-icons md-light" src="${arrowRightIcon}" alt="Arrow right icon" />
                </button>
            </div>
        `;
  }

  _handleHeroElementChange() {
    const { index } = this.state;
    const heroSection = document.querySelector('#hero-section');
    const taglineElement = this.querySelector('.tagline');
    const navigatorElements = this.querySelectorAll('.navigator span');

    navigatorElements.forEach((navigator) => {
      navigator.classList.remove('active');
    });
    navigatorElements[index % 3].classList.add('active');

    taglineElement.innerHTML = this.state.tagline[index % 3];

    heroSection.classList.remove(...heroSection.classList);
    heroSection.classList.add(`heroElement__image-${index}`);
  }

  _handleNavigatorClick(i) {
    this.state.index = i;
    this._handleHeroElementChange();
  }

  _handleTouchStart(event) {
    this.state.touch.x = event.touches[0].clientX;
    this.state.touch.y = event.touches[0].clientY;
  }

  _handleTouchMove(event) {
    this.state.touch.x_end = event.touches[0].clientX;
    this.state.touch.y_end = event.touches[0].clientY;
  }

  _isSwipe() {
    return Math.abs(this.state.touch.y_end - this.state.touch.y) < 20;
  }

  _nextElement() {
    this.state.index = (this.state.index + 1) % 3;
    this._handleHeroElementChange();
  }

  _prevElement() {
    this.state.index = this.state.index === 0 ? 2 : this.state.index - 1;
    this._handleHeroElementChange();
  }

  _handleTouchEnd() {
    const {
      x, x_end,
    } = this.state.touch;

    if (this._isSwipe()) {
      if (x_end - x > 50) this._prevElement();
      else if (x_end - x < -50) this._nextElement();
    }
  }
}

customElements.define('hero-component', HeroComponent);
