import UrlParser from '../routes/url-parser';
import routes from '../routes/routes';
import '../components/LoaderComponent';

class App {
  constructor(appShell, root) {
    this._root = root;
    this._appShell = appShell;

    this._initializeApp();
  }

  _initializeApp() {
    this._root.innerHTML = this._appShell.render();
    this._mainContainer = document.querySelector('#main-content');
  }

  async renderPage() {
    const url = UrlParser.parseUrlWithCombiner();
    const page = await routes(url);
    this._mainContainer.innerHTML = await page.render();
    page.afterRender();
  }
}

export default App;
