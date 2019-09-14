
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Module'
$msg   = 'Enter Interface Module:'

$moduleName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($moduleName)){
  return 
}
Else {
    ng generate module $moduleName
}
