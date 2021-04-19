module.exports = function (content, map, meta) {
  if (process.env.NODE_ENV === 'production') {
    this.callback(null, content, map, meta);
    return;
  }
  // style-loader: export default content.locals || {};
  content = content.replace(/\n\s*export default /, 'const locals = ') +
    `;
    export default new Proxy(locals, {
        get: (obj, key) => {
          const value = obj[key];
          if (value === undefined) {
            throw new Error('Invalid css class: ' + key + ' in (${this.resourcePath})');
          }
          return value;
        },
      });
  `;
  this.callback(null, content, map, meta);
};
