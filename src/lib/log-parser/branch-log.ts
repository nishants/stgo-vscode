
const create = () => {
    const commits: Array<object> = [];

    return {
      addCommit(commit: object){
          commits.push(commit);
      },
      getCommits() : Array<object>{
          return commits;
      }
    };
};

export default create;