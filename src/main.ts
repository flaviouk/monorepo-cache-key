import * as core from '@actions/core'
import md5File from 'md5-file'
import md5 from 'md5'
import path from 'path'
import {getAllPackages} from 'standard-monorepo'

const getCacheKey = (prefix: string) => {
  const context = process.cwd()
  const packages = getAllPackages(context)

  const inputs = [
    ...packages.map(({location}) => location),
    path.join(context, 'package.json'),
    path.join(context, 'yarn.lock')
  ]

  const cacheKey = inputs
    .map(md5File.sync)
    .reduce((acc: string, cur: string) => md5(acc + cur), '') as string

  return prefix ? `${prefix}-${cacheKey}` : cacheKey
}

async function run(): Promise<void> {
  try {
    const prefix: string = core.getInput('cache-prefix')

    const cacheKey = getCacheKey(prefix)

    core.setOutput('cacheKey', cacheKey)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
