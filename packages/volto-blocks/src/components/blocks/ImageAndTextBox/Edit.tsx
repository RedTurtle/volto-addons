import type { BlockEditProps } from '@plone/types';
import { Icon, SidebarPortal, UniversalLink } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';
import placeholder from './placeholder.png';

import type { ImageAndTextBoxData } from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/schema';
import styles from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/styles.module.css';
import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-rt-slate';

import config from '@plone/registry';
import EditItem from './EditItem';

type ImageAndTextBoxEditProps = Omit<BlockEditProps, 'data'> & {
  data: ImageAndTextBoxData;
};

export default function Edit(props: ImageAndTextBoxEditProps) {
  const {
    data,
    selected,
    block,
    onChangeBlock,
    blocksConfig,
    blocksErrors,
    onFocusPreviousBlock,
    onFocusNextBlock,
  } = props;
  const intl = useIntl();

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
            <TextEditorWidget
              {...props}
              className={cx('block-imageandtextbox-title', styles.title)}
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
              onFocusPreviousBlock={onFocusPreviousBlock}
              onFocusNextBlock={onFocusNextBlock}
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
              onFocusPreviousBlock={onFocusPreviousBlock}
              onFocusNextBlock={onFocusNextBlock}
            />
            <div className={cx('block-imageandtextbox-boxes', styles.boxes)}>
              {data.boxes?.length > 0 &&
                data.boxes.map((item) => (
                  <EditItem
                    data={item}
                    focusOn={selectedField}
                    setFocusOn={setSelectedField}
                    onChange={(id, field, value) => {
                      onChangeBlock(block, {
                        ...data,
                        boxes: data.boxes.map((i) =>
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
              <div className={cx(styles['block-imageandtextbox-cta'])}>
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
          </div>
        </Container>
      </section>
      {/* @ts-expect-error TODO */}
      <SidebarPortal selected={selected}>
        {schema && (
          <BlockDataForm
            icon={<Icon size="24px" name={'blockIcon'} />}
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
    defaultMessage: 'Title',
  },
  text: {
    id: 'Text',
    defaultMessage: 'Text',
  },
});
