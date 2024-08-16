import loadable from '@loadable/component';

export const Text1Edit = loadable(
  () => import(/* webpackChunkName: "redturtle__volto-blocks" */ './Edit'),
);
