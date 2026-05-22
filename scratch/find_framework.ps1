$html = Get-Content -Raw -Path "d:\TTT\index_extracted_body.html"
$pattern = "C Is for CREUTO"
$index = $html.IndexOf($pattern)
if ($index -ge 0) {
    $start = [Math]::Max(0, $index - 100)
    $length = [Math]::Min($html.Length - $start, 15000)
    $snippet = $html.Substring($start, $length)
    Write-Host "FOUND SNIPPET:"
    Write-Host $snippet
} else {
    Write-Host "Pattern not found"
}
