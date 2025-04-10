import * as exec from '@actions/exec'
import * as core from '@actions/core'
import { execWithOutput } from './execUtils.js'

export async function getLatestCommitMessage(): Promise<string> {
  return await execWithOutput('git', ['log', '-1', '--pretty=%B'])
}

export async function updateGit(
  newVersion: string,
  csprojPath: string,
  commitUser: string,
  commitEmail: string,
  commitMessagePrefix: string
): Promise<void> {
  await exec.exec('git', ['config', 'user.name', commitUser])
  await exec.exec('git', ['config', 'user.email', commitEmail])
  await exec.exec('git', ['add', csprojPath])
  const commitMessageFinal = `${commitMessagePrefix}${newVersion}`
  await exec.exec('git', ['commit', '-m', commitMessageFinal])
  await exec.exec('git', ['push'])
  core.info(`Committed and pushed version update: "${commitMessageFinal}"`)
}
