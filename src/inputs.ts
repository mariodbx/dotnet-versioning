import * as core from '@actions/core'

export function getInputOrDefault(name: string, defaultValue: string): string {
  return core.getInput(name) || defaultValue
}
