import { existsSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

for (const file of ['.env.local', '.env']) {
  if (existsSync(file)) process.loadEnvFile(file)
}

if (!process.env.GITHUB_PACKAGES_TOKEN) {
  console.error('Falta GITHUB_PACKAGES_TOKEN en el entorno o en .env.local.')
  process.exit(1)
}

const result = spawnSync('npm', process.argv.slice(2), {
  stdio: 'inherit',
  env: process.env,
})
if (result.error) console.error(result.error.message)
process.exit(result.status ?? 1)
