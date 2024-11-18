import loadable from '@loadable/component';

export const CallToActionEdit = loadable(
  () => import(/* webpackChunkName: "redturtle__volto-blocks" */ './Edit'),
);
