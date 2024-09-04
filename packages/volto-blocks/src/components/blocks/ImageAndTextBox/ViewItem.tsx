import cx from 'classnames';

import type { ArrayElement } from '@plone/types';

import type { ImageAndTextBoxData } from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/schema';
import styles from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/styles.module.css';

type Props = {
  data: ArrayElement<ImageAndTextBoxData['boxes']>;
};

export default function ViewItem({ data }: Props) {
  return <div className={cx('block-imageandtextbox', styles.item)}>BOX</div>;
}
