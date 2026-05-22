$files = Get-ChildItem -Path "d:\clone\Clone\creuto.com\_next\static\chunks" -Recurse -File -Filter "*.js"

foreach ($file in $files) {
    $content = Get-Content -Raw -Path $file.FullName
    if ($content.Contains("C Is for CREUTO")) {
        Write-Host "FOUND COMPONENT IN JS BUNDLE: $($file.FullName)"
        $index = $content.IndexOf("C Is for CREUTO")
        $start = [Math]::Max(0, $index - 500)
        $len = [Math]::Min($content.Length - $start, 5000)
        Write-Host $content.Substring($start, $len)
        Write-Host "--------------------"
        break
    }
}
