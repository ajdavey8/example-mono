const name = 'backend-common';

module.exports = {
  tagFormat: name + '-v${version}',
  branch: 'main',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: "feat", scope: "backend-common", release: "minor" },
          { type: "feat", release: false },
          { type: "fix", scope: "backend-common", release: "minor" },
          { type: "fix", release: false },
          { breaking: true,  scope: "backend-common", release: "major" },
          { breaking: true, release: false },
          { revert: true, scope: "backend-common", release: "patch" },
          { revert: true, release: false },
        ]
      }
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/changelog',
      {
        'changelogFile': 'CHANGELOG.md'
      }
    ],
    'semantic-release-yarn',
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