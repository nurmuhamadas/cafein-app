import './MenuCardComponent';
import '../../styles/sass/MenuContainer.scss';

class MenuContainer extends HTMLElement {
  _insertMenu(menus) {
    const wrapper = this.querySelector('#restaurant__menus');
    const menuElement = document.createElement('menu-card');
    menuElement.menus = menus;
    wrapper.appendChild(menuElement);
  }

  set data(menus) {
    this._menus = menus;
  }

  connectedCallback() {
    this.render();

    this._insertMenu({ foods: this._menus.foods });
    this._insertMenu({ drinks: this._menus.drinks });
  }

  render() {
    this.innerHTML = `
      <div id="restaurant__menus"></div>
    `;
  }
}

customElements.define('menu-container', MenuContainer);
