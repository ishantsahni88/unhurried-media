import type {FC} from 'react';
import {Composition} from 'remotion';
import {NotLateClock} from './scenes/NotLateClock';
import {OwnTimeSunrise} from './scenes/OwnTimeSunrise';
import {SlowDownFocus} from './scenes/SlowDownFocus';
import {BreatheCircle} from './scenes/BreatheCircle';
import {LessHurryMoreHere} from './scenes/LessHurryMoreHere';
import {UnhurriedEndCard} from './scenes/UnhurriedEndCard';
import {FullReel} from './scenes/FullReel';
import {QuotePoster} from './scenes/QuotePoster';

const W = 1080;
const H = 1920;
const FPS = 30;

// One independent composition per approved scene.
export const RemotionRoot: FC = () => (
	<>
		<Composition id="not-late-clock" component={NotLateClock} durationInFrames={120} fps={FPS} width={W} height={H} />
		<Composition id="own-time-sunrise" component={OwnTimeSunrise} durationInFrames={120} fps={FPS} width={W} height={H} />
		<Composition id="slow-down-focus" component={SlowDownFocus} durationInFrames={150} fps={FPS} width={W} height={H} />
		<Composition id="breathe-circle" component={BreatheCircle} durationInFrames={180} fps={FPS} width={W} height={H} />
		<Composition id="less-hurry-more-here" component={LessHurryMoreHere} durationInFrames={120} fps={FPS} width={W} height={H} />
		<Composition id="unhurried-end-card" component={UnhurriedEndCard} durationInFrames={120} fps={FPS} width={W} height={H} />
		<Composition
			id="unhurried-full-reel"
			component={FullReel}
			durationInFrames={810}
			fps={FPS}
			width={W}
			height={H}
			defaultProps={{s1: 'You are not late.', s2: 'You are on your own time.', s3a: 'Slow down.', s3b: "You'll see more.", s4: ['Unclench your jaw.', 'Drop your shoulders.', 'Breathe.'], s5a: 'Less hurry.', s5b: 'More here.'}}
		/>
		<Composition
			id="quote-poster"
			component={QuotePoster}
			durationInFrames={1}
			fps={FPS}
			width={1080}
			height={1440}
			defaultProps={{quote: "Rest is not a reward. It's a requirement."}}
		/>
	</>
);
