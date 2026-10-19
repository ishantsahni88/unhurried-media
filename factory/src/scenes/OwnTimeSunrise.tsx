import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {FONT, SAGE, SceneShell} from './common';

// Scene 2 — "You are on your own time." A half-sun rises slowly over a horizon; words arrive one by one.
export const OwnTimeSunrise: React.FC<{text?: string}> = ({text = 'You are on your own time.'}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const rise = interpolate(frame, [0, durationInFrames], [170, 20], {easing: Easing.out(Easing.quad)});
	const words = text.split(' ');
	return (
		<SceneShell fadeIn={14} fadeOut={12}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 120}}>
				<svg width={640} height={260} viewBox="-320 -230 640 260">
					<defs>
						<clipPath id="above">
							<rect x={-320} y={-230} width={640} height={230} />
						</clipPath>
					</defs>
					<g clipPath="url(#above)">
						<circle cx={0} cy={rise} r={150} fill={SAGE} opacity={0.9} />
					</g>
					<line x1={-300} y1={0} x2={300} y2={0} stroke={SAGE} strokeWidth={5} strokeLinecap="round" />
				</svg>
				<div style={{fontFamily: FONT, fontSize: 104, lineHeight: 1.12, color: SAGE, textAlign: 'center', width: 900, letterSpacing: -1}}>
					{words.map((w, i) => {
						const start = 18 + i * 9;
						const o = interpolate(frame, [start, start + 18], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
						return (
							<span key={i} style={{opacity: o}}>
								{w}
								{i < words.length - 1 ? ' ' : ''}
							</span>
						);
					})}
				</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
