
$BaseDir = -join($env:userprofile,"\AppData\Local\Microsoft\VisualStudio")
$NameToFind = "ComponentModelCache"

$arrayResult = Get-ChildItem $BaseDir -Recurse | Where-Object { $_.PSIsContainer -and $_.Name.EndsWith($NameToFind)}

$arrayResult | ForEach-Object{

	Write-Host("==============")
	Write-Host("CACHE CLEARED ") 
	Write-Host("==============")
	Write-Host($_.FullName)

	Remove-Item –path $_.FullName -Recurse -force
}