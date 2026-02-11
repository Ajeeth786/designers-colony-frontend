import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth.tsx';

export function LoginScreen() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleGoogleLogin = () => {
    // Simulate Google login (replace with real OAuth in production)
    login();
    // Direct to tracker immediately - no success screen
    navigate('/tracker');
  };

  return (
    <div className="min-h-screen bg-[#FAFAF9] flex items-center justify-center px-6">
      <div className="max-w-[480px] w-full">
        {/* Title */}
        <h1 className="text-[32px] font-semibold text-[#1C1917] leading-[1.2] tracking-[-0.02em] text-center mb-4">
          Your personal job tracker
        </h1>

        {/* Subtext */}
        <p className="text-[16px] font-normal text-[#78716C] leading-[1.6] text-center mb-10">
          Keep track of where you've applied, interview rounds, and what you're learning — privately.
        </p>

        {/* Blurred Table Preview */}
        <div className="mb-10 overflow-hidden rounded-xl border border-[#E7E5E4] bg-white opacity-60 blur-[2px] pointer-events-none">
          <div className="p-6">
            <div className="grid grid-cols-3 gap-4 pb-3 border-b border-[#E7E5E4] mb-3">
              <div className="text-[13px] font-medium text-[#78716C]">Company</div>
              <div className="text-[13px] font-medium text-[#78716C]">Role</div>
              <div className="text-[13px] font-medium text-[#78716C]">Current Stage</div>
            </div>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="grid grid-cols-3 gap-4">
                  <div className="h-8 bg-[#F5F5F4] rounded"></div>
                  <div className="h-8 bg-[#F5F5F4] rounded"></div>
                  <div className="h-8 bg-[#F5F5F4] rounded"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bullet Points */}
        <div className="mb-10 space-y-2">
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#78716C] mt-2"></div>
            <p className="text-[15px] font-normal text-[#57534E]">Private to you</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#78716C] mt-2"></div>
            <p className="text-[15px] font-normal text-[#57534E]">No recruiters</p>
          </div>
          <div className="flex items-start gap-3">
            <div className="w-1.5 h-1.5 rounded-full bg-[#78716C] mt-2"></div>
            <p className="text-[15px] font-normal text-[#57534E]">No profiles or resumes</p>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full h-12 bg-[#1C1917] text-white rounded-lg text-[15px] font-medium transition-all duration-200 hover:bg-[#292524] flex items-center justify-center gap-3"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M19.6 10.227c0-.709-.064-1.39-.182-2.045H10v3.868h5.382a4.6 4.6 0 01-1.996 3.018v2.51h3.232c1.891-1.742 2.982-4.305 2.982-7.35z" fill="#4285F4"/>
            <path d="M10 20c2.7 0 4.964-.895 6.618-2.423l-3.232-2.509c-.895.6-2.04.955-3.386.955-2.605 0-4.81-1.76-5.595-4.123H1.064v2.59A9.996 9.996 0 0010 20z" fill="#34A853"/>
            <path d="M4.405 11.9c-.2-.6-.314-1.24-.314-1.9 0-.66.114-1.3.314-1.9V5.51H1.064A9.996 9.996 0 000 10c0 1.614.386 3.14 1.064 4.49l3.34-2.59z" fill="#FBBC05"/>
            <path d="M10 3.977c1.468 0 2.786.505 3.823 1.496l2.868-2.868C14.959.99 12.695 0 10 0 6.09 0 2.71 2.24 1.064 5.51l3.34 2.59C5.19 5.736 7.395 3.977 10 3.977z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </button>

        {/* Privacy Note */}
        <p className="mt-4 text-[13px] font-normal text-[#A8A29E] text-center">
          We don't post anything without permission.
        </p>
      </div>
    </div>
  );
}