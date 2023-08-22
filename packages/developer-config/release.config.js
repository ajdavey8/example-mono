const name = 'developer-config';

module.exports = {
  extends: "semantic-release-monorepo",
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
  // This allows us to use the conventional commits format instead of angular
  preset: "conventionalcommits",
  presetConfig: {
    types: [
      // This allows us to tweak what appears in the changelog and how it is grouped
      // This is the default settings + a dependencies section
      { type: "feat", section: "Features" },
      { type: "fix", section: "Bug Fixes" },
      { type: "chore", scope: "deps", section: "Dependencies" },
      { type: "chore", hidden: true },
      { type: "docs", hidden: true },
      { type: "ste", hidden: true },
      { type: "refactor", hidden: true },
      { type: "perf", hidden: true },
      { type: "test", hidden: true },
    ],
    // This allows us to link to Jira issues in the changelog
    issuePrefixes: ["SPT-"],
    issueUrlFormat: "https://shieldpay.atlassian.net/browse/{{prefix}}{{id}}",
  }
};
