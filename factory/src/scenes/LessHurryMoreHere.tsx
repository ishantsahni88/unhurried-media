import React from 'react';
import {AbsoluteFill, Easing, interpolate, useCurrentFrame} from 'remotion';
import {Line, SceneShell} from './common';

// Scene 5 — "Less hurry. More here." Fast and blurred versus completely still.
export const LessHurryMoreHere: React.FC<{fast?: string; still?: string}> = ({fast = 'Less hurry.', still = 'More here.'}) => {
	const frame = useCurrentFrame();
	const inX = interpolate(frame, [0, 12], [-1000, 0], {extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic)});
	const driftX = interpolate(frame, [42, 66], [0, 260], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.in(Easing.quad)});
	const hurryBlur = interpolate(frame, [0, 12], [16, 0], {extrapolateRight: 'clamp'}) + interpolate(frame, [42, 66], [0, 10], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const hurryOpacity = interpolate(frame, [42, 64], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
	const hereOpacity = interpolate(frame, [62, 92], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.quad)});
	return (
		<SceneShell fadeIn={0} fadeOut={12}>
			<AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
				<div style={{position: 'absolute', transform: `translateX(${inX + driftX}px)`, filter: `blur(${hurryBlur}px)`, opacity: hurryOpacity}}>
					<Line size={120} style={{width: 980}}>{fast}</Line>
				</div>
				<div style={{position: 'absolute', opacity: hereOpacity}}>
					<Line size={132} style={{width: 980}}>{still}</Line>
				</div>
			</AbsoluteFill>
		</SceneShell>
	);
};
