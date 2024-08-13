import type { BlocksConfigData, BlockConfigBase } from '@plone/types';

import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

import text7SVG from '@redturtle/volto-blocks/icons/text7.svg';
import Text7View from '@redturtle/volto-blocks/components/blocks/Text7/View';
import { Text7Edit } from '@redturtle/volto-blocks/components/blocks/Text7';
import { Text7Schema } from '@redturtle/volto-blocks/components/blocks/Text7/schema';

type Text7Config = Omit<BlockConfigBase, 'blockSchema'> & {
  blockSchema: typeof Text7Schema;
};

declare module '@plone/types' {
  interface BlocksConfigData {
    text7: Text7Config;
  }
}
type RtBlocksConfig = Pick<BlocksConfigData, 'text7'>;

const defaultBlocksConfig = {
  restricted: false,
  mostUsed: false,
  security: {
    addPermission: [],
    view: [],
  },
  sidebarTab: 1,
  schema: BlockSettingsSchema,
} as const;

export const blocks: RtBlocksConfig = {
  text7: {
    ...defaultBlocksConfig,
    id: 'text7',
    title: 'Text 7',
    icon: text7SVG,
    group: 'text',
    view: Text7View,
    edit: Text7Edit,
    mostUsed: true,
    blockHasOwnFocusManagement: true,
    blockSchema: Text7Schema,
  },
} as const;
