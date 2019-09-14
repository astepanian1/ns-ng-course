[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Delete Remote Branch'
$msg = 'Enter Branch Name:'

$branchName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)
$userName = git config user.name

If([string]::IsNullOrEmpty($branchName)-or [string]::IsNullOrEmpty($userName)){
  return 
}
else{
  git push origin :$branchName
  To git@github.com:$userName/simplegit.git
}
