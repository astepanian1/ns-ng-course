#Must first get latest on master branch to update refs otherwise it wont allow it.[Use -D to override]
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Delete Remote Branch'
$msg = 'Enter Branch Name:'

$branchName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)
$userName = git config user.name

If([string]::IsNullOrEmpty($branchName)-or [string]::IsNullOrEmpty($userName)){
  return 
}
else{
  git branch -d $branchName
  git push origin :$branchName
  To git@github.com:$userName/simplegit.git
}


