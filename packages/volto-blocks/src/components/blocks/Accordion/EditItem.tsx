import { useState } from 'react';
import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';

import type { ArrayElement } from '@plone/types';

import { TextEditorWidget } from '@redturtle/volto-rt-slate';

import styles from '@redturtle/volto-blocks/components/blocks/Accordion/styles.module.css';
import arrowUpSVG from '@redturtle/volto-blocks/icons/arrow-up.svg';
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
  const [collapsed, setCollapsed] = useState(true);

  if (__SERVER__) {
    return <div />;
  }

  return (
    <div className={cx('block-accordion-item', styles.item)}>
      <TextEditorWidget
        className={cx('block-accordion-item-title', styles.itemTitle)}
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
      <button
        type="button"
        id={'accordion' + data['@id']}
        aria-expanded={!collapsed}
        aria-controls={'section' + data['@id']}
        onClick={() => setCollapsed(!collapsed)}
      >
        <Icon className="arrow-button" name={arrowUpSVG} size="6px" />
      </button>
      <div
        id={'section' + data['@id']}
        role="region"
        aria-labelledby={'accordion' + data['@id']}
        hidden={collapsed}
      >
        <TextEditorWidget
          className={cx('block-accordion-item-text', styles.itemText)}
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
