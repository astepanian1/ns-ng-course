[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Add Execute Permission To File'
$msg   = 'Enter File Name:'

$scriptName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($scriptName)){
  return 
}
Else {
  $scriptPath = split-path -parent $MyInvocation.MyCommand.Definition
  $fullPath = -join($scriptPath,"\",$scriptName)
  #This Powershell command can also be used as stand alone in console to execute scripts
  powershell -ExecutionPolicy ByPass -File $fullPath
}

