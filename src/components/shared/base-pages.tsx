import { ModeToggle } from './theme-toggle';
import PageHead from '@/components/shared/page-head.jsx';
import { Breadcrumbs } from '@/components/shared/breadcrumbs';

interface IBasePages {
  children?: React.ReactNode;
  className?: string;
  pageHead?: string;
  breadcrumbs?: { title: string; link: string }[];
}

const BasePages = ({
  children,
  className,
  pageHead,
  breadcrumbs
}: IBasePages) => {
  return (
    <>
      <PageHead title={pageHead} />
      <div className={className}>
        <div className="hidden items-center justify-between md:flex md:pr-8">
          <div> {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}</div>
          <div className="flex items-center justify-center">
            <ModeToggle />
          </div>
        </div>
        {children}
      </div>
    </>
  );
};

export default BasePages;
