
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Guard'
$msg   = 'Enter Guard Name:'

$guardName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($guardName)){
  return 
}
Else{
    ng generate guard $guardName
}
