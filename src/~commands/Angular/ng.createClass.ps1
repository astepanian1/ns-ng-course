
[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Class'
$msg   = 'Enter Class Name:'

$className = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($className)){
  return 
}
Else {
    ng generate class $className
}
