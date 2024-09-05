import { insertToolbarButtons } from '@redturtle/volto-slate-extras/config/Slate/utils';

export default function install(config) {
  const { slate } = config.settings;

  //aggiungo il bottone di underline alla toolbar, dopo bold
  insertToolbarButtons(['underline'], 'italic', slate);

  return config;
}
