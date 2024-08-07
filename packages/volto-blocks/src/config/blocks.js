import text7SVG from '@redturtle/qubicaamf-theme/icons/text7.svg';
import Text7View from '@redturtle/qubicaamf-theme/components/blocks/Text7/View';
import Text7Edit from '@redturtle/qubicaamf-theme/components/blocks/Text7/Edit';

const defaultBlocksConfig = {
  restricted: false,
  mostUsed: false,
  security: {
    addPermission: [],
    view: [],
  },
  sidebarTab: 1,
};

export const blocks = {
  text7: {
    ...defaultBlocksConfig,
    id: 'text7',
    title: 'Text 7',
    icon: text7SVG,
    group: 'text',
    view: Text7View,
    edit: Text7Edit,
  },
};
