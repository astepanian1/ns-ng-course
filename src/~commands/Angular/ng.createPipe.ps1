
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Pipe'
$msg   = 'Enter Pipe Name:'

$pipeName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($pipeName)){
  return 
}
Else {
    ng generate pipe $pipeName
}
