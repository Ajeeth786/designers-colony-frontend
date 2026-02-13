import { useRouteError, isRouteErrorResponse } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();

  let title = "Something went wrong";
  let message = "Please try again or go back to home.";

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      title = "Page not found";
      message = "The page you’re looking for doesn’t exist.";
    }
  }

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
      <div className="text-center max-w-[360px]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#F5F5F4]">
          ⚠️
        </div>

        <h1 className="mb-2 text-[18px] font-semibold text-[#1C1917]">
          {title}
        </h1>

        <p className="mb-6 text-[14px] text-[#78716C]">
          {message}
        </p>

        <a
          href="/"
          className="inline-block rounded-full bg-[#1C1917] px-6 py-2 text-[14px] text-white hover:bg-[#292524]"
        >
          Go to home
        </a>
      </div>
    </div>
  );
}
