module.exports = {
  branches: "master",
  repositoryURL: "https://github.com/aaananiev/test-game-workflow",
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
    ["@semantic-release/github", {
        assets: [
            { path: "build.zip", label: "Build"}
        ]
    }]
  ],
};
