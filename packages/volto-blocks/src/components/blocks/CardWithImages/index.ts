import loadable from '@loadable/component';

export const CardWithImagesEdit = loadable(
  () => import(/* webpackChunkName: "redturtle__volto-blocks" */ './Edit'),
);
