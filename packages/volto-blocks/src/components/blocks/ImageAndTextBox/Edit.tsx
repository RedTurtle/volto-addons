import { Icon, SidebarPortal } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

import type { BlockEditProps } from '@plone/types';

import type { ImageAndTextBoxData } from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/schema';
import styles from '@redturtle/volto-blocks/components/blocks/ImageAndTextBox/styles.module.css';
import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-rt-slate';

import config from '@plone/registry';
// import EditItem from './EditItem';

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
        <Container
          className={cx(
            'block-imageandtextbox-container',
            styles['block-imageandtextbox-container'],
          )}
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
            <div className="image-add">Upload image</div>
          )}
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
            {/* {data.boxes ? <EditItem /> : ''} */}
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
