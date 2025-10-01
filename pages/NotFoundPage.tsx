
import React from 'react';
import PageWrapper from '../components/animations/PageWrapper';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const NotFoundPage: React.FC = () => {
  return (
    <PageWrapper key="not-found">
      <div className="text-center py-20">
        <h1 className="text-6xl font-bold text-indigo-500">404</h1>
        <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">Page Not Found</h2>
        <p className="mt-6 text-base leading-7 text-gray-400">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10">
          <Button asChild>
            <Link to="/">Go back home</Link>
          </Button>
        </div>
      </div>
    </PageWrapper>
  );
};

// Button component needs to be adapted to accept 'asChild' prop for composition
const OriginalButton = React.lazy(() => import('../components/ui/Button'));

const PatchedButton = React.forwardRef<HTMLButtonElement, React.ComponentProps<typeof OriginalButton> & { asChild?: boolean }>(
  ({ asChild = false, ...props }, ref) => {
    if (asChild) {
      // This is a simplified implementation for Link composition.
      // A full implementation would use React.cloneElement.
      const { children, ...rest } = props;
      return React.cloneElement(children as React.ReactElement, {
        ref,
        ...rest,
        className: `inline-flex items-center justify-center rounded-md font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20 px-4 py-2 text-sm`
      });
    }
    return <React.Suspense fallback={null}><OriginalButton ref={ref} {...props} /></React.Suspense>;
  }
);
PatchedButton.displayName = 'PatchedButton';

// Re-export PatchedButton to be used in NotFoundPage
(Button as any) = PatchedButton;

export default NotFoundPage;
