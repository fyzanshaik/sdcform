import React from 'react';
import { cn } from '@/lib/utils';
import { Settings } from 'lucide-react';

interface SDCLogoProps {
	size?: 'sm' | 'md' | 'lg' | 'xl';
	className?: string;
	animated?: boolean;
	variant?: 'default' | 'outline' | 'ghost';
}

const sizeClasses = {
	sm: 'w-12 h-12',
	md: 'w-16 h-16',
	lg: 'w-24 h-24',
	xl: 'w-32 h-32',
};

const textSizeClasses = {
	sm: 'text-xs',
	md: 'text-sm',
	lg: 'text-lg',
	xl: 'text-2xl',
};

const iconSizeClasses = {
	sm: 'w-3 h-3',
	md: 'w-4 h-4',
	lg: 'w-6 h-6',
	xl: 'w-8 h-8',
};

export const SDCLogo: React.FC<SDCLogoProps> = ({
	size = 'md',
	className,
	animated = false,
	variant = 'default',
}) => {
	const baseClasses = cn(
		'relative flex flex-col items-center justify-center',
		'transition-all duration-300 ease-in-out',
		'cursor-pointer group',
		sizeClasses[size]
	);

	const hexagonClasses = cn(
		'absolute inset-0 transition-all duration-300',
		{
			'bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg shadow-purple-500/25':
				variant === 'default',
			'border-2 border-purple-500 bg-transparent': variant === 'outline',
			'bg-purple-500/10 border border-purple-500/20': variant === 'ghost',
		},
		animated && 'group-hover:scale-105 group-hover:rotate-1',
		'clip-path-hexagon'
	);

	const contentClasses = cn(
		'relative z-10 flex flex-col items-center justify-center gap-0.5',
		{
			'text-white': variant === 'default',
			'text-purple-600': variant === 'outline' || variant === 'ghost',
		}
	);

	const iconClasses = cn(
		iconSizeClasses[size],
		animated && 'group-hover:rotate-180 transition-transform duration-500'
	);

	const textClasses = cn(
		'font-bold tracking-wider',
		textSizeClasses[size],
		animated && 'group-hover:scale-110 transition-transform duration-300'
	);

	return (
		<div className={cn(baseClasses, className)}>
			{/* Hexagon background */}
			<div className={hexagonClasses} />

			{/* Content */}
			<div className={contentClasses}>
				<Settings className={iconClasses} />
				<span className={textClasses}>SDC</span>
			</div>

			{/* Glow effect for animated variant */}
			{animated && variant === 'default' && (
				<div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-purple-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300 clip-path-hexagon blur-sm" />
			)}
		</div>
	);
};
