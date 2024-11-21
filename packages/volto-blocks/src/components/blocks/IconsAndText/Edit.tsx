import type { BlockEditProps } from '@plone/types';
import { Icon, SidebarPortal } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import EditItem from '@redturtle/volto-blocks/components/blocks/IconsAndText/EditItem';
import type { IconsAndTextData } from '@redturtle/volto-blocks/components/blocks/IconsAndText/schema';
import styles from '@redturtle/volto-blocks/components/blocks/IconsAndText/styles.module.scss';
import blockIcon from '@redturtle/volto-blocks/icons/icons_and_text.svg';
import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-slate-extras';
import cx from 'classnames';
import React, { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';

import config from '@plone/registry';
import CTA from '@redturtle/volto-blocks/components/blocks/commons/CTA';

type IconsAndTextEditProps = BlockEditProps & {
  data: IconsAndTextData;
};

export default function Edit(props: IconsAndTextEditProps) {
  const { data, selected, block, onChangeBlock, blocksConfig, blocksErrors } =
    props;
  const intl = useIntl();

  const column_number = data.column_number ? parseInt(data.column_number) : 3;

  const { selectedField, setSelectedField } = useHandleDetachedBlockFocus(
    props,
    'title',
  );

  useEffect(() => {
    if (!data?.columns || data?.columns?.length === 0) {
      onChangeBlock(block, {
        ...data,
        columns: [
          { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
          { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
          { '@id': uuid(), dividerPosition: 'before_title', iconSize: 's' },
        ],
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [block]);

  const schema = blocksConfig[data['@type']].blockSchema({
    data,
    intl,
  });

  if (__SERVER__) {
    return <div />;
  }

  const Container = config.getComponent('Container').component || 'div';

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
            )}
          >
            <TextEditorWidget
              {...props}
              className={cx('block-iconsandtext-title', styles.title)}
              as="h2"
              data={data}
              fieldName="title"
              selected={selected && selectedField === 'title'}
              setSelected={setSelectedField}
              focusNextField={() => {
                setSelectedField('text');
              }}
              showToolbar={false}
              placeholder={intl.formatMessage(messages.title)}
            />
            <TextEditorWidget
              {...props}
              fieldName="text"
              selected={selected && selectedField === 'text'}
              setSelected={setSelectedField}
              focusPrevField={() => {
                setSelectedField('title');
              }}
              placeholder={intl.formatMessage(messages.text)}
            />
          </div>
          <div
            className={cx(
              styles['block-columns-wrapper'],
              styles[`column-number-${column_number}`],
            )}
          >
            {data.columns?.length > 0 &&
              data.columns.map((item, i) => (
                <EditItem
                  key={item['@id']}
                  index={i}
                  data={item}
                  focusOn={selectedField}
                  setFocusOn={setSelectedField}
                  onChange={(id, field, value) => {
                    onChangeBlock(block, {
                      ...data,
                      columns: data.columns.map((i) =>
                        i['@id'] === id ? { ...i, [field]: value } : i,
                      ),
                    });
                  }}
                  // @ts-expect-error TODO fix type in @plone/types
                  selected={selected}
                />
              ))}
          </div>
          {data.linkHref?.[0] && (
            <CTA
              href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
              onClick={(e: React.SyntheticEvent<HTMLLinkElement>) => {
                e.preventDefault();
              }}
              openLinkInNewTab={false}
              {...data}
            >
              {data.linkTitle}
            </CTA>
          )}
        </Container>
      </section>
      {/* @ts-expect-error TODO fix */}
      <SidebarPortal selected={selected}>
        {schema && (
          <BlockDataForm
            icon={<Icon size="24px" name={blockIcon} />}
            schema={schema}
            title={schema.title}
            onChangeField={(id: string, value: unknown) => {
              onChangeBlock(block, {
                ...data,
                [id]: value,
              });
            }}
            onChangeBlock={onChangeBlock}
            formData={data}
            block={block}
            errors={blocksErrors}
          />
        )}
      </SidebarPortal>
    </>
  );
}

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title...',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Type text...',
  },
});
