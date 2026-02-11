import { useNavigate } from 'react-router';

export function LoginGate() {
  const navigate = useNavigate();

  return (
    <div className="border border-[#E7E5E4] sm:border-[#E7E5E4] border-dashed sm:border-solid bg-[#FAFAF9] rounded-xl sm:rounded-xl rounded-[12px] p-8 sm:p-8 p-4 text-center mb-3">
      <h3 className="text-[18px] sm:text-[18px] text-[14px] font-semibold text-[#1C1917] mb-2">
        Save your tracker
      </h3>
      <p className="text-[14px] sm:text-[14px] text-[12px] leading-[16px] sm:leading-normal text-[#78716C] mb-6 sm:mb-6 mb-3 max-w-[400px] sm:max-w-[400px] max-w-none mx-auto">
        Sign in to keep your entries across devices and add unlimited rows.
      </p>
      <button
        onClick={() => navigate('/login')}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-3 h-12 sm:h-12 h-11 px-8 sm:px-8 px-6 bg-[#1C1917] text-white rounded-lg sm:rounded-lg rounded-[22px] text-[15px] sm:text-[15px] text-[13px] font-medium transition-all duration-200 hover:bg-[#292524]"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="sm:block hidden">
          <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
          <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
          <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
          <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
        </svg>
        <svg width="16" height="16" viewBox="0 0 20 20" fill="none" className="sm:hidden">
          <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
          <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
          <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
          <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
        </svg>
        Continue with Google
      </button>
      <p className="mt-4 sm:mt-4 mt-3 text-[13px] sm:text-[13px] text-[11px] text-[#A8A29E]">
        Takes less than 10 seconds.
      </p>
    </div>
  );
}