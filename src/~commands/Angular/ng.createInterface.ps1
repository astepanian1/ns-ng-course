
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Interface'
$msg   = 'Enter Interface Name:'

$interfaceName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($interfaceName)){
  return 
}
Else {
    ng generate interface $interfaceName
}
