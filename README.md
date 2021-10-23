# monorepo-cache-key

```yaml
- uses: actions/checkout@v2

- name: Get Cache Key
  uses: flaviouk/monorepo-cache-key@v1
  id: cache-key
  with:
    cache-prefix: foo-bar # This could be {os}-{node-version} for example

- name: Print Cache Key
  run: echo ${{ steps.cache-key.outputs.cacheKey }}
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

## Usage:

After testing you can [create a v1 tag](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md) to reference the stable and latest V1 action
