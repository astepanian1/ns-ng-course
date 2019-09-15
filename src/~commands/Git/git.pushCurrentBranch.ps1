$env:GIT_REDIRECT_STDERR = '2>&1'
git push origin $branchName
$branchName = git rev-parse --abbrev-ref HEAD
git push origin $branchName

