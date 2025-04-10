import * as exec from '@actions/exec'

export async function execWithOutput(
  command: string,
  args: string[],
  options: exec.ExecOptions = {}
): Promise<string> {
  let output = ''
  const execOptions: exec.ExecOptions = {
    ...options,
    listeners: {
      stdout: (data: Buffer) => {
        output += data.toString()
      },
      stderr: options.listeners?.stderr
    }
  }
  await exec.exec(command, args, execOptions)
  return output.trim()
}
