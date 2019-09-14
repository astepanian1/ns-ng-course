
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Enum'
$msg   = 'Enter Guard Enum:'

$enumName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($enumName)){
  return 
}
Else {
    ng generate enum $enumName
}
