import { spawn } from 'node:child_process'
import { existsSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { config as loadDotEnv } from 'dotenv'

const rootDir = process.cwd()
const envPath = path.join(rootDir, '.env.local')

if (existsSync(envPath)) {
  loadDotEnv({ path: envPath, override: true })
} else {
  console.warn('No .env.local file found. Local API routes may be missing required secrets.')
}

const command = process.platform === 'win32' ? 'npx vercel dev --local' : 'npx vercel dev --local'
const child = spawn(command, {
  cwd: rootDir,
  stdio: 'inherit',
  env: process.env,
  shell: true,
})

child.on('exit', (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal)
    return
  }

  process.exit(code ?? 0)
})
