$html = Get-Content -Raw -Path "d:\clone\Clone\creuto.com\index.html"
$pattern = "w1q9pb"
$index = $html.IndexOf($pattern)
if ($index -ge 0) {
    Write-Host "Found '$pattern' at index $index"
    $start = [Math]::Max(0, $index - 500)
    $length = [Math]::Min($html.Length - $start, 2000)
    Write-Host "HTML context around '$pattern':"
    Write-Host $html.Substring($start, $length)
} else {
    Write-Host "'$pattern' not found in index.html"
}
