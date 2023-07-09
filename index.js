import { Recipe } from '@cooklang/cooklang-ts'

export class CooklangRepository {
  constructor(auth = null) {
    this.auth = auth
  }

  async initialize(owner, repo, recipesPath = '') {
    this.owner = owner
    this.repo = repo

    this.files = (await this.getFiles(owner, repo, recipesPath))

    this.recipes = this.files.map(async (file) => {
      if (file.type !== 'file') {
        return null
      }

      if (!file.name.endsWith('.cook')) {
        return null
      }

      const fileContent = await request(file.download_url)

      return new Recipe(fileContent)
    })
    this.recipes = (await Promise.all(this.recipes)).filter((recipe) => recipe !== null)
  }

  async getRateLimit() {
    return githubApiRequest('https://api.github.com/rate_limit')
  }

  async getFiles(owner, repo, path = '') {
    return githubApiRequest(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, this.auth)
  }
}

async function request(url) {
  const response = await fetch(url)
  const data = await response.text()
  return data
}

async function githubApiRequest(url, auth = null) {
  const headers = {}
  headers['Accept'] = 'application/vnd.github+json'
  headers['X-GitHub-Api-Version'] = '2022-11-28'
  if (auth !== null) {
    headers['Authorization'] = `Bearer  ${auth}`
  }

  const response = await fetch(url, {
    headers
  })

  const data = await response.json()
  return data
}
