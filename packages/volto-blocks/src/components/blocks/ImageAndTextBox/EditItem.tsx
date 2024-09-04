import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

import type { ArrayElement } from '@plone/types';

import type { ImageAndTextBoxData } from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/schema';
import styles from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/styles.module.css';
import { TextEditorWidget } from '@redturtle/volto-rt-slate';

type Props = {
  data: ArrayElement<ImageAndTextBoxData['boxes']>;
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

  return (
    <div className={cx(styles['block-imageandtextbox-box'])}>
      <TextEditorWidget
        wrapClass={cx('block-imageandtextbox-box-title')}
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
        wrapClass={cx('block-accordion-item-text')}
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
