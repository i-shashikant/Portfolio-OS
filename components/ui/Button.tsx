import { ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export default function Button({
  variant = 'primary',
  className,
  children,
  ...props
}: ButtonProps) {
  const styles = {
    primary:
      'bg-[var(--primary)] text-white hover:opacity-90',
    secondary:
      'border border-white/20 bg-white/5 backdrop-blur-md hover:bg-white/10',
  };

  return (
    <button
      className={cn(
        'rounded-full px-6 py-3 font-medium transition-all duration-300',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}