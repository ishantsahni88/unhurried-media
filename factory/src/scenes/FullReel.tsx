import React from 'react';
import {Series} from 'remotion';
import {NotLateClock} from './NotLateClock';
import {OwnTimeSunrise} from './OwnTimeSunrise';
import {SlowDownFocus} from './SlowDownFocus';
import {BreatheCircle} from './BreatheCircle';
import {LessHurryMoreHere} from './LessHurryMoreHere';
import {UnhurriedEndCard} from './UnhurriedEndCard';

export type ReelProps = {s1: string; s2: string; s3a: string; s3b: string; s4: string[]; s5a: string; s5b: string};

// Production reel: the six approved Unhurried scene templates in sequence, with new quote text.
export const FullReel: React.FC<ReelProps> = (p) => (
	<Series>
		<Series.Sequence durationInFrames={120}><NotLateClock text={p.s1} /></Series.Sequence>
		<Series.Sequence durationInFrames={120}><OwnTimeSunrise text={p.s2} /></Series.Sequence>
		<Series.Sequence durationInFrames={150}><SlowDownFocus a={p.s3a} b={p.s3b} /></Series.Sequence>
		<Series.Sequence durationInFrames={180}><BreatheCircle lines={p.s4} /></Series.Sequence>
		<Series.Sequence durationInFrames={120}><LessHurryMoreHere fast={p.s5a} still={p.s5b} /></Series.Sequence>
		<Series.Sequence durationInFrames={120}><UnhurriedEndCard /></Series.Sequence>
	</Series>
);
