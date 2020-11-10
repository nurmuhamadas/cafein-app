/* eslint-disable class-methods-use-this */
// import swal from 'sweetalert';
import FavoriteRestaurantIdb from '../data/idb';
import '../../styles/sass/FavoriteButton.scss';
import favoriteButton from '../../public/icons/favorite-24px.svg';
import deleteButton from '../../public/icons/delete_forever-24px.svg';

class FavoriteButton extends HTMLElement {
  async _loadSwal() {
    return import('sweetalert')
      .then((module) => module.default);
  }

  async _confirmSave() {
    const swal = await this._loadSwal();
    const save = await swal('Do you want to save this restaurant info?');
    return save;
  }

  async _addRestaurantToDatabase() {
    const swal = await this._loadSwal();
    try {
      if (await this._confirmSave()) {
        await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
        swal('Success!', 'Restaurant is saved, you can access this offline.', 'success');
        this.render();
      }
    } catch (error) {
      swal('Failed!', error.message, 'error');
    }
  }

  async _confirmDelete() {
    const swal = await this._loadSwal();
    const _delete = await swal({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to access this offline!',
      icon: 'warning',
      buttons: true,
      dangerMode: true,
    });
    return _delete;
  }

  async _deleteRestaurantFromDatabase() {
    const swal = await this._loadSwal();
    try {
      if (await this._confirmDelete()) {
        await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
        swal('Success!', 'Restaurant is removed, you can\'t access this offline now.', 'success');
        this.render();
      }
    } catch (error) {
      swal('Failed!', error.message, 'error');
    }
  }

  async _isSaved() {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(this._restaurant.id);
    return !!restaurant;
  }

  async _handleFavoriteButtonClick() {
    if (await this._isSaved(this._restaurant.id)) {
      this._deleteRestaurantFromDatabase();
    } else {
      this._addRestaurantToDatabase();
    }
  }

  async _renderSaveButton() {
    this.innerHTML = `
      <button>
        <img class="material-icons save" src="${favoriteButton}" alt="Favorite button" />
      </button>
    `;
  }

  async _renderDeleteButton() {
    this.innerHTML = `
    <button>
      <img class="material-icons save" src="${deleteButton}" alt="Delete button" />
    </button>
  `;
  }

  set data(restaurant) {
    this._restaurant = restaurant;
  }

  async connectedCallback() {
    this.render();
  }

  async render() {
    if (await this._isSaved()) {
      await this._renderDeleteButton();
      this.querySelector('button').addEventListener('click', () => this._handleFavoriteButtonClick());
    } else {
      await this._renderSaveButton();
      this.querySelector('button').addEventListener('click', () => this._handleFavoriteButtonClick());
    }
  }
}

customElements.define('favorite-button', FavoriteButton);
