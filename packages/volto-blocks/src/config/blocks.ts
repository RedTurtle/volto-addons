import type { BlocksConfigData } from '@plone/types';

import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

import { Text1Edit } from '@redturtle/volto-blocks/components/blocks/Text1';
import {
  Text1Schema,
  type Text1Config,
} from '@redturtle/volto-blocks/components/blocks/Text1/schema';
import Text1View from '@redturtle/volto-blocks/components/blocks/Text1/View';
import text1SVG from '@redturtle/volto-blocks/icons/text1.svg';

import { Text6Edit } from '@redturtle/volto-blocks/components/blocks/Text6';
import {
  Text6Schema,
  type Text6Config,
} from '@redturtle/volto-blocks/components/blocks/Text6/schema';
import Text6View from '@redturtle/volto-blocks/components/blocks/Text6/View';
import text6SVG from '@redturtle/volto-blocks/icons/text6.svg';

import { Text7Edit } from '@redturtle/volto-blocks/components/blocks/Text7';
import {
  Text7Schema,
  type Text7Config,
} from '@redturtle/volto-blocks/components/blocks/Text7/schema';
import Text7View from '@redturtle/volto-blocks/components/blocks/Text7/View';
import text7SVG from '@redturtle/volto-blocks/icons/text7.svg';

import { TestimonialsEdit } from '@redturtle/volto-blocks/components/blocks/Testimonials';
import {
  TestimonialsSchema,
  type TestimonialsConfig,
} from '@redturtle/volto-blocks/components/blocks/Testimonials/schema';
import TestimonialsView from '@redturtle/volto-blocks/components/blocks/Testimonials/View';

import { IconsAndTextEdit } from '@redturtle/volto-blocks/components/blocks/IconsAndText';
import {
  IconsAndTextSchema,
  type IconsAndTextConfig,
} from '@redturtle/volto-blocks/components/blocks/IconsAndText/schema';
import IconsAndTextView from '@redturtle/volto-blocks/components/blocks/IconsAndText/View';
import iconsAndTextSVG from '@redturtle/volto-blocks/icons/icons_and_text.svg';

declare module '@plone/types' {
  interface BlocksConfigData {
    text1: Text1Config;
    text6: Text6Config;
    text7: Text7Config;
    testimonials: TestimonialsConfig;
    iconandtext: IconsAndTextConfig;
  }
}

type RtBlocksConfig = Pick<
  BlocksConfigData,
  'text1' | 'text6' | 'text7' | 'testimonials' | 'iconandtext'
>;

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
  text1: {
    ...defaultBlocksConfig,
    id: 'text1',
    title: 'Text 1',
    icon: text1SVG,
    group: 'text',
    view: Text1View,
    edit: Text1Edit,
    blockHasOwnFocusManagement: true,
    blockSchema: Text1Schema,
  },
  text6: {
    ...defaultBlocksConfig,
    id: 'text6',
    title: 'Text 6',
    icon: text6SVG,
    group: 'text',
    view: Text6View,
    edit: Text6Edit,
    blockHasOwnFocusManagement: true,
    blockSchema: Text6Schema,
  },
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
  iconandtext: {
    ...defaultBlocksConfig,
    id: 'iconandtext',
    title: 'Icon & Text',
    icon: iconsAndTextSVG,
    group: 'text',
    mostUsed: true,
    view: IconsAndTextView,
    edit: IconsAndTextEdit,
    blockHasOwnFocusManagement: true,
    blockSchema: IconsAndTextSchema,
  },
} as const;
