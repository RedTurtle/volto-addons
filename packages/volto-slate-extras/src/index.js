import applyRTSlateConfig from '@redturtle/volto-slate-extras/config/Slate/config';
import TextEditorWidget from '@redturtle/volto-slate-extras/components/Widgets/TextEditorWidget/TextEditorWidget';
import { useHandleDetachedBlockFocus } from '@redturtle/volto-slate-extras/helpers/blocks';
import './main.css';

export { TextEditorWidget, useHandleDetachedBlockFocus };

const applyConfig = (config) => {
  config.settings.openExternalLinkInNewTab = true;
  applyRTSlateConfig(config);
  config.settings['@redturtle/volto-slate-extras'] = {
    link_button_class: 'ui primary button', //bootstrap classes: 'btn btn-primary',
    link_enhancer: (element) => {},
  };
  return config;
};

export default applyConfig;
