import {Config} from '@remotion/cli/config';
import {existsSync, readdirSync} from 'node:fs';

// Remotion's own Chrome download is blocked in Claude's cloud workspace, so use the
// preinstalled headless shell when it exists. The Playwright build number changes when
// the image is updated, so look it up instead of hard-coding it.
const findLocalChrome = (): string | null => {
	const base = '/opt/pw-browsers';
	if (!existsSync(base)) return null;
	const candidates = [
		`${base}/chromium_headless_shell`,
		...readdirSync(base)
			.filter((d) => d.startsWith('chromium_headless_shell-'))
			.sort()
			.reverse()
			.flatMap((d) => [
				`${base}/${d}/chrome-headless-shell-linux64/chrome-headless-shell`,
				`${base}/${d}/chrome-linux/headless_shell`,
			]),
	];
	return candidates.find((p) => existsSync(p)) ?? null;
};

const localChrome = findLocalChrome();
if (localChrome) {
	Config.setBrowserExecutable(localChrome);
}
Config.setVideoImageFormat('jpeg');
