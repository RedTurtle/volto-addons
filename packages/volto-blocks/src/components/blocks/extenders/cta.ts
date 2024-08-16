import { defineMessages, type IntlShape } from 'react-intl';
import find from 'lodash/find';
import isEmpty from 'lodash/isEmpty';
import type { JSONSchema } from '@plone/types';

export interface CtaBlockExtender {
  // TODO fix any
  linkHref?: any;
  linkTitle?: string;
}

export const addCtaFieldset = ({
  schema,
  intl,
}: {
  schema: JSONSchema;
  intl: IntlShape;
}): JSONSchema => {
  if (isEmpty(find(schema.fieldsets, { id: 'cta' }))) {
    schema.fieldsets.push({
      id: 'cta',
      title: intl.formatMessage(messages.cta_fieldset_title),
      fields: ['linkHref', 'linkTitle'],
    });

    // @ts-ignore
    schema.properties.linkHref = {
      title: intl.formatMessage(messages.LinkTo),
      widget: 'object_browser',
      mode: 'link',
      selectedItemAttrs: ['Title', 'Description'],
      allowExternals: true,
    };

    // @ts-ignore
    schema.properties.linkTitle = {
      title: intl.formatMessage(messages.LinkTitle),
      default: intl.formatMessage(messages.cta_title_default),
    };
  }

  return schema;
};

const messages = defineMessages({
  cta_fieldset_title: {
    id: 'redturtle__volto-blocks__cta_fieldset_title',
    defaultMessage: 'Call to action',
  },
  // copied from core listing block
  LinkTitle: {
    id: 'Link title',
    defaultMessage: 'Link Title',
  },
  // copied from core listing block
  LinkTo: {
    id: 'Link to',
    defaultMessage: 'Link to',
  },
  cta_title_default: {
    id: 'redturtle__volto-blocks__cta_title_default',
    defaultMessage: 'Read more',
  },
});
