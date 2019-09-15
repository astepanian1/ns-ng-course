[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Create New Migration'
$msg   = 'Enter Migration Name:'

$migrationName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($migrationName)){
  return 
}
Else {
   dotnet ef migrations add  $migrationName
}
