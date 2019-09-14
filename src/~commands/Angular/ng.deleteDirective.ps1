[void][Reflection.Assembly]::LoadWithPartialName('Microsoft.VisualBasic')

$title = 'Delete Directive'
$msg   = 'Enter Directive Name:'

$directiveName = [Microsoft.VisualBasic.Interaction]::InputBox($msg, $title)

If([string]::IsNullOrEmpty($directiveName)){
  return 
}
Else {
$appModulePath = "./src/app/app.module.ts";

$contentRemoveImports = [System.Text.RegularExpressions.Regex]::Replace([System.IO.File]::ReadAllText($appModulePath), [System.String]::Format("(^.*?\b{0}\b.*?$)",[System.Text.RegularExpressions.Regex]::Escape($directiveName)), '',[System.Text.RegularExpressions.RegexOptions]"MultiLine,IgnoreCase");
$contentRemoveDeclarations = [System.Text.RegularExpressions.Regex]::Replace($contentRemoveImports, [System.String]::Format("(^.*?\b{0}\b.*?$)",[System.Text.RegularExpressions.Regex]::Escape(($directiveName + "Directive"))-replace '-',''), '',[System.Text.RegularExpressions.RegexOptions]"MultiLine,IgnoreCase");
$contentRemoveBlanks = [System.Text.RegularExpressions.Regex]::Replace($contentRemoveDeclarations,"(^\s*$\n|\r)",'',[System.Text.RegularExpressions.RegexOptions]"MultiLine");

[System.IO.File]::WriteAllText($appModulePath, $contentRemoveBlanks);

get-childitem "./src/app/" -recurse | Where-Object {$_.Name -eq $directiveName} | Foreach-Object {
  Write-Host $_.Name;
  Remove-Item -path $_.FullName -Recurse 
}


}