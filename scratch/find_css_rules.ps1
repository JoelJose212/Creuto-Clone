$files = Get-ChildItem -Path "d:\clone" -Recurse -File
$target = "w1q9pb"

foreach ($file in $files) {
    if ($file.Extension -match "\.(html|css|js)$") {
        $content = Get-Content -Raw -Path $file.FullName
        # Let's search for style declarations containing the class name
        # We look for something like ".mui-w1q9pb" or "w1q9pb{" or "w1q9pb "
        # Or let's just search for ".mui-w1q9pb" inside the content
        $index = $content.IndexOf(".mui-$target")
        if ($index -lt 0) {
            $index = $content.IndexOf(".$target")
        }
        if ($index -ge 0) {
            Write-Host "FOUND STYLE FOR $target IN $($file.FullName) at index $index"
            $start = [Math]::Max(0, $index - 50)
            $length = [Math]::Min($content.Length - $start, 500)
            Write-Host $content.Substring($start, $length)
            Write-Host "--------------------"
        }
    }
}
