$json = Get-Content -Raw -Path "d:\TTT\index_extracted_styles.json"
$obj = ConvertFrom-Json $json
Write-Host "Type: $($obj.GetType().FullName)"
if ($obj -is [Array]) {
    Write-Host "Array length: $($obj.Length)"
    Write-Host "First item keys:"
    $obj[0].psobject.properties.Name | Select-Object -First 10
    Write-Host "First item details:"
    $obj[0] | Format-List | Out-String | Select-Object -First 20
} else {
    $obj.psobject.properties.Name | Select-Object -First 10
}
