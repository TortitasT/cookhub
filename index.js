import { Octokit } from 'octokit'
import { Recipe } from '@cooklang/cooklang-ts'

export class CooklangRepository {
  constructor(auth = null) {
    this.octokit = new Octokit({
      auth
    })
  }

  async initialize(owner, repo, recipesPath = '') {
    this.owner = owner
    this.repo = repo

    this.files = (await this.getFiles(owner, repo, recipesPath)).data

    this.recipes = this.files.map(async (file) => {
      if (file.type !== 'file') {
        return null
      }

      if (!file.name.endsWith('.cook')) {
        return null
      }

      console.log(file.download_url)

      const fileContent = await request(file.download_url)

      return new Recipe(fileContent)
    })
    this.recipes = (await Promise.all(this.recipes)).filter((recipe) => recipe !== null)
  }

  async getRateLimit() {
    return (await this.octokit.request('GET /rate_limit', {
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })).data
  }

  async getFiles(owner, repo, path) {
    return await this.octokit.rest.repos.getContent({
      owner,
      repo,
      path,
    })
  }
}

async function request(url) {
  const response = await fetch(url)
  const data = await response.text()
  return data
}
