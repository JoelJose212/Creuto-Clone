$json = Get-Content -Raw -Path "d:\TTT\index_extracted_styles.json"
$classes = @("mui-9ou6f4", "mui-13ijn4y", "mui-1nl2hpx", "mui-w1q9pb", "mui-1goid3c", "mui-pkeizy", "mui-zuo2ys", "mui-13u0d8q", "mui-1r79sfn", "mui-7tt3q3", "mui-oq2ae7", "mui-fugjgm", "mui-15ypa2q", "mui-wb3r58", "mui-k1sxo", "mui-1medwe2")

foreach ($c in $classes) {
    # Let's search for the class key in the JSON
    $pattern = "`"$c`":"
    $index = $json.IndexOf($pattern)
    if ($index -ge 0) {
        # Extract a small window around it
        $start = $index
        # find the closing block or quote
        $length = [Math]::Min($json.Length - $start, 500)
        $snippet = $json.Substring($start, $length)
        Write-Host "CLASS ${c}:"
        Write-Host $snippet
        Write-Host "--------------------"
    } else {
        Write-Host "CLASS $c not found"
        Write-Host "--------------------"
    }
}
