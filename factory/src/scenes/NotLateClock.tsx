import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Line, SAGE, SceneShell, fadeRise} from './common';

// Scene 1 — "You are not late." A ticking second hand slows and settles at 12.
export const NotLateClock: React.FC<{text?: string}> = ({text = 'You are not late.'}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	const stopAt = 72;
	// Two full turns that decelerate to a stop exactly at 12 o'clock.
	const angle = interpolate(frame, [0, stopAt], [0, 720], {
		extrapolateRight: 'clamp',
		easing: Easing.out(Easing.cubic),
	});
	// The clock dissolves at the end, handing off to the sunrise.
	const clockOpacity = interpolate(frame, [durationInFrames - 22, durationInFrames - 4], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const r = 190;
	return (
		<SceneShell fadeIn={8} fadeOut={10}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 110}}>
				<svg width={520} height={520} viewBox="-260 -260 520 520" style={{opacity: clockOpacity}}>
					<circle r={r} fill="none" stroke={SAGE} strokeWidth={5} />
					{Array.from({length: 12}).map((_, i) => {
						const a = (i * Math.PI) / 6;
						const inner = i % 3 === 0 ? r - 34 : r - 20;
						return (
							<line
								key={i}
								x1={Math.sin(a) * inner}
								y1={-Math.cos(a) * inner}
								x2={Math.sin(a) * (r - 6)}
								y2={-Math.cos(a) * (r - 6)}
								stroke={SAGE}
								strokeWidth={i % 3 === 0 ? 5 : 3}
								strokeLinecap="round"
							/>
						);
					})}
					<line x1={0} y1={0} x2={0} y2={-r + 40} stroke={SAGE} strokeWidth={4} strokeLinecap="round" transform={`rotate(${angle})`} />
					<circle r={10} fill={SAGE} />
				</svg>
				<div style={fadeRise(frame, stopAt - 4, 26)}>
					<Line style={{width: 960}}>{text}</Line>
				</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
