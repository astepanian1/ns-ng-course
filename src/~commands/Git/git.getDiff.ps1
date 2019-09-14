$branchName = git rev-parse --abbrev-ref HEAD
git diff $branchName  origin/$branchName