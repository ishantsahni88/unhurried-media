import React from 'react';
import {AbsoluteFill, Audio, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, LEAF, Line, SAGE, SAGE_SOFT, SceneShell, fadeRise} from './common';

// Scene 6 — End card. Logo settles (soft pop), then the line and handle; two leaves drift past.
export const UnhurriedEndCard: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();
	const s = spring({frame, fps, config: {damping: 200, mass: 1.2}, durationInFrames: 22});
	const logoScale = interpolate(s, [0, 1], [0.9, 1]);
	const logoOpacity = interpolate(frame, [0, 14], [0, 1], {extrapolateRight: 'clamp'});
	const leaf = (startX: number, delay: number, sway: number) => {
		const t = Math.max(0, frame - delay);
		return {
			x: startX + Math.sin(t / 14) * sway,
			y: -120 + t * 9,
			r: Math.sin(t / 18) * 30,
		};
	};
	const leaves = [leaf(260, 0, 40), leaf(-300, 30, 50)];
	return (
		<SceneShell fadeIn={10} fadeOut={0}>
			<Sequence from={20}>
				<Audio src={staticFile('sounds/Pop.mp3')} volume={0.25} />
			</Sequence>
			<svg width={1080} height={1920} style={{position: 'absolute'}} viewBox="-540 0 1080 1920">
				{leaves.map((l, i) => (
					<g key={i} transform={`translate(${l.x},${l.y}) rotate(${l.r}) scale(0.9)`}>
						<path d={LEAF} fill="none" stroke={SAGE_SOFT} strokeWidth={3} />
						<path d="M0,-54 L0,54" stroke={SAGE_SOFT} strokeWidth={2} />
					</g>
				))}
			</svg>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 70}}>
				<Img
					src={staticFile('brand-assets/unhurried-logo.png')}
					style={{width: 380, height: 380, borderRadius: '50%', transform: `scale(${logoScale})`, opacity: logoOpacity}}
				/>
				<div style={fadeRise(frame, 34, 24)}>
					<Line size={84}>One quiet thought a day.</Line>
				</div>
				<div style={{...fadeRise(frame, 56, 24), fontFamily: FONT, fontSize: 56, color: SAGE, letterSpacing: 1}}>@unhurried_daily</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
