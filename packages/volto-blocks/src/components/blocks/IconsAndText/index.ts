import loadable from '@loadable/component';

export const IconsAndTextEdit = loadable(
  () => import(/* webpackChunkName: "redturtle__volto-blocks" */ './Edit'),
);
