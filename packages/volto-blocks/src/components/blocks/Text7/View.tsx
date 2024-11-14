import { flattenToAppURL } from '@plone/volto/helpers';
import { UniversalLink } from '@plone/volto/components';
import cx from 'classnames';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import type { BlockViewProps } from '@plone/types';

import styles from '@redturtle/volto-blocks/components/blocks/Text7/styles.module.css';
import type { Text7Data } from '@redturtle/volto-blocks/components/blocks/Text7/schema';

import config from '@plone/registry';
import CTA from '../commons/CTA';

type Props = BlockViewProps & {
  data: Text7Data;
};

export default function View({ data, className, style }: Props) {
  const img_column_width = data.img_column_width
    ? parseInt(data.img_column_width)
    : 6;

  const Container = config.getComponent('Container').component || 'div';
  const Image = config.getComponent('Image').component;

  return (
    <section
      className={cx('block-text7', styles.block, className)}
      style={style}
      aria-label={data.title}
    >
      <Container className={cx('block-text7-container', styles.container)}>
        <div
          className={cx(
            'block-text7-image-wrapper',
            `column-width-${img_column_width}`,
            styles['image-wrapper'],
            styles[`column-width-${img_column_width}`],
          )}
        >
          {data.images?.length > 0 &&
            data.images.map((img) => (
              <Image
                key={img['@id']}
                className={cx('block-text7-image', styles.image)}
                // TODO serialize image brain in the backend
                src={`${img.image}/@@images/image/large`}
                loading="lazy"
                alt=""
              />
            ))}
        </div>
        <div
          className={cx(
            'block-text7-body',
            `column-width-${12 - img_column_width}`,
            styles.body,
            styles[`column-width-${12 - img_column_width}`],
          )}
        >
          {data.title && (
            <h2 className={cx('block-text7-title', styles.title)}>
              {data.title}
            </h2>
          )}
          {data.text && (
            <div className={cx('block-text7-text', styles.text)}>
              <TextBlockView data={{ value: data.text ?? {} }} />
            </div>
          )}
          {data.linkHref?.[0] && (
            <CTA
              href={
                data.linkHref
                  ? flattenToAppURL(data.linkHref[0]['@id'])
                  : undefined
              }
              linkTitle={data.linkTitle}
              openLinkInNewTab={false}
              {...data}
            />
          )}
        </div>
      </Container>
    </section>
  );
}
