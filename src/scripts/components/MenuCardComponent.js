/* eslint-disable class-methods-use-this */
import '../../styles/sass/MenuCardComponent.scss';
import ListIcon from '../../public/icons/ListIcon';
import ListIconSecondary from '../../public/icons/ListIconSecondary';

class MenuCardComponent extends HTMLElement {
  _capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.substr(1);
  }

  _getKey(obj) {
    return Object.keys(obj)[0];
  }

  _insertMenu(menu) {
    this.querySelector('.menu__list').innerHTML += `<li class="menu__list-item">${this._name === 'foods' ? ListIconSecondary : ListIcon} ${menu.name}</li>`;
  }

  set menus(menus) {
    this._name = this._getKey(menus);
    this._menus = menus;
  }

  connectedCallback() {
    this.render();

    this._menus[this._name].forEach((menu) => this._insertMenu(menu));
  }

  render() {
    this.innerHTML = `
      <div class="menu__wrap ${this._name}">
        <h3 class="menu__title"><span class="material-icons">${this._name === 'foods' ? 'fastfood' : 'local_bar'}</span> ${this._capitalizeFirstLetter(this._name)}</h3>
        <ul class="menu__list"></ul>
      </div>
    `;
  }
}

customElements.define('menu-card', MenuCardComponent);
