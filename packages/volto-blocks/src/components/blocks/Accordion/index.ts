import loadable from '@loadable/component';

export const AccordionEdit = loadable(
  () => import(/* webpackChunkName: "redturtle__volto-blocks" */ './Edit'),
);
