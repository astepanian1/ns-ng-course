[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Commit All'
$msg   = 'Enter Comment:'

$commitText = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($commitText)){
  return 
}
Else {
    git commit -a -m $commitText
}

