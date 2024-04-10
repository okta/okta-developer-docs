#!/usr/bin/env bash
BREW_FLAGS="--quiet"
PIP_FLAGS="--quiet"
PIPX_FLAGS=""
GIT_CRED_FLAGS="--error --verbose"

main() {
  local OPTIND
  local _issilent="false"
  while getopts "s" opt; do
    case "${opt}" in
      s)
        _issilent="true"
        ;;
      *)
        break
        ;;
    esac
  done
  shift $((OPTIND-1))

  print_start "$_issilent"

  install_brews bash
  install_brews jq
  install_brews pipx
  install_brews python@3.11

  setup_python

  install_aurm
  install_dev_utilities

  print_success
}

# ------------------------------------------------------------------------------
print_start() {
  local _issilent="$1"
  local _str=""
  _str=$(cat << EOF
Bootstrapping system 🚀
=======================

EOF
  )
  print_lines "$_str"

  _str=$(cat << EOF
Before starting, you will need to have the following pre-requisites:

  1. You will need to be connected to the Commercial VPN.
  2. You will need the "Github EMU - atko" chiclet.

If you do not have any one of these, this bootstrap will fail. Stop here and
ensure you have the pre-reqs before continuing.

Additionally, we recommend fully logging out of Github in your default browser.
You can go to this page: https://github.com/logout.

EOF
  )
  print_lines "$_str"

  # keep going if silent
  if [ "$_issilent" = "true" ]; then
    print_line "- silent mode selected - moving on"
    return
  fi
  echo -n "Are you ready? [y/N] "
  read -r  _input
  case "$_input" in
    [yY][eE][sS]|[yY])
      ;;
    *)
      exit 1
      ;;
  esac
}

print_success() {
  local _str=""
  _str=$(cat << EOF

Bootstrapping is done! 🎉

You are now ready to git clone any Okta repo you have access to.  Keep in mind
if you are cloning repos from atko-* Github orgs, you will need to be on the
VPN prior.

http example:
  git clone https://github.com/atko-scratch/hello-oktanaut.git

ssh example:
  git clone git@github.com:atko-scratch/hello-oktanaut.git
  or
  git clone org-132288863@github.com:atko-scratch/hello-oktanaut.git

If you use Jetbrains IDEs, make sure to turn on 'Use credential
helper' under Settings \> Version Control \> Git

Happy Gitting! 🎉
EOF
  )

  print_lines "$_str"
}

setup_python() {
  print_line "- setting up python"
  python3 -m pip config "$PIP_FLAGS" set global.index-url "https://artifactory.prod.aue1k.saasure.net/artifactory/api/pypi/pypi-upstream/simple"
  python3 -m pip config "$PIP_FLAGS" set global.extra-index-url "https://artifactory.prod.aue1k.saasure.net/artifactory/api/pypi/eng-services-python/simple https://pypi.org/simple"
  python3 -m pip config "$PIP_FLAGS" set global.trusted-host "artifactory.prod.aue1k.saasure.net pypi.org files.pythonhosted.org"
}

install_brews() {
  local _brew_name="$1"

  print_line "- installing $_brew_name"
  brew install "$BREW_FLAGS" "$_brew_name"
}

install_aurm() {
  print_line "- installing aurm desktop client"

  # check if aurm-desktop-client has been installed
  pipx list --short | grep aurm-desktop-client > /dev/null
  if [ $? -eq 0 ]; then
    print_line "  cleaning up old install"
    pipx uninstall aurm-desktop-client > /dev/null
  fi

  # aurm only builds and runs with python 3.11, the fresh 3.12 release is not supported.
  # During build there is a Cython error and during run a call to a method that was
  # removed in  3.12. Both should be fixable but this was the proposed quick workaround.
  pipx install aurm-desktop-client --python "$(brew --prefix python@3.11)/bin/python3.11"
  pipx ensurepath

  # this line is needed here during bootstrap
  export PATH="$PATH:$HOME/.local/bin"

  _aurm_version="$(aurm --version)"
  if [ $? -ne 0 ]; then
    print_error "ERROR: aurm was not installed."
    exit -1
  fi
  print_line "- aurm is installed: ${_aurm_version}"
}

install_dev_utilities() {
  local _credential=""
  local _token=""
  local _user=""
  local _str=""

  _str=$(cat << EOF
- installing eng-svc dev utilities

  Note: If you are asked by github to login, make sure to login with your *atko*
  account \(firstname-lastname_atko\). You will be asked to install a Github App
  and you should accept the installation.  From here, you will see a blank web
  page in your default browser going to localhost:7777.  You will auth with OV
  as normal.

  If the bootstrap appears to hang, go to the blank web page and press "return".

EOF
)
  print_lines "$_str"

  _timestamp="$(date +"%Y%m%d-%H%M%S")"
  print_line "- backing up .gitconfig as .gitconfig.bak.$_timestamp"
  cp -a ~/.gitconfig ~/.gitconfig.bak."$_timestamp"

  print_line "- cleaning .gitconfig"
  for config in $(git config --global --list | grep 'url.https://'| cut -d'=' -f1); do
    git config --global --unset "$config"
  done

  print_line "- setting up the git wrapper in .gitconfig"
  git config --global credential.helper "$(brew --prefix bash)/bin/bash $HOME/.git-helpers/git-credential-okta-aurm $GIT_CRED_FLAGS -jq $(which jq)"
  git config --global credential.useHttpPath true
  #SSH CA
  git config --global core.sshCommand $HOME/.git-helpers/git-ssh-ca-aurm

  # TODO: this requires sudo because getting permission denied
  # sudo git config --system --unset credential.helper
}

print_lines() {
  local _messages="$1"

  while read line; do
    print_line "$line"
  done <<< $_messages
}

print_line() {
  local _message="$1"

  local _WHITEBOLD='\033[1;39m'
  local _GREENBOLD='\033[1;32m'
  local _NC='\033[0m'

  echo -e "${_GREENBOLD}>> ${_WHITEBOLD}${_message}${_NC}"
}

print_error() {
  local _message="$1"

  local _RED='\033[1;31m'
  local _NC='\033[0m'

  echo -e "${_RED}>> ${_message}${_NC}"
}

main "$@"
