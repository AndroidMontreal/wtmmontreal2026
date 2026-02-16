$basePath = "C:/Users/solan/Desktop/WTM 2026/resources/speakers/Bio Photo Slides"
$tempPath = "$basePath/temp_extract_chloe"

$file = Get-ChildItem -Path $basePath -Filter "*Freslon.docx" | Select-Object -First 1

if ($file) {
    Write-Output "--- START FILE: $($file.Name) ---"
    
    if (-not (Test-Path $tempPath)) {
        New-Item -ItemType Directory -Force -Path $tempPath | Out-Null
    }
    
    $zipPath = "$tempPath/chloe.zip"
    $extractPath = "$tempPath/chloe"
    
    Copy-Item $file.FullName $zipPath -Force
    Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force
    
    $xmlPath = "$extractPath/word/document.xml"
    if (Test-Path $xmlPath) {
        [xml]$xml = Get-Content $xmlPath
        Write-Output $xml.document.body.InnerText
    }
    
    Remove-Item $tempPath -Recurse -Force
    Write-Output "--- END FILE ---"
} else {
    Write-Output "File not found."
}
