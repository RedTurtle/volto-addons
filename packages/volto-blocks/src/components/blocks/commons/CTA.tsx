import { type ComponentProps } from 'react';
import { UniversalLink } from '@plone/volto/components';

const CTA = (props: ComponentProps<typeof UniversalLink>) => {
  return (
    <div className="blocks-cta">
      <UniversalLink {...props} />
    </div>
  );
};

export default CTA;
