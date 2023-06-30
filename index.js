import { Octokit } from 'octokit'
import https from 'https'
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

      const fileContent = await fetch(file.download_url)

      return new Recipe(fileContent)
    })
    this.recipes = await Promise.all(this.recipes)
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

async function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = ''

      res.on('data', (chunk) => {
        data += chunk
      })

      res.on('end', () => {
        resolve(data)
      })
    })
  })
}
