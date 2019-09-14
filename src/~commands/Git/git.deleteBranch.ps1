#Must first get latest on master branch to update refs otherwise it wont allow it.[use -D to override]
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Delete Branch'
$msg   = 'Enter Branch Name:'

$branchName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($branchName)){
  return 
}
Else {
  git branch -d $branchName
}