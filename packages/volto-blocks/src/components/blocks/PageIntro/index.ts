import loadable from '@loadable/component';

export const PageIntroEdit = loadable(
  () => import(/* webpackChunkName: "redturtle__volto-blocks" */ './Edit'),
);
