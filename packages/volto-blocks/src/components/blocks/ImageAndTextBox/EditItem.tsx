import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

import type { ArrayElement } from '@plone/types';

import type { ImageAndTextBoxData } from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/schema';
import styles from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/styles.module.css';

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

  if (__SERVER__) {
    return <div />;
  }

  return <div className={cx('block-imageandtextbox', styles.item)}>BOX</div>;
}

const messages = defineMessages({});
