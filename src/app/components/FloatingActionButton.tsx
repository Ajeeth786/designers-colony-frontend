import { Plus } from 'lucide-react';

interface FloatingActionButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function FloatingActionButton({ onClick, disabled = false }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="fixed bottom-4 right-4 w-12 h-12 bg-[#1C1917] text-white rounded-full 
        flex items-center justify-center shadow-lg hover:bg-[#44403C] 
        active:scale-95 transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed
        sm:hidden z-50"
      aria-label="Add new application"
    >
      <Plus className="w-5 h-5" strokeWidth={2.5} />
    </button>
  );
}
