@echo off
echo Preparing files for GitHub Pages deployment...
echo.

REM Move frontend files to root
echo Moving frontend files to root directory...
git mv frontend/* .
git mv frontend/.* . 2>nul

REM Remove empty frontend directory
echo Removing empty frontend directory...
git rm -rf frontend/

REM Add all changes
echo Adding changes to git...
git add .

REM Commit changes
echo Committing changes...
git commit -m "Move frontend files to root for GitHub Pages"

echo.
echo ✅ Files prepared for GitHub Pages!
echo.
echo Next steps:
echo 1. Push to GitHub: git push
echo 2. Enable GitHub Pages in repository settings
echo 3. Update config.js with your Render backend URL
echo.
pause 