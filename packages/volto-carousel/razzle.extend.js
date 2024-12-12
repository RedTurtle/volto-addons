const path = require('path');
const makeLoaderFinder = require('razzle-dev-utils/makeLoaderFinder');
const interpolateName = require('loader-utils').interpolateName;

function normalizePath(file) {
  return path.sep === '\\' ? file.replace(/\\/g, '/') : file;
}

// Custom function to not use 'loaderContext._module.matchResource' in hashing CSS class name.
function getLocalIdent(loaderContext, localIdentName, localName, options) {
  const relativeResourcePath = normalizePath(
    path.relative(options.context, loaderContext.resourcePath),
  );

  // eslint-disable-next-line no-param-reassign
  options.content = `${options.hashPrefix}${relativeResourcePath}\x00${localName}`;

  return interpolateName(loaderContext, localIdentName, options);
}

module.exports = {
  plugins: (plugs) => plugs,
  modify: function modifyWebpackConfig(
    defaultConfig,
    { target, dev },
    webpackObject,
  ) {
    const config = Object.assign({}, defaultConfig);

    const cssLoaderFinder = makeLoaderFinder('css-loader');
    const cssLoader = config.module.rules.find(cssLoaderFinder);

    if (!dev && cssLoader) {
      const loader = cssLoader.use.find(
        (u) => typeof u !== 'string' && u.ident === 'razzle-css-loader',
      );
      if (loader) {
        loader.options.modules.getLocalIdent = getLocalIdent;
      }
    }

    const scssLoaderFinder = makeLoaderFinder('sass-loader');
    const scssLoader = config.module.rules.find(scssLoaderFinder);

    if (!dev && scssLoader) {
      const loader = scssLoader.use.find(
        (u) => typeof u !== 'string' && u.loader.match(/\/css-loader\//),
      );
      if (loader) {
        loader.options.modules.getLocalIdent = getLocalIdent;
      }
    }

    return config;
  },
};
