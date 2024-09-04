import loadable from '@loadable/component';

export const ImageAndTextBoxEdit = loadable(
  () => import(/* webpackChunkName: "redturtle__volto-blocks" */ './Edit'),
);
