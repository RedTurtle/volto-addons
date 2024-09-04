# volto-slate-extras

## Introduction

A Volto addon to add base Slate configuration to your site.
![Basic Slate configuration from this addon](/assets/images/basic_configuration.png)

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

## Development

You can develop an add-on in isolation using the boilerplate already provided by the add-on generator.
The project is configured to have the current add-on installed and ready to work with.
This is useful to bootstrap an isolated environment that can be used to quickly develop the add-on or for demo purposes.
It's also useful when testing an add-on in a CI environment.

```{note}
It's quite similar when you develop a Plone backend add-on in the Python side, and embed a ready to use Plone build (using buildout or pip) in order to develop and test the package.
```

The dockerized approach performs all these actions in a custom built docker environment:

1. Generates a vanilla project using the official Volto Yo Generator (@plone/generator-volto)
2. Configures it to use the add-on with the name stated in the `package.json`
3. Links the root of the add-on inside the created project

After that you can use the inner dockerized project, and run any standard Volto command for linting, acceptance test or unit tests using Makefile commands provided for your convenience.

### Setup the environment

Run once

```shell
make dev
```

which will build and launch the backend and frontend containers.
There's no need to build them again after doing it the first time unless something has changed from the container setup.

In order to make the local IDE play well with this setup, is it required to run once `yarn` to install locally the required packages (ESlint, Prettier, Stylelint).

Run

```shell
yarn
```

### Build the containers manually

Run

```shell
make build-backend
make build-addon
```

### Run the containers

Run

```shell
make start-dev
```

This will start both the frontend and backend containers.

### Stop Backend (Docker)

After developing, in order to stop the running backend, don't forget to run:

Run

```shell
make stop-backend
```

### Linting

Run

```shell
make lint
```

### Formatting

Run

```shell
make format
```

### i18n

Run

```shell
make i18n
```

### Unit tests

Run

```shell
make test
```

### Acceptance tests

Run once

```shell
make install-acceptance
```

For starting the servers

Run

```shell
make start-test-acceptance-server
```

The frontend is run in dev mode, so development while writing tests is possible.

Run

```shell
make test-acceptance
```

To run Cypress tests afterwards.

When finished, don't forget to shutdown the backend server.

```shell
make stop-test-acceptance-server
```

### Release

Run

```shell
make release
```

For releasing a RC version

Run

```shell
make release-rc
```
