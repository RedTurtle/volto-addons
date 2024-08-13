import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
// import { isEqual } from 'lodash';
// import { Input, Button, Message, Grid, Image } from 'semantic-ui-react';
import { flattenToAppURL } from '@plone/volto/helpers';
import { SidebarPortal, Icon, UniversalLink } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

import '@plone/components/src/styles/basic/TextField.css';
import '@plone/components/src/styles/quanta/TextField.css';
import type { BlockEditProps } from '@plone/types';

import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-rt-slate';

import styles from '@redturtle/volto-blocks/components/blocks/Text7/styles.module.css';
import blockIcon from '@redturtle/volto-blocks/icons/text7.svg';
import type { Text7Data } from '@redturtle/volto-blocks/components/blocks/Text7/schema';

import config from '@plone/registry';

type Text7EditProps = Omit<BlockEditProps, 'data'> & {
  data: Text7Data;
};

export default function Edit(props: Text7EditProps) {
  const {
    data,
    selected,
    block,
    onChangeBlock,
    // editable,
    blocksConfig,
    // navRoot,
    // contentType,
    // blocksErrors,
  } = props;
  const intl = useIntl();

  const img_column_width = data.img_column_width
    ? parseInt(data.img_column_width)
    : 6;

  const { selectedField, setSelectedField } = useHandleDetachedBlockFocus(
    props,
    'title',
  );

  const schema = blocksConfig[data['@type']].blockSchema({
    data,
    intl,
  });

  if (__SERVER__) {
    return <div />;
  }

  const Container = config.getComponent('Container').component || 'div';
  const Image = config.getComponent('Image').component;

  return (
    <>
      <section
        className={cx('block-text7', styles.block)}
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
            {data.image ? (
              <Image
                className={cx('block-text7-image', styles.image)}
                // TODO serialize image brain in the backend
                src={`${data.image}/@@images/image/large`}
                loading="lazy"
                alt=""
              />
            ) : (
              <div className="image-add">Upload image</div>
            )}
          </div>
          <div
            className={cx(
              'block-text7-body',
              `column-width-${12 - img_column_width}`,
              styles.body,
              styles[`column-width-${12 - img_column_width}`],
            )}
          >
            <TextEditorWidget
              {...props}
              className={cx('block-text7-title', styles.title)}
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
            {data.linkHref?.[0] && (
              <div className={cx('block-text7-cta', styles.cta)}>
                <UniversalLink
                  href={
                    data.linkHref
                      ? flattenToAppURL(data.linkHref[0]['@id'])
                      : undefined
                  }
                  openLinkInNewTab={false}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                >
                  {data.linkTitle}
                </UniversalLink>
              </div>
            )}
          </div>
        </Container>
      </section>
      {/* @ts-ignore TODO */}
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
            // blocksConfig={blocksConfig}
            // headerActions={HeaderActions}
            // actionButton={data.overwrite && ActionButton}
            // navRoot={navRoot}
            // contentType={contentType}
            // errors={blocksErrors}
          />
        )}
      </SidebarPortal>
    </>
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
  // placeholder: {
  //   id: 'Upload a new image',
  //   defaultMessage: 'Upload a new image',
  // },
  // image: {
  //   id: 'Image',
  //   defaultMessage: 'Image',
  // },
});
