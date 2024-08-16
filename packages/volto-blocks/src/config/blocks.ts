import type { BlocksConfigData } from '@plone/types';

import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

import text7SVG from '@redturtle/volto-blocks/icons/text7.svg';
import Text7View from '@redturtle/volto-blocks/components/blocks/Text7/View';
import { Text7Edit } from '@redturtle/volto-blocks/components/blocks/Text7';
import {
  Text7Schema,
  type Text7Config,
} from '@redturtle/volto-blocks/components/blocks/Text7/schema';

import TestimonialsView from '@redturtle/volto-blocks/components/blocks/Testimonials/View';
import { TestimonialsEdit } from '@redturtle/volto-blocks/components/blocks/Testimonials';
import {
  TestimonialsSchema,
  type TestimonialsConfig,
} from '@redturtle/volto-blocks/components/blocks/Testimonials/schema';

declare module '@plone/types' {
  interface BlocksConfigData {
    text7: Text7Config;
    testimonials: TestimonialsConfig;
  }
}

type RtBlocksConfig = Pick<BlocksConfigData, 'text7' | 'testimonials'>;

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
  testimonials: {
    ...defaultBlocksConfig,
    id: 'testimonials',
    title: 'Testimonials',
    icon: text7SVG,
    group: 'text',
    view: TestimonialsView,
    edit: TestimonialsEdit,
    blockHasOwnFocusManagement: true,
    blockSchema: TestimonialsSchema,
  },
} as const;
