import { existsSync } from 'node:fs';
import { join } from 'node:path';

export function detectPlatforms(cwd) {
  const platforms = ['agents'];

  if (existsSync(join(cwd, '.cursor')) || existsSync(join(cwd, '.cursor', 'rules'))) {
    platforms.push('cursor');
  }

  // CLAUDE.md is lightweight -- always generate for Claude Code / Codex compatibility
  platforms.push('claude');

  if (existsSync(join(cwd, '.codebuddy'))) {
    platforms.push('codebuddy');
  }

  return platforms;
}
