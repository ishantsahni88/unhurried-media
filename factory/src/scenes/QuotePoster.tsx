import React from 'react';
import {AbsoluteFill, continueRender, delayRender, staticFile} from 'remotion';

// Static Unhurried quote poster, 1080x1440 (3:4), matching the original Canva design:
// cream paper, line-drawn sprig, condensed serif quote in sage, thin divider, spaced handle.
const CREAM = '#F3EEE4';
const SAGE = '#414F3B';
const QUOTE_FONT = 'UnhurriedQuote';
const HANDLE_FONT = 'UnhurriedHandle';

let fontsPromise: Promise<void> | null = null;
const loadFonts = () => {
	if (!fontsPromise) {
		const quote = new FontFace(QUOTE_FONT, `url(${staticFile('fonts/InstrumentSerif-Regular.woff2')})`);
		const handle = new FontFace(HANDLE_FONT, `url(${staticFile('fonts/Montserrat-Regular.woff2')})`);
		fontsPromise = Promise.all([quote.load(), handle.load()]).then((faces) => {
			faces.forEach((f) => document.fonts.add(f));
		});
	}
	return fontsPromise;
};

// Pick a size so a quote stays within about three lines.
export const quoteSize = (text: string) => {
	const n = text.length;
	if (n <= 30) return 164;
	if (n <= 43) return 154;
	if (n <= 52) return 130;
	return 116;
};

// A single slanted sprig: one curved stem with alternating pointed leaves, each with a midrib.
const Sprig: React.FC = () => {
	const leaves = [
		{x: 4, y: -116, a: 10, s: 1.25},
		{x: -22, y: -80, a: -50, s: 1.2},
		{x: 26, y: -60, a: 58, s: 1.25},
		{x: -24, y: -26, a: -56, s: 1.15},
		{x: 28, y: -2, a: 62, s: 1.15},
		{x: -18, y: 36, a: -58, s: 1.05},
		{x: 22, y: 60, a: 60, s: 0.95},
	];
	return (
		<svg width={190} height={290} viewBox="-95 -150 190 290" style={{position: 'absolute', top: 143, left: 445}}>
			<g transform="rotate(14)" fill="none" stroke={SAGE} strokeLinecap="round" strokeLinejoin="round">
				<path d="M2,130 C-2,70 6,10 0,-100" strokeWidth={2.4} />
				{leaves.map((l, i) => (
					<g key={i} transform={`translate(${l.x},${l.y}) rotate(${l.a}) scale(${l.s})`}>
						<path d="M0,-30 C11,-18 11,14 0,26 C-11,14 -11,-18 0,-30 Z" strokeWidth={2.2} />
						<path d="M0,-24 L0,22" strokeWidth={1.4} />
					</g>
				))}
			</g>
		</svg>
	);
};

export const QuotePoster: React.FC<{quote: string; handle?: string}> = ({quote, handle = '@unhurried_daily'}) => {
	const [h] = React.useState(() => delayRender('poster fonts'));
	React.useEffect(() => {
		loadFonts().then(() => continueRender(h));
	}, [h]);
	const size = quoteSize(quote);
	return (
		<AbsoluteFill
			style={{
				backgroundColor: CREAM,
				// Faint paper grain, like the Canva background.
				backgroundImage:
					'radial-gradient(rgba(65,79,59,0.035) 1px, transparent 1px), radial-gradient(rgba(65,79,59,0.025) 1px, transparent 1px)',
				backgroundSize: '7px 7px, 11px 11px',
				backgroundPosition: '0 0, 3px 5px',
			}}
		>
			<Sprig />
			<div
				style={{
					position: 'absolute',
					top: 470,
					left: 90,
					width: 900,
					height: 560,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<div
					style={{
						fontFamily: QUOTE_FONT,
						fontSize: size,
						lineHeight: 1.06,
						letterSpacing: -0.5,
						color: SAGE,
						textAlign: 'center',
						textWrap: 'balance',
					}}
				>
					{quote}
				</div>
			</div>
			<div style={{position: 'absolute', top: 1106, left: 436, width: 208, height: 2, background: SAGE, opacity: 0.45}} />
			<div
				style={{
					position: 'absolute',
					top: 1282,
					left: 0,
					width: 1080,
					textAlign: 'center',
					fontFamily: HANDLE_FONT,
					fontSize: 24,
					letterSpacing: 4,
					opacity: 0.85,
					color: SAGE,
				}}
			>
				{handle}
			</div>
		</AbsoluteFill>
	);
};
