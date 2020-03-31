https://stackoverflow.com/questions/46511595/how-to-access-the-api-for-git-in-visual-studio-code

Gti API: https://github.com/Microsoft/vscode/blob/master/extensions/git/src/api/git.d.ts



**NOTE :** 

- make sure the git repo is initialized the the temp directory that the workspace is when running the extensino using `F5`

```typescript
const gitExtension = vscode.extensions.getExtension('vscode.git').exports;
const api = gitExtension.getAPI(1);

// Choose the repo (their could be multiple here !!)
const repo = api.repositories[0];
const head = repo.state.HEAD;

// Get the branch and head 
const {commit,name: branch} = head;

// Get head of any other branch
const mainBranch = 'master'
const branchDetails = await repo.getBranch(mainBranch);

// Get last merge commit
const lastMergeCommit = await repo.getMergeBase(branch, mainBranch);

const status = await repo.status();

console.log({ branch, commit, lastMergeCommit, needsSync: lastMergeCommit !== commit });
```

