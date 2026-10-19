#!/usr/bin/env node
// Render one Unhurried batch: posters -> media/posters/<date>.jpg, Reels -> media/reels/<date>.mp4.
// Usage: node scripts/render.mjs content/batches/<batch-id>.json
// Existing files are skipped, so a run that stops halfway can simply be re-run.
import {spawnSync} from 'node:child_process';
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import {resolve, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const factory = resolve(root, 'factory');
const batchPath = process.argv[2];
if (!batchPath) throw new Error('Usage: node scripts/render.mjs content/batches/<batch-id>.json');
const batch = JSON.parse(readFileSync(resolve(root, batchPath), 'utf8'));

const run = (args, label) => {
	const r = spawnSync('npx', ['remotion', ...args, '--log=error'], {cwd: factory, stdio: 'inherit'});
	if (r.status !== 0) throw new Error(`Render failed: ${label}`);
};

if (!existsSync(resolve(factory, 'node_modules'))) {
	const r = spawnSync('npm', ['ci', '--no-audit', '--no-fund'], {cwd: factory, stdio: 'inherit'});
	if (r.status !== 0) throw new Error('npm ci failed');
}

mkdirSync(resolve(root, 'media/posters'), {recursive: true});
mkdirSync(resolve(root, 'media/reels'), {recursive: true});

for (const p of batch.posters ?? []) {
	const out = resolve(root, 'media/posters', `${p.date}.jpg`);
	if (existsSync(out)) continue;
	const props = resolve(root, `.props-${p.date}.json`);
	writeFileSync(props, JSON.stringify({quote: p.quote}));
	run(['still', 'src/index.tsx', 'quote-poster', out, `--props=${props}`, '--jpeg-quality=92'], `poster ${p.date}`);
	spawnSync('rm', ['-f', props]);
	console.log(`poster ${p.date}`);
}

for (const r of batch.reels ?? []) {
	const out = resolve(root, 'media/reels', `${r.date}.mp4`);
	if (existsSync(out)) continue;
	const props = resolve(root, `.props-reel-${r.date}.json`);
	writeFileSync(props, JSON.stringify(r.props));
	run(['render', 'src/index.tsx', 'unhurried-full-reel', out, `--props=${props}`], `reel ${r.date}`);
	spawnSync('rm', ['-f', props]);
	console.log(`reel ${r.date}`);
}
console.log('Batch rendered.');
