:: This file generates a new token with aurm and hooks it into your git remotes for the day
@echo off
setlocal
:PROMPT
SET /P AREYOUSURE=Are you connected to the VPN (Y/[N])?
IF /I "%AREYOUSURE%" NEQ "Y" GOTO END

:: Call aurm
@echo Requesting token
FOR /F %%i in ('aurm auth github --scope okta') DO set mytoken=%%i
@echo token is %mytoken%
:: Set git urls
set gitUrl=https://timhowie-okta:%mytoken%@github.com/okta/okta-developer-docs.git
@echo on
git remote set-url origin %giturl%
@echo off
PAUSE

:END
endlocal
@echo on
