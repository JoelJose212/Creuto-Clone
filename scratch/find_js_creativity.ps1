$files = Get-ChildItem -Path "d:\clone\Clone\creuto.com\_next\static\chunks" -Recurse -File -Filter "*.js"

foreach ($file in $files) {
    $content = Get-Content -Raw -Path $file.FullName
    if ($content.Contains("Creativity")) {
        # Check if it is a different file than 12c_zkk6x._...js
        Write-Host "FOUND 'Creativity' in JS BUNDLE: $($file.FullName)"
        $index = $content.IndexOf("Creativity")
        $start = [Math]::Max(0, $index - 300)
        $len = [Math]::Min($content.Length - $start, 3000)
        Write-Host $content.Substring($start, $len)
        Write-Host "--------------------------------------------------------"
    }
}
