import { useIntl, defineMessages } from 'react-intl';
import cx from 'classnames';
import { SidebarPortal, Icon } from '@plone/volto/components';
import { BlockDataForm } from '@plone/volto/components/manage/Form';

import type { BlockEditProps } from '@plone/types';

import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-slate-extras';

import styles from '@redturtle/volto-blocks/components/blocks/Accordion/styles.module.css';
import blockIcon from '@plone/volto/icons/list-arrows.svg';
import EditItem from '@redturtle/volto-blocks/components/blocks/Accordion/EditItem';
import type { AccordionData } from '@redturtle/volto-blocks/components/blocks/Accordion/schema';

import config from '@plone/registry';

type AccordionEditProps = BlockEditProps & {
  data: AccordionData;
};

export default function Edit(props: AccordionEditProps) {
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

  return (
    <>
      <section
        className={cx('block-accordion', styles.block)}
        aria-label={data.title}
      >
        <Container
          className={cx('block-accordion-container', styles.container)}
        >
          <TextEditorWidget
            {...props}
            className={cx('block-accordion-title', styles.title)}
            as="h2"
            data={data}
            fieldName="title"
            selected={selected && selectedField === 'title'}
            setSelected={setSelectedField}
            focusNextField={
              data.items?.length > 0
                ? () => {
                    setSelectedField('title' + data.items[0]['@id']);
                  }
                : undefined
            }
            showToolbar={false}
            placeholder={intl.formatMessage(messages.title)}
            onFocusPreviousBlock={onFocusPreviousBlock}
            onFocusNextBlock={onFocusNextBlock}
          />
          <div className={cx('block-accordion-wrapper', styles.wrapper)}>
            {data.items?.length > 0 &&
              data.items.map((item) => (
                <EditItem
                  key={item['@id']}
                  data={item}
                  focusOn={selectedField}
                  setFocusOn={setSelectedField}
                  onChange={(id, field, value) => {
                    onChangeBlock(block, {
                      ...data,
                      items: data.items.map((i) =>
                        i['@id'] === id ? { ...i, [field]: value } : i,
                      ),
                    });
                  }}
                  // @ts-expect-error TODO fix type in @plone/types
                  selected={selected}
                />
              ))}
          </div>
        </Container>
      </section>
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
});
