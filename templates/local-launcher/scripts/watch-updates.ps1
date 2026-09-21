# Surveille la branche "main" et recupere automatiquement les nouveaux
# changements des qu'ils sont pousses sur GitHub. Laisse ce script tourner
# dans un terminal a part pendant que "npm run dev" tourne dans un autre :
# le site se mettra a jour tout seul dans le navigateur.
#
# Utilisation :
#   powershell -ExecutionPolicy Bypass -File .\scripts\watch-updates.ps1
#
# Pour arreter : Ctrl+C

$branch = "main"

Write-Host "Surveillance de la branche '$branch' (Ctrl+C pour arreter)..." -ForegroundColor Cyan

while ($true) {
    git fetch origin $branch --quiet 2>$null

    $local = git rev-parse $branch 2>$null
    $remote = git rev-parse "origin/$branch" 2>$null

    if ($local -ne $remote) {
        $time = Get-Date -Format "HH:mm:ss"
        Write-Host "[$time] Nouveaux changements detectes, mise a jour..." -ForegroundColor Yellow
        git pull origin $branch
        Write-Host "Termine - regarde ton navigateur." -ForegroundColor Green
    }

    Start-Sleep -Seconds 5
}
