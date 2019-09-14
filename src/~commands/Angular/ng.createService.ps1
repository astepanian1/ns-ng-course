
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Service'
$msg   = 'Enter Service Name:'

$serviceName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($serviceName)){
  return 
}
Else {
    ng generate service $serviceName
}
