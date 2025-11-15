module.exports = async ({ github, context }) => {
  const issueBody = context.payload.issue.body;
  const labels = context.payload.issue.labels.map((l) => l.name);

  // Parse the issue form response
  const typeMatch = issueBody.match(/### Type\s*\n\s*([^\n]+)/);
  const urlMatch = issueBody.match(/### Repository URL\s*\n\s*([^\n\s]+)/);

  if (!typeMatch || !urlMatch) {
    core.setFailed("Invalid issue format");
    return;
  }

  const type = typeMatch[1].trim();
  const url = urlMatch[1].trim();

  // Parse GitHub URL to extract owner and repo
  // Support formats: https://github.com/owner/repo or owner/repo
  let owner, repo;
  const githubUrlMatch = url.match(/github\.com\/([^\/]+)\/([^\/\s]+)/);
  if (githubUrlMatch) {
    owner = githubUrlMatch[1];
    repo = githubUrlMatch[2];
  } else {
    core.setFailed("Invalid GitHub URL format");
    return;
  }

  // Remove .git suffix if present
  repo = repo.replace(/\.git$/, "");

  console.log(`Type: ${type}`);
  console.log(`URL: ${url}`);
  console.log(`Owner: ${owner}`);
  console.log(`Repo: ${repo}`);
};
