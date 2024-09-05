import installAlignment from '@redturtle/volto-slate-extras/config/Slate/Alignment';
import installHeadings from '@redturtle/volto-slate-extras/config/Slate/Headings';
import installUnderline from '@redturtle/volto-slate-extras/config/Slate/Underline';
import installTextLarger from '@redturtle/volto-slate-extras/config/Slate/TextLarger';
import installLinkButton from '@redturtle/volto-slate-extras/config/Slate/LinkButton';

// import installHandlers from 'design-comuni-plone-theme/config/Slate/handlers';
import installDeserializers from '@redturtle/volto-slate-extras/config/Slate/deserializers';

export default function applyRTSlateConfig(config) {
  installAlignment(config);
  installHeadings(config);
  installUnderline(config);
  installTextLarger(config);
  installLinkButton(config);

  // installHandlers(config); //per il momento noon son stati copiati. Vediamo se servono nei blocchi detached.
  installDeserializers(config);

  return config;
}
