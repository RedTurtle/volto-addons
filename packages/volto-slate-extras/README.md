# Volto Slate Extras (@redturtle/volto-slate-extras)

A Volto addon to add base Slate configuration to your site.
![Basic Slate configuration from this addon](/assets/images/basic_configuration.png)

[![npm](https://img.shields.io/npm/v/@redturtle/volto-slate-extras)](https://www.npmjs.com/package/@redturtle/volto-slate-extras)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://redturtle.github.io/volto-addons/)
[![Code analysis checks](https://github.com/redturtle/volto-addons/actions/workflows/code.yml/badge.svg)](https://github.com/redturtle/volto-addons/actions/workflows/code.yml)
[![Unit tests](https://github.com/redturtle/volto-addons/actions/workflows/unit.yml/badge.svg)](https://github.com/redturtle/volto-addons/actions/workflows/unit.yml)

## Settings

```jsx
config.settings['volto-slate-extras'] = {
  link_button_class: 'ui primary button', //bootstrap classes: 'btn btn-primary',
  link_enhancer: (element) => {},
};
```

- **link_button_class**: class to apply to style button links
- **link_enhancer**: component to henance link, for example with filename and file size extension

## Widgets

### TextEditorWidget

Widget to create a text editor in Volto's blocks. You could decide to use a

- simple text editor widget (without text formatting) (into the example below is the 'title' field)
- a Slate editor widget (with text formatting) with prop _showToolbar_ (into the example below is the 'text' field)

```jsx
import {
  TextEditorWidget,
  useHandleDetachedBlockFocus,
} from '@redturtle/volto-slate-extras';

const Edit = (props) => {
  const { data, onChangeBlock, block, selected, onSelectBlock, ...otherProps } =
    props;
  const { intl } = props;
  const { selectedField, setSelectedField } = useHandleDetachedBlockFocus(
    props,
    'title',
  );

  return (
    <>
      {/* Simple text editor widget */}
      <TextEditorWidget
        {...otherProps}
        as="h3"
        showToolbar={false}
        data={data} //block's data
        block={block} //block id
        fieldName="title"
        onChangeBlock={onChangeBlock}
        selected={selectedField === 'title'}
        placeholder={intl.formatMessage(messages.title)}
        setSelected={setSelectedField}
        focusNextField={() => {
          setSelectedField('text');
        }}
        onSelectBlock={onSelectBlock}
      />

      {/* Slate text editor widget */}
      <TextEditorWidget
        {...otherProps}
        data={data}
        fieldName="text"
        block={block}
        onSelectBlock={onSelectBlock}
        selected={selectedField === 'text'}
        placeholder={intl.formatMessage(messages.text)}
        onChangeBlock={onChangeBlock}
        setSelected={setSelectedField}
        focusPrevField={() => {
          setSelectedField('title');
        }}
      />
    </>
  );
};
```

### View value of TextEditorWidget in View components:

To view the value edited from TextEditorWidget:

- if it's a simple text (showToolbar=false) you simply do it with
  `jsx {data.title} `
- if it's a Slate widget (showToolbar=true) you could use TextBlockView from Volto:

```jsx
import { TextBlockView } from '@plone/volto-slate/blocks/Text';
<TextBlockView data={{ value: data.text }} />;
```
