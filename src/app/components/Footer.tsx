export function Footer() {
  return (
    <footer className="mt-[80px] sm:mt-[120px] pt-8 sm:pt-12 pb-8 sm:pb-12 border-t border-[#E7E5E4]">
      <div className="max-w-[1120px] mx-auto px-6 md:px-10 lg:px-10 xl:px-20">
        {/* Desktop: Full footer content */}
        <div className="hidden sm:block">
          <p className="text-[14px] font-normal leading-[1.6] text-center mb-2">
            <span className="text-[#6366F1] font-medium">Built by designers</span>
            <span className="text-[#78716C]"> • No recruiters • No spam</span>
          </p>
          <p className="text-[14px] font-normal text-[#44403C] text-center mb-3">
            Feedback → <a href="mailto:hello@designerscolony.com" className="hover:underline">hello@designerscolony.com</a>
          </p>
          <p className="text-[13px] font-normal text-[#A8A29E] text-center italic">
            Built slowly, with care.
          </p>
        </div>

        {/* Mobile: Minimal footer */}
        <div className="sm:hidden text-center">
          <p className="text-[13px] font-normal text-[#A8A29E] leading-[1.5]">
            Built by designers, for designers
          </p>
        </div>
      </div>
    </footer>
  );
}