import cx from 'classnames';

import type { ArrayElement } from '@plone/types';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { ImageAndTextBoxData } from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/schema';
import styles from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/styles.module.css';

type Props = {
  data: ArrayElement<ImageAndTextBoxData['boxes']>;
};

export default function ViewItem({ data }: Props) {
  return (
    <div className={cx(styles['block-imageandtextbox-box'])}>
      {data.title && (
        <div className={cx(styles['box-title'])}>
          {data.title && (
            <h3 className={cx('block-imageandtextbox-title', styles.title)}>
              {data.title}
            </h3>
          )}
        </div>
      )}
      {data.text && (
        <div className={cx('block-iconsandtext-text', styles.text)}>
          <TextBlockView data={{ value: data.text ?? {} }} />
        </div>
      )}
    </div>
  );
}
