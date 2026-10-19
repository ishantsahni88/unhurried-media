import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {LEAF, Line, SAGE, SceneShell, fadeRise} from './common';

const LEAVES = [
	{x: 0, y: -170, r: 0, s: 1},
	{x: -70, y: -90, r: -42, s: 0.9},
	{x: 70, y: -40, r: 42, s: 0.9},
	{x: -70, y: 30, r: -42, s: 0.85},
	{x: 70, y: 90, r: 42, s: 0.8},
];

// Scene 3 — "Slow down. You'll see more." A blurred sprig sharpens, then its veins draw in.
export const SlowDownFocus: React.FC<{a?: string; b?: string}> = ({a = 'Slow down.', b = "You'll see more."}) => {
	const frame = useCurrentFrame();
	const blur = interpolate(frame, [0, 60], [22, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
	const vein = interpolate(frame, [72, 120], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.inOut(Easing.quad)});
	return (
		<SceneShell fadeIn={14} fadeOut={12}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 70}}>
				<svg width={560} height={620} viewBox="-280 -290 560 620" style={{filter: `blur(${blur}px)`}}>
					<path d="M0,300 C10,180 -6,40 0,-120" fill="none" stroke={SAGE} strokeWidth={5} strokeLinecap="round" />
					{LEAVES.map((l, i) => (
						<g key={i} transform={`translate(${l.x},${l.y}) rotate(${l.r}) scale(${l.s * 1.35})`}>
							<path d={LEAF} fill="none" stroke={SAGE} strokeWidth={3.5} />
							{/* Veins: a midrib and side veins that draw on once the leaf is in focus */}
							<path
								d="M0,-54 L0,54 M0,-24 L18,-38 M0,-24 L-18,-38 M0,4 L20,-10 M0,4 L-20,-10 M0,30 L16,18 M0,30 L-16,18"
								fill="none"
								stroke={SAGE}
								strokeWidth={2}
								strokeLinecap="round"
								pathLength={1}
								strokeDasharray={1}
								strokeDashoffset={vein}
							/>
						</g>
					))}
				</svg>
				<div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
					<div style={fadeRise(frame, 16, 26)}>
						<Line style={{width: 960}}>{a}</Line>
					</div>
					<div style={fadeRise(frame, 72, 26)}>
						<Line style={{width: 960}}>{b}</Line>
					</div>
				</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
