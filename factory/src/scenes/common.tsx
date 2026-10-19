import React from 'react';
import {AbsoluteFill, continueRender, delayRender, interpolate, staticFile, useCurrentFrame, useVideoConfig, Easing} from 'remotion';

export const CREAM = '#F4EFE6';
export const SAGE = '#414F3B';
export const SAGE_SOFT = '#8A9A80';
export const FONT = 'UnhurriedSerif';

let fontPromise: Promise<void> | null = null;
const loadFont = () => {
	if (!fontPromise) {
		const face = new FontFace(FONT, `url(${staticFile('fonts/Lora-Variable.ttf')})`);
		fontPromise = face.load().then((f) => {
			document.fonts.add(f);
		});
	}
	return fontPromise;
};

export const useSerif = () => {
	const [handle] = React.useState(() => delayRender('font'));
	React.useEffect(() => {
		loadFont().then(() => continueRender(handle));
	}, [handle]);
};

const ease = Easing.bezier(0.33, 0, 0.2, 1);

export const fadeRise = (frame: number, start: number, dur = 24, dist = 24) => ({
	opacity: interpolate(frame, [start, start + dur], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease}),
	transform: `translateY(${interpolate(frame, [start, start + dur], [dist, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: ease})}px)`,
});

// Soft fade in at the start and out at the end so scenes crossfade when cut together.
export const SceneShell: React.FC<{children: React.ReactNode; fadeIn?: number; fadeOut?: number}> = ({children, fadeIn = 12, fadeOut = 12}) => {
	useSerif();
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const opacity = Math.min(
		fadeIn ? interpolate(frame, [0, fadeIn], [0, 1], {extrapolateRight: 'clamp'}) : 1,
		fadeOut ? interpolate(frame, [durationInFrames - fadeOut, durationInFrames], [1, 0], {extrapolateLeft: 'clamp'}) : 1,
	);
	return (
		<AbsoluteFill style={{backgroundColor: CREAM}}>
			<AbsoluteFill style={{opacity}}>{children}</AbsoluteFill>
		</AbsoluteFill>
	);
};

export const Line: React.FC<{children: React.ReactNode; style?: React.CSSProperties; size?: number}> = ({children, style, size = 104}) => (
	<div
		style={{
			fontFamily: FONT,
			fontSize: size,
			lineHeight: 1.12,
			letterSpacing: -1,
			color: SAGE,
			textAlign: 'center',
			fontWeight: 400,
			...style,
		}}
	>
		{children}
	</div>
);

// A single leaf outline centred on (0,0), pointing up.
export const LEAF = 'M0,-60 C34,-38 34,38 0,60 C-34,38 -34,-38 0,-60 Z';
