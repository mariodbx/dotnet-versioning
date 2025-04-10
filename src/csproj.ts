import * as fs from 'fs/promises'
import { execWithOutput } from './execUtils.js'

export async function findCsprojFile(
  csprojDepth: number,
  csprojName: string
): Promise<string> {
  const findCmd = `find . -maxdepth ${csprojDepth} -name "${csprojName}" | head -n 1`
  const csprojPath = await execWithOutput('bash', ['-c', findCmd])
  return csprojPath
}

export async function readCsprojFile(csprojPath: string): Promise<string> {
  return await fs.readFile(csprojPath, 'utf8')
}

export async function updateCsprojFile(
  csprojPath: string,
  content: string
): Promise<void> {
  await fs.writeFile(csprojPath, content, 'utf8')
}

export function extractVersion(csprojContent: string): string {
  const versionRegex = /<Version>([^<]+)<\/Version>/
  const match = csprojContent.match(versionRegex)
  if (!match) {
    throw new Error('No version found in csproj file.')
  }
  return match[1].trim()
}

export function updateVersionContent(
  csprojContent: string,
  newVersion: string
): string {
  const versionRegex = /<Version>([^<]+)<\/Version>/
  return csprojContent.replace(versionRegex, `<Version>${newVersion}</Version>`)
}
