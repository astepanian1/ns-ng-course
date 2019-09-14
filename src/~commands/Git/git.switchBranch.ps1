[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Switch Branch'
$msg   = 'Enter Branch Name:'

$branchName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($branchName)){
  return 
}
Else {
    git checkout $branchName
}