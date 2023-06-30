import { exit } from 'process'
import { describe, it, expect } from 'vitest'

import { CooklangRepository } from '.'

describe('CooklangRepository', () => {
  it('should be able to read from repo', async () => {
    const repo = new CooklangRepository()

    if ((await repo.getRateLimit()).rate.remaining < 1) {
      console.log('Rate limit reached, try again later or instantiate CooklangRepository with a GitHub PAT.')
      exit(1)
    }

    // Awesome cookbook :D
    await repo.initialize('nicholaswilde', 'recipes', 'cook/breads')

    expect(repo.recipes.length).toBeGreaterThan(0)
  })
})

