import SEOHead from "@/components/MetaTagsHead/SEOHead";
import { Link, useRouteError, isRouteErrorResponse } from "react-router";

function ErrorPage() {
  const error = useRouteError();

  let title = "404 - Page Not Found";
  let description = "Sorry, we couldn't find the page you're looking for.";

  if (isRouteErrorResponse(error)) {
    title = `${error.status} - ${error.statusText}`;
    description = error.data?.message || description;
  }

  return (
    <>
      <SEOHead title="Error" description="Error Page" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-6 py-12 text-center">
        <h1 className="text-6xl font-bold text-gray-800">{title}</h1>
        <p className="mt-4 max-w-md text-lg text-gray-600">{description}</p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/"
            className="rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
          >
            Go back home
          </Link>
        </div>
      </div>
    </>
  );
}

export default ErrorPage;
