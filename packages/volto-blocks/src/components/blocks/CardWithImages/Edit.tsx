import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { SidebarPortal, Icon, UniversalLink } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

import type { BlockEditProps } from '@plone/types';

import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-slate-extras';

import styles from '@redturtle/volto-blocks/components/blocks/CardWithImages/styles.module.css';
import blockIcon from '@redturtle/volto-blocks/icons/cardwithimages.svg';
import type { CardWithImagesData } from '@redturtle/volto-blocks/components/blocks/CardWithImages/schema';

import config from '@plone/registry';
import CTA from '../commons/CTA';

type CardWithImagesEditProps = BlockEditProps & {
  data: CardWithImagesData;
};

export default function Edit(props: CardWithImagesEditProps) {
  const { data, selected, block, onChangeBlock, blocksConfig, blocksErrors } =
    props;
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
        className={cx('block-cardiwithimages', styles.block)}
        aria-label={data.title}
      >
        <Container
          className={cx('block-cardiwithimages-container', styles.container)}
        >
          <div
            className={cx(
              'block-tecardiwithimagesxt7-image-wrapper',
              `column-width-${img_column_width}`,
              styles['image-wrapper'],
              styles[`column-width-${img_column_width}`],
            )}
          >
            {data.images?.length > 0 ? (
              data.images.map((img) => (
                <Image
                  key={img['@id']}
                  className={cx('block-cardiwithimages-image', styles.image)}
                  // TODO serialize image brain in the backend
                  src={`${img.image}/@@images/image/large`}
                  loading="lazy"
                  alt=""
                />
              ))
            ) : (
              <div className="image-add">Upload image</div>
            )}
          </div>
          <div
            className={cx(
              'block-cardiwithimages-body',
              `column-width-${12 - img_column_width}`,
              styles.body,
              styles[`column-width-${12 - img_column_width}`],
            )}
          >
            <TextEditorWidget
              {...props}
              className={cx('block-cardiwithimages-title', styles.title)}
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
              <CTA
                href={data.linkHref ? data.linkHref[0]['@id'] : undefined}
                linkTitle={data.linkTitle}
                onClick={(e: React.SyntheticEvent<HTMLLinkElement>) => {
                  e.preventDefault();
                }}
                openLinkInNewTab={false}
                {...data}
              />
            )}
          </div>
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
