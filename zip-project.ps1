# PowerShell script to compress KrishiMithra project cleanly and instantly
$outputZip = "..\KrishiMithra-Source.zip"

Write-Host "Zipping project (excluding node_modules and temporary caches)..." -ForegroundColor Green

# Get all files excluding node_modules, auth_info, dist, .wwebjs_cache, .netlify
$filesToZip = Get-ChildItem -Path . -Recurse | Where-Object {
    $_.FullName -notmatch '\\(node_modules|auth_info|\.wwebjs_cache|dist|\.netlify|\.git)($|\\)'
}

Compress-Archive -Path $filesToZip.FullName -DestinationPath $outputZip -Force

$zipSize = (Get-Item $outputZip).Length / 1MB
Write-Host "Success! Created $outputZip ($([math]::round($zipSize, 2)) MB)" -ForegroundColor Cyan
