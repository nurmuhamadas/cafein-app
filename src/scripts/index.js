import 'regenerator-runtime';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import App from './views/App';
import '../styles/sass/index.scss';
import './components/Navbar';
import './components/FooterComponent';
import './components/HeroComponent';
import swRegister from './utils/sw-register';

const root = document.querySelector('#root');

const app = new App(
  root,
);

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
