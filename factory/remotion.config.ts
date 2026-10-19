import {Config} from '@remotion/cli/config';
import {existsSync} from 'node:fs';

// Remotion's own Chrome download is blocked in Claude's cloud workspace, so use the
// preinstalled headless shell when it exists. Elsewhere Remotion downloads its own.
const localChrome = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';
if (existsSync(localChrome)) {
	Config.setBrowserExecutable(localChrome);
}
Config.setVideoImageFormat('jpeg');
