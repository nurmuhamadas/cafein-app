import '../../../styles/sass/pages/Error.scss';
import error from '../../../public/illustration/error';

const homePage = {
  _handleUserOnline() {
    window.removeEventListener('online');
    window.history.back();
  },

  _handleButtonClick() {
    window.history.back();
  },

  async afterRender() {
    document.querySelector('#error-page button').addEventListener('click', () => this._handleButtonClick());

    window.addEventListener('online', () => this._handleUserOnline());
  },

  render() {
    return `
      <div id="error-page">
        <h1 class="title">Upss! Sorry, something goes wrong!</h1>
        ${error}
        <p class="message">Don't worry, you can access it again. Please check your internet and then</p>
        <div class="btn__wrap">
          <button class="filled">Try again</button>
          <a href="#/favorite">Go to favorite page</a>
        </div>
      </div>
    `;
  },
};

export default homePage;
