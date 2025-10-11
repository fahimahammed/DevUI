
import React, { useEffect, useRef, useState, ReactNode, useId } from 'react';

export interface CollapsibleProps {
	/** The header shown as the toggle button (string or node) */
	header: ReactNode;
	/** Children content hidden / shown by the collapsible */
	children: ReactNode;
	/** Start opened */
	defaultOpen?: boolean;
	/** Transition duration in ms */
	duration?: number;
	/** Optional className for the root element */
	className?: string;
	/** Optional callback when open state changes */
	onToggle?: (open: boolean) => void;
}

/**
 * A small accessible collapsible component that animates height smoothly.
 * Uses inline styles so it works without external CSS. Works well inside Next.js + TypeScript projects.
 */
export default function Collapsible({
	header,
	children,
	defaultOpen = false,
	duration = 220,
	className,
	onToggle,
}: CollapsibleProps) {
	const nodeId = useId?.() ?? `collapsible-${Math.random().toString(36).slice(2, 9)}`;
	const contentId = `${nodeId}-content`;
	const buttonId = `${nodeId}-button`;

	const contentRef = useRef<HTMLDivElement | null>(null);
	const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);
	const [height, setHeight] = useState<string>(defaultOpen ? 'auto' : '0px');
	const [isAnimating, setIsAnimating] = useState(false);

	useEffect(() => {
		// Ensure height matches defaultOpen on mount
		if (contentRef.current) {
			if (defaultOpen) setHeight('auto');
			else setHeight('0px');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		onToggle?.(isOpen);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	// Open/close handler with smooth height animation
	const toggle = () => {
		const el = contentRef.current;
		if (!el) {
			setIsOpen((v) => !v);
			return;
		}

		const scrollHeight = el.scrollHeight;

		if (isOpen) {
			// Closing: from auto (or px) -> px (measured) -> 0
			// If height is 'auto', set to measured px first so transition can work
			if (height === 'auto') {
				setHeight(`${scrollHeight}px`);
				// force reflow
				// eslint-disable-next-line @typescript-eslint/no-unused-expressions
				el.offsetHeight;
			}
			requestAnimationFrame(() => {
				setIsAnimating(true);
				setHeight('0px');
			});
		} else {
			// Opening: from 0 -> measured px -> auto
			setIsAnimating(true);
			setHeight(`${scrollHeight}px`);
			// after transition end we'll set to 'auto'
		}

		setIsOpen((v) => !v);
	};

	const handleTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
		if (e.target !== contentRef.current || e.propertyName !== 'height') return;
		const el = contentRef.current;
		if (!el) return;
		if (isOpen) {
			// After opening, let it size naturally
			setHeight('auto');
		}
		setIsAnimating(false);
	};

	// Keep height in sync if contents resize while open
	useEffect(() => {
		if (!contentRef.current) return;
		if (!isOpen) return;

		const el = contentRef.current;
		let raf = 0;

		const resizeObserver = new ResizeObserver(() => {
			// when content size changes and we are open, keep a measured height
			if (height === 'auto') return;
			// adjust to new scrollHeight smoothly
			const sh = el.scrollHeight;
			setHeight(`${sh}px`);
			// after next frame, allow it to go back to auto
			cancelAnimationFrame(raf);
			raf = requestAnimationFrame(() => setHeight('auto'));
		});

		resizeObserver.observe(el);

		return () => {
			resizeObserver.disconnect();
			cancelAnimationFrame(raf);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isOpen]);

	const contentStyle: React.CSSProperties = {
		height,
		overflow: 'hidden',
		transition: `height ${duration}ms ease, opacity ${Math.round(duration / 2)}ms ease`,
		opacity: isOpen || isAnimating ? 1 : 0,
	};

	const headerStyle: React.CSSProperties = {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: '100%',
		background: 'transparent',
		border: 'none',
		padding: 0,
		cursor: 'pointer',
	};

	const chevronStyle: React.CSSProperties = {
		display: 'inline-block',
		transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
		transition: `transform ${duration}ms ease`,
		marginLeft: 8,
	};

	return (
		<div className={className}>
			<button
				id={buttonId}
				aria-expanded={isOpen}
				aria-controls={contentId}
				onClick={toggle}
				style={headerStyle}
				type="button"
			>
				<span>{header}</span>
				<span aria-hidden style={chevronStyle}>
					▶
				</span>
			</button>

			<div
				id={contentId}
				role="region"
				aria-labelledby={buttonId}
				ref={contentRef}
				style={contentStyle}
				onTransitionEnd={handleTransitionEnd}
			>
				<div style={{ paddingTop: 8, paddingBottom: 8 }}>{children}</div>
			</div>
		</div>
	);
}
	
