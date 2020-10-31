import 'regenerator-runtime';
import App from './views/App';
import '../styles/sass/index.scss';
import AppShell from './utils/drawer-app-shell';
import swRegister from './utils/sw-register';

const root = document.querySelector('#root');

const app = new App(
  AppShell,
  root,
);

window.addEventListener('hashchange', () => {
  app.renderPage();
});

window.addEventListener('load', () => {
  app.renderPage();
  swRegister();
});
