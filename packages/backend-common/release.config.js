const name = 'backend-common';
const srcRoot = `packages/${name}`;

module.exports = {
  extends: 'release.config.base.js',
  tagFormat: name + '-v${version}',
  branch: 'main',
  commitPaths: ['*'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        'changelogFile': 'CHANGELOG.md'
      }
    ],
    '@semantic-release/npm', 
    [
      '@semantic-release/git',
      {
        assets: [`package.json`, `CHANGELOG.md`],
        message:
          `release(version): Release ${name} ` +
          '${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
  ],
};