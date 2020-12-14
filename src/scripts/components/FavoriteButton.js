import FavoriteRestaurantIdb from '../data/idb';

const style = () => `
  <style>
    favorite-button {
      width: 48px;
      height: 48px;
      position: fixed;
      bottom: 2rem;
      right: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: #C70039;
      box-shadow: 0 0 10px #aaaaaa79;
    }
    
    @media screen and (min-width: 423px) {
      favorite-button {
        right: 2rem;
      }
    }
    
    @media screen and (min-width: 768px) {
      favorite-button {
        right: 3rem;
        bottom: 4rem;
      }
    }
  </style>
  `;

class FavoriteButton extends HTMLElement {
  async _addRestaurantToDatabase() {
    try {
      await FavoriteRestaurantIdb.putRestaurant(this._restaurant);
      this.render();
    } catch (error) {
      swal('Failed!', error.message, 'error');
    }
  }

  async _deleteRestaurantFromDatabase() {
    try {
      await FavoriteRestaurantIdb.deleteRestaurant(this._restaurant.id);
      this.render();
    } catch (error) {
      swal('Failed!', error.message, 'error');
    }
  }

  async _isSaved() {
    const restaurant = await FavoriteRestaurantIdb.getRestaurant(this._restaurant.id);
    return !!await restaurant;
  }

  async _renderSaveButton() {
    this.innerHTML = `
      <button aria-label="like this restaurant">
      <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path fill="white" d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
        ${style()}
      </button>
    `;
  }

  async _renderDeleteButton() {
    this.innerHTML = `
    <button aria-label="unlike this restaurant">
    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M0 0h24v24H0V0z" fill="none"/><path fill="white" d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zm2.46-7.12l1.41-1.41L12 12.59l2.12-2.12 1.41 1.41L13.41 14l2.12 2.12-1.41 1.41L12 15.41l-2.12 2.12-1.41-1.41L10.59 14l-2.13-2.12zM15.5 4l-1-1h-5l-1 1H5v2h14V4z"/></svg>
      ${style()}
    </button>
  `;
  }

  set data(restaurant) {
    this._restaurant = restaurant;
  }

  async connectedCallback() {
    await this.render();
  }

  async render() {
    await this._isSaved;
    if (await this._isSaved()) {
      await this._renderDeleteButton();
      this.querySelector('button').addEventListener('click', () => this._deleteRestaurantFromDatabase());
    } else {
      await this._renderSaveButton();
      this.querySelector('button').addEventListener('click', () => this._addRestaurantToDatabase());
    }
  }
}

customElements.define('favorite-button', FavoriteButton);
