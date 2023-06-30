# Cookhub

JS Library to fetch [cooklang](https://cooklang.org/) recipes from GitHub repositories.

It uses [cooklang-ts](https://github.com/cooklang/cooklang-ts) to parse
all the cooklang files on the specified repo directory.

## Usage

```javascript
import { CooklangRepository } from "cookhub";

const repo = new CooklangRepository();

// Awesome cookbook :D
await repo.initialize("nicholaswilde", "recipes", "cook/breads");

`{
CooklangRepository {
  octokit: OctokitWithDefaults { ... },
  owner: 'nicholaswilde',
  repo: 'recipes',
  files: [
    {
      name: 'Almost No-Knead Sourdough Bread.cook',
      path: 'cook/breads/Almost No-Knead Sourdough Bread.cook',
      sha: '4c1f5745dbe3dcb40cec01809d409f8dd473db18',
      size: 1196,
      url: 'https://api.github.com/repos/nicholaswilde/recipes/contents/cook/breads/Almost%20No-Knead%20Sourdough%20Bread.co
ok?ref=main',
      html_url: 'https://github.com/nicholaswilde/recipes/blob/main/cook/breads/Almost%20No-Knead%20Sourdough%20Bread.cook',
      git_url: 'https://api.github.com/repos/nicholaswilde/recipes/git/blobs/4c1f5745dbe3dcb40cec01809d409f8dd473db18',
      download_url: 'https://raw.githubusercontent.com/nicholaswilde/recipes/main/cook/breads/Almost%20No-Knead%20Sourdough%
20Bread.cook',
      type: 'file',
      _links: [Object]
    },
    {
      name: 'Almost No-Knead Sourdough Bread.jpg',
      path: 'cook/breads/Almost No-Knead Sourdough Bread.jpg',
      sha: 'bad1d23f55279308384ffb0270b0e4ef4456291a',
      size: 73192,
      url: 'https://api.github.com/repos/nicholaswilde/recipes/contents/cook/breads/Almost%20No-Knead%20Sourdough%20Bread.jp
g?ref=main',
      html_url: 'https://github.com/nicholaswilde/recipes/blob/main/cook/breads/Almost%20No-Knead%20Sourdough%20Bread.jpg',
      git_url: 'https://api.github.com/repos/nicholaswilde/recipes/git/blobs/bad1d23f55279308384ffb0270b0e4ef4456291a',
      download_url: 'https://raw.githubusercontent.com/nicholaswilde/recipes/main/cook/breads/Almost%20No-Knead%20Sourdough%
20Bread.jpg',
      type: 'file',
      _links: [Object]
    },
    {
      name: 'Baguettes.cook',
      path: 'cook/breads/Baguettes.cook',
      sha: '492d6ea4ac18eef34f4944a6c65111b0beb252d6',
      size: 4336,
      url: 'https://api.github.com/repos/nicholaswilde/recipes/contents/cook/breads/Baguettes.cook?ref=main',
      html_url: 'https://github.com/nicholaswilde/recipes/blob/main/cook/breads/Baguettes.cook',
      git_url: 'https://api.github.com/repos/nicholaswilde/recipes/git/blobs/492d6ea4ac18eef34f4944a6c65111b0beb252d6',
      download_url: 'https://raw.githubusercontent.com/nicholaswilde/recipes/main/cook/breads/Baguettes.cook',
      type: 'file',
      _links: [Object]
    },
  ],
  recipes: [
    Recipe {
      ingredients: [
        {
          type: 'ingredient',
          name: 'bread flour',
          quantity: 520,
          units: 'g'
        },
        { 
          type: 'ingredient', 
          name: 'salt',
          quantity: 1.75,
          units: 'tsp'
        },
        {
          type: 'ingredient',
          name: 'room-temperature water',
          quantity: 360,
          units: 'g'
        },
        { 
          type: 'ingredient', 
          name: 'starter', 
          quantity: 85, 
          units: 'g' 
        },
      ]
      cookwares: [Array],
      metadata: [Object],
      steps: [Array],
      shoppingList: {},
      parser: [Parser]
    },
    Recipe {
      ingredients: [Array],
      cookwares: [Array],
      metadata: [Object],
      steps: [Array],
      shoppingList: {},
      parser: [Parser]
    },
    Recipe {
      ingredients: [Array],
      cookwares: [Array],
      metadata: [Object],
      steps: [Array],
      shoppingList: {},
      parser: [Parser]
    },
    ...
  ]
}`;
```
