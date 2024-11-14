import { type ComponentProps } from 'react';
import { UniversalLink } from '@plone/volto/components';

const CTA = (props: ComponentProps<typeof UniversalLink>) => {
  const { href, linkTitle, onClick, openLinkInNewTab } = props;
  return (
    <div>
      <UniversalLink
        href={href}
        openLinkInNewTab={openLinkInNewTab}
        onClick={onClick}
        {...props}
      >
        {linkTitle}
      </UniversalLink>
    </div>
  );
};

export default CTA;
