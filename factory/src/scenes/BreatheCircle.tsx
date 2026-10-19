import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {Line, SAGE, SceneShell, fadeRise} from './common';

// Scene 4 — "Unclench your jaw. Drop your shoulders. Breathe."
// A soft circle breathes; each line lands on an exhale, then one long inhale on "Breathe."
export const BreatheCircle: React.FC<{lines?: string[]}> = ({lines: input = ['Unclench your jaw.', 'Drop your shoulders.', 'Breathe.']}) => {
	const frame = useCurrentFrame();
	const {durationInFrames} = useVideoConfig();
	// Two short breaths (40-frame cycles) then a long inhale from 100 to 150.
	let scale: number;
	if (frame < 100) {
		const t = (frame % 50) / 50;
		scale = 1 + 0.12 * Math.sin(t * Math.PI * 2 + Math.PI / 2);
	} else {
		scale = interpolate(frame, [100, 150], [1, 1.32], {extrapolateRight: 'clamp', easing: Easing.inOut(Easing.sin)});
	}
	// Shrink to a dot at the end.
	const exit = interpolate(frame, [durationInFrames - 20, durationInFrames - 2], [1, 0.04], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.cubic)});
	const lines = input.map((text, i) => ({text, at: [14, 62, 104][i], last: i === 2}));
	return (
		<SceneShell fadeIn={14} fadeOut={6}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div
					style={{
						width: 460,
						height: 460,
						borderRadius: '50%',
						background: SAGE,
						opacity: 0.14,
						transform: `scale(${scale * exit})`,
						position: 'absolute',
						top: 300,
					}}
				/>
				<div style={{position: 'absolute', top: 920, display: 'flex', flexDirection: 'column', gap: 18, opacity: exit < 0.5 ? exit * 2 : 1}}>
					{lines.map((l) => (
						<div key={l.text} style={fadeRise(frame, l.at, 24)}>
							<Line size={l.last ? 128 : 88} style={{width: 980}}>{l.text}</Line>
						</div>
					))}
				</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
