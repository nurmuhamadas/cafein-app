const urlParser = {
  parseUrl() {
    const url = window.location.hash.slice(1).toLowerCase();
    return this._urlSplitter(url);
  },

  parseUrlWithCombiner() {
    const parsedUrl = this.parseUrl();
    return this._urlCombiner(parsedUrl);
  },

  _urlSplitter(url) {
    const splittedUrl = url.split('/');
    return {
      resource: splittedUrl[1] || null,
      id: splittedUrl[2] || null,
      verb: splittedUrl[3] || null,
    };
  },

  _urlCombiner(splittedUrl) {
    return (splittedUrl.resource ? `/${splittedUrl.resource}` : '/')
      + (splittedUrl.id ? '/:id' : '')
      + (splittedUrl.verb ? `/${splittedUrl.verb}` : '');
  },
};

export default urlParser;
