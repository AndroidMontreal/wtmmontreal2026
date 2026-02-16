$files = @(
    "CCardinal.docx",
    "Chloé Freslon.docx",
    "Ludociels.docx",
    "Nemery _ Ludification au service de la science.docx",
    "Présentation de Anne Nguyen (200 mots).docx",
    "RL-presentation-Mahzad KALANTARI.docx",
    "Vivienne.docx"
)

$basePath = "C:/Users/solan/Desktop/WTM 2026/resources/speakers/Bio Photo Slides"
$tempPath = "$basePath/temp_extract"

foreach ($file in $files) {
    $fullPath = "$basePath/$file"
    $zipPath = "$tempPath/$file.zip"
    $extractPath = "$tempPath/$file"
    
    # Create temp dir if not exists
    if (-not (Test-Path $tempPath)) {
        New-Item -ItemType Directory -Force -Path $tempPath | Out-Null
    }

    if (Test-Path $fullPath) {
        Write-Output "--- START FILE: $file ---"
        
        # Copy and rename to zip
        Copy-Item $fullPath $zipPath -Force
        
        # Extract
        Expand-Archive -Path $zipPath -DestinationPath $extractPath -Force
        
        # Read XML
        $xmlPath = "$extractPath/word/document.xml"
        if (Test-Path $xmlPath) {
            [xml]$xml = Get-Content $xmlPath
            # Extract text nodes
            $text = $xml.document.body.InnerText
            Write-Output $text
        }
        
        # Cleanup for this file
        Remove-Item $extractPath -Recurse -Force
        Remove-Item $zipPath -Force
        
        Write-Output "--- END FILE: $file ---`n"
    } else {
        Write-Output "File not found: $fullPath"
    }
}

if (Test-Path $tempPath) {
    Remove-Item $tempPath -Recurse -Force
}
