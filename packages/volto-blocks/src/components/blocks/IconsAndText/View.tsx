import config from '@plone/registry';
import type { BlockViewProps } from '@plone/types';
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
import { UniversalLink } from '@plone/volto/components';
import ViewItem from '@redturtle/volto-blocks/components/blocks/IconsAndText/ViewItem';
import type { IconsAndTextData } from '@redturtle/volto-blocks/components/blocks/IconsAndText/schema';
import styles from '@redturtle/volto-blocks/components/blocks/IconsAndText/styles.module.scss';
import cx from 'classnames';
import React from 'react';

type Props = Omit<BlockViewProps, 'data'> & {
  data: IconsAndTextData;
};

export default function View({ data, className, style }: Props) {
  const column_number = data.column_number ? parseInt(data.column_number) : 3;

  const Container = config.getComponent('Container').component || 'div';
  const Image = config.getComponent('Image').component;

  return (
    <>
      <section
        className={cx('block-icons-text', styles.block_icons_text)}
        aria-label={data.title}
      >
        <Container className={cx('block-iconsandtext-container')}>
          <div
            className={cx(
              styles['block-content-header'],
              styles['header-align-center'],
              styles['image-wrapper'],
            )}
          >
            {data.title && (
              <h2
                className={cx('block-iconsandtext-title title', styles.title)}
              >
                {data.title}
              </h2>
            )}
            {data.text && (
              <div className={cx('block-iconsandtext-text', styles.text)}>
                <TextBlockView data={{ value: data.text ?? {} }} />
              </div>
            )}
          </div>
          <div
            className={cx(
              styles['block-columns-wrapper'],
              styles[`column-number-${column_number}`],
            )}
          >
            {data.columns?.length > 0 &&
              data.columns.map((item, i) => (
                <ViewItem key={item['@id']} data={item} />
              ))}
          </div>
          {data.linkHref?.[0] && (
            <div className={cx('block-testimonials-cta', styles.cta)}>
              <UniversalLink
                href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
                openLinkInNewTab={false}
                onClick={(e: React.SyntheticEvent<HTMLLinkElement>) => {
                  e.preventDefault();
                }}
              >
                {data.linkTitle}
              </UniversalLink>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
