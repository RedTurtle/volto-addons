import type { BlockViewProps } from '@plone/types';
import { UniversalLink } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import cx from 'classnames';

import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { ImageAndTextBoxData } from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/schema';
import styles from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/styles.module.css';
import ViewItem from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/ViewItem';
import placeholder from './placeholder.png';

import config from '@plone/registry';

type Props = Omit<BlockViewProps, 'data'> & {
  data: ImageAndTextBoxData;
};

export default function View({ data, className, style }: Props) {
  const Container = config.getComponent('Container').component || 'div';
  const Image = config.getComponent('Image').component;

  return (
    <section
      className={cx('block-imageandtextbox', styles.imageandtextbox)}
      aria-label={data.title}
    >
      {data.image ? (
        <Image
          className={cx('block-imageandtextbox-image', styles.image)}
          // TODO serialize image brain in the backend
          src={`${data.image}/@@images/image/large`}
          loading="lazy"
          alt=""
        />
      ) : (
        <Image
          className={cx('block-imageandtextbox-image', styles.image)}
          // TODO serialize image brain in the backend
          src={placeholder}
          loading="lazy"
          alt=""
        />
      )}
      <Container className={cx(styles['block-imageandtextbox-container'])}>
        <div className={cx('box-wrapper', styles['box-wrapper'])}>
          {data.title && (
            <h2 className={cx('block-imageandtextbox-title', styles.title)}>
              {data.title}
            </h2>
          )}
          {data.text && (
            <div className={cx('block-imageandtextbox-text', styles.text)}>
              <TextBlockView data={{ value: data.text ?? {} }} />
            </div>
          )}
        </div>
        <div className={cx('block-imageandtextbox-boxes', styles.boxes)}>
          {data.boxes?.length > 0 &&
            data.boxes.map((item) => (
              <ViewItem key={item['@id']} data={item} />
            ))}
        </div>
        {data.linkHref?.[0] && (
          <div
            className={cx(
              'block-imageandtextbox-cta',
              styles['block-imageandtextbox-cta'],
            )}
          >
            <UniversalLink
              href={
                data.linkHref
                  ? flattenToAppURL(data.linkHref[0]['@id'])
                  : undefined
              }
              openLinkInNewTab={false}
            >
              {data.linkTitle}
            </UniversalLink>
          </div>
        )}
      </Container>
    </section>
  );
}
