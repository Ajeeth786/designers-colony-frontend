type BaseCardProps = {
    children: React.ReactNode;
    className?: string;
  };
  
  export function BaseCard({ children, className = "" }: BaseCardProps) {
    return (
      <div
        className={`rounded-2xl border border-[#E7E5E4] bg-white p-6 ${className}`}
      >
        {children}
      </div>
    );
  }
  