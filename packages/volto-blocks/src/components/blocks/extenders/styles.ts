import { defineMessages, type IntlShape } from 'react-intl';
import { addStyling } from '@plone/volto/helpers/Extensions/withBlockSchemaEnhancer';
import type { JSONSchema } from '@plone/types';

export function addAlignmentStyle({
  schema,
  intl,
  formData,
  alignments = ['left', 'center', 'right'],
  defaultAlign = 'left',
}: {
  schema: JSONSchema;
  intl: IntlShape;
  formData: unknown;
  alignments?: string[];
  defaultAlign?: 'left' | 'center' | 'right';
}): JSONSchema {
  addStyling({ schema, intl, formData });

  // @ts-ignore
  schema.properties.styles.schema.properties.align = {
    widget: 'align',
    title: intl.formatMessage(messages.align),
    actions: alignments,
    default: defaultAlign,
  };

  // @ts-ignore
  schema.properties.styles.schema.fieldsets[0].fields = ['align'];

  return schema;
}

const messages = defineMessages({
  // copied from core teaser block
  align: {
    id: 'Alignment',
    defaultMessage: 'Alignment',
  },
});
