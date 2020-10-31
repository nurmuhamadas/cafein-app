/* eslint-disable no-param-reassign */
const LoaderInitiator = {
  init(wrapper) {
    wrapper.appendChild(this.render());
  },

  clear(wrapper) {
    wrapper.innerHTML = '';
  },

  render() {
    const LoaderElement = document.createElement('loader-component');
    return LoaderElement;
  },
};

export default LoaderInitiator;
