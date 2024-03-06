import type { FC, PropsWithChildren } from 'react';
import { Helmet } from 'react-helmet-async';

type LayoutType = 'default' | 'empty';

interface Props extends PropsWithChildren {
  title: string;
  type?: LayoutType;
}

const PageLayout: FC<Props> = ({ title, children, type = 'default' }) => (
  <>
    <Helmet>
      <title>{title}</title>
    </Helmet>
    {type === 'empty' && children}
  </>
);

export default PageLayout;
