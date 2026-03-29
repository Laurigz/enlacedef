Get-ChildItem *.html | ForEach-Object {
    $c = [IO.File]::ReadAllText($_.FullName)
    $c = $c -replace 'src="navbar\.js"', 'src="/navbar.js"'
    $c = $c -replace 'src="footer\.js"', 'src="/footer.js"'
    $c = $c -replace 'src="infinite-grid\.js"', 'src="/infinite-grid.js"'
    $c = $c -replace 'src="logo-enlace\.png"', 'src="/logo-enlace.png"'
    $c = $c -replace 'footer\.js">`n', 'footer.js">'
    [IO.File]::WriteAllText($_.FullName, $c)
    Write-Host "Updated: $($_.Name)"
}
