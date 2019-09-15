[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Revert To Previous Migration'
$msg   = 'Enter Migration Name:'

$migrationName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($migrationName)){
  return 
}
Else {
   dotnet ef database update $migrationName
}
