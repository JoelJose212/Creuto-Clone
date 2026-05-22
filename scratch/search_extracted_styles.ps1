$json = Get-Content -Raw -Path "d:\TTT\index_extracted_styles.json"
$obj = ConvertFrom-Json $json
$classes = @("w1q9pb", "9ou6f4", "13ijn4y", "1nl2hpx", "1goid3c", "pkeizy", "zuo2ys", "13u0d8q", "1r79sfn", "7tt3q3", "oq2ae7", "fugjgm", "15ypa2q", "wb3r58", "k1sxo", "1medwe2", "1ris9kj", "ybem02", "gpolos", "558xq1", "w9707")

foreach ($c in $classes) {
    foreach ($str in $obj) {
        if ($str.Contains($c)) {
            Write-Host "CLASS $c FOUND in extracted styles:"
            # Print a snippet of 300 characters around the class match
            $idx = $str.IndexOf($c)
            $start = [Math]::Max(0, $idx - 50)
            $len = [Math]::Min($str.Length - $start, 400)
            Write-Host $str.Substring($start, $len)
            Write-Host "--------------------"
            break
        }
    }
}
