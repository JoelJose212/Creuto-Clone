$file = "D:\clone\Clone\creuto.com\_next\static\chunks\12c_zkk6x._...js"
$content = Get-Content -Raw -Path $file
$pattern = 'let G="cubic-bezier(0.22, 1, 0.36, 1)",$=()=>'
$index = $content.IndexOf($pattern)

if ($index -ge 0) {
    Write-Host "FOUND PATTERN AT $index"
    $snippet = $content.Substring($index, 8000)
    # Save the snippet to a scratch text file so we can view it cleanly without truncation
    [System.IO.File]::WriteAllText("D:\TTT\scratch\extracted_framework_code.txt", $snippet)
    Write-Host "Extracted framework code saved to D:\TTT\scratch\extracted_framework_code.txt"
} else {
    Write-Host "Pattern not found"
}
