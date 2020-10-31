import '../components/Navbar';
import '../components/FooterComponent';

const AppShell = {
  render() {
    return `
      <navbar-element></navbar-element>
      <main id="main-content"></main>
      <footer-component></footer-component>
    `;
  },
};

export default AppShell;
