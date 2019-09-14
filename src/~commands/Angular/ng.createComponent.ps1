
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Component'
$msg   = 'Enter Component Name:'

$componentName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($componentName)){
  return 
}
Else {
    ng generate component $componentName
}
