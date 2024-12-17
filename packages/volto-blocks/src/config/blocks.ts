import type { BlocksConfigData } from '@plone/types';

import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

import accordionSVG from '@plone/volto/icons/list-arrows.svg';
import { AccordionEdit } from '@redturtle/volto-blocks/components/blocks/Accordion';
import {
  AccordionSchema,
  type AccordionConfig,
} from '@redturtle/volto-blocks/components/blocks/Accordion/schema';
import AccordionView from '@redturtle/volto-blocks/components/blocks/Accordion/View';

import { PageIntroEdit } from '@redturtle/volto-blocks/components/blocks/PageIntro';
import {
  PageIntroSchema,
  type PageIntroConfig,
} from '@redturtle/volto-blocks/components/blocks/PageIntro/schema';
import PageIntroView from '@redturtle/volto-blocks/components/blocks/PageIntro/View';
import pageintroSVG from '@redturtle/volto-blocks/icons/pageintro.svg';

import { CallToActionEdit } from '@redturtle/volto-blocks/components/blocks/CallToAction';
import {
  CallToActionSchema,
  type CallToActionConfig,
} from '@redturtle/volto-blocks/components/blocks/CallToAction/schema';
import CallToActionView from '@redturtle/volto-blocks/components/blocks/CallToAction/View';
import calltoactionSVG from '@redturtle/volto-blocks/icons/calltoaction.svg';

import { CardWithImagesEdit } from '@redturtle/volto-blocks/components/blocks/CardWithImages';
import {
  CardWithImagesSchema,
  type CardWithImagesConfig,
} from '@redturtle/volto-blocks/components/blocks/CardWithImages/schema';
import CardWithImagesView from '@redturtle/volto-blocks/components/blocks/CardWithImages/View';
import CardWithImagesSVG from '@redturtle/volto-blocks/icons/cardwithimages.svg';

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
    // accordion: AccordionConfig;
    pageintro: PageIntroConfig;
    calltoaction: CallToActionConfig;
    cardwithimages: CardWithImagesConfig;
    testimonials: TestimonialsConfig;
    iconsandtext: IconsAndTextConfig;
  }
}

type RtBlocksConfig = Pick<
  BlocksConfigData,
  | 'accordion'
  | 'pageintro'
  | 'calltoaction'
  | 'cardwithimages'
  | 'testimonials'
  | 'iconsandtext'
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
  accordion: {
    ...defaultBlocksConfig,
    id: 'accordion',
    title: 'Accordion',
    icon: accordionSVG,
    group: 'common',
    view: AccordionView,
    edit: AccordionEdit,
    blockHasOwnFocusManagement: true,
    blockSchema: AccordionSchema,
  },
  pageintro: {
    ...defaultBlocksConfig,
    id: 'pageintro',
    title: 'Page intro',
    icon: pageintroSVG,
    group: 'text',
    view: PageIntroView,
    edit: PageIntroEdit,
    blockHasOwnFocusManagement: true,
    blockSchema: PageIntroSchema,
  },
  calltoaction: {
    ...defaultBlocksConfig,
    id: 'calltoaction',
    title: 'Call To Action',
    icon: calltoactionSVG,
    group: 'text',
    view: CallToActionView,
    edit: CallToActionEdit,
    blockHasOwnFocusManagement: true,
    blockSchema: CallToActionSchema,
  },
  cardwithimages: {
    ...defaultBlocksConfig,
    id: 'cardwithimages',
    title: 'Card with Image',
    icon: CardWithImagesSVG,
    group: 'text',
    view: CardWithImagesView,
    edit: CardWithImagesEdit,
    mostUsed: true,
    blockHasOwnFocusManagement: true,
    blockSchema: CardWithImagesSchema,
  },
  testimonials: {
    ...defaultBlocksConfig,
    id: 'testimonials',
    title: 'Testimonials',
    icon: CardWithImagesSVG,
    group: 'text',
    view: TestimonialsView,
    edit: TestimonialsEdit,
    blockHasOwnFocusManagement: true,
    blockSchema: TestimonialsSchema,
  },
  iconsandtext: {
    ...defaultBlocksConfig,
    id: 'iconsandtext',
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
