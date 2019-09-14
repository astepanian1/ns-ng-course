
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Directive'
$msg   = 'Enter Directive Name:'

$directiveName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($directiveName)){
  return 
}
Else {
    ng generate directive $directiveName --flat false
}
