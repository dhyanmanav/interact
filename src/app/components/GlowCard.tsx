import { ReactNode } from 'react';
import { cn } from './ui/utils';

interface GlowCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: 'cyan' | 'blue' | 'green' | 'red' | 'yellow';
}

export function GlowCard({ children, className, glowColor = 'cyan' }: GlowCardProps) {
  const glowClasses = {
    cyan: 'from-cyan-500 to-blue-500',
    blue: 'from-blue-500 to-indigo-500',
    green: 'from-green-500 to-cyan-500',
    red: 'from-red-500 to-orange-500',
    yellow: 'from-yellow-500 to-orange-500',
  };

  return (
    <div className={cn('relative', className)}>
      <div className={cn(
        'absolute -inset-1 bg-gradient-to-r rounded-lg blur-lg opacity-25',
        glowClasses[glowColor]
      )}></div>
      <div className="relative">
        {children}
      </div>
    </div>
  );
}
