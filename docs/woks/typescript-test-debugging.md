

Issue : 

- tests are aleady setup for src/lib directory
- tests run on ci 
- but when urnning on macos, tests return error, saying not files found.



This issue was resolved after removing following line from jest config

```
  modulePathIgnorePatterns: ["out", ".vscode", "vscode-test"]
```

