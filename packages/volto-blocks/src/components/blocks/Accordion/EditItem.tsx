import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';

import type { ArrayElement } from '@plone/types';

import { TextEditorWidget } from '@redturtle/volto-slate-extras';

import styles from '@redturtle/volto-blocks/components/blocks/Accordion/styles.module.css';
import type { AccordionData } from '@redturtle/volto-blocks/components/blocks/Accordion/schema';

type Props = {
  data: ArrayElement<AccordionData['items']>;
  focusOn: string;
  setFocusOn: Function;
  onChange: (id: string, field: string, value: unknown) => void;
  selected: boolean;
};

export default function EditItem({
  data,
  focusOn,
  setFocusOn,
  onChange,
  selected,
}: Props) {
  const intl = useIntl();

  if (__SERVER__) {
    return <div />;
  }

  return (
    <div className={cx('block-accordion-item', styles.item)}>
      <TextEditorWidget
        wrapClass={cx('block-accordion-item-title', styles.itemTitle)}
        as="h3"
        block={data['@id']}
        data={data}
        fieldName="title"
        selected={selected && focusOn === 'title' + data['@id']}
        setSelected={() => setFocusOn('title' + data['@id'])}
        onChangeBlock={(id: string, value: { title: string }) => {
          onChange(id, 'title', value.title);
        }}
        showToolbar={false}
        placeholder={intl.formatMessage(messages.title)}
      />
      <TextEditorWidget
        wrapClass={cx('block-accordion-item-text', styles.itemText)}
        as="div"
        block={data['@id']}
        data={data}
        fieldName="text"
        selected={selected && focusOn === 'text' + data['@id']}
        setSelected={() => setFocusOn('text' + data['@id'])}
        onChangeBlock={(id: string, value: { text: string }) => {
          onChange(id, 'text', value.text);
        }}
        placeholder={intl.formatMessage(messages.text)}
      />
    </div>
  );
}

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
});
