const name = 'custom-command';

module.exports = {
  tagFormat: name + '-v${version}',
  branch: 'main',
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        releaseRules: [
          { type: "feat", scope: "custom-command", release: "minor" },
          { type: "fix", scope: "custom-command", release: "minor" },
          { type: "fix", release: false },
          { breaking: true,  scope: "custom-command", release: "major" },
          { breaking: true, release: false },
          { revert: true, scope: "custom-command", release: "patch" },
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