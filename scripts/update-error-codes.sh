#!/usr/bin/env bash
# See https://bit.ly/2WRXVta for details

# Strict
set -o errexit -o pipefail

# Constants
readonly url=https://bit.ly/3i5eThn
readonly archive=/tmp/api-errors.zip
readonly file=error-codes.json
readonly dir=packages/@okta/vuepress-site/data

main() {
    error-codes-download
    echo
    error-codes-update
    echo
    error-codes-diff
}

error-codes-download() {
    banner "Downloading jar from $url..."
    curl -k -L $url > $archive || die "Could not download file"
}

error-codes-update() {
    banner "Updating $file..."
    unzip -o $archive api-errors.json -d $dir || die "Could not unzip file"
    mv $dir/api-errors.json $dir/$file
    rm $archive
}

error-codes-diff() {
    banner "Showing differences in $file..."
    git --no-pager diff $dir/$file || die "Could not diff file"
}

banner() {
    local -r line=$(printf -- '-%.0s' {1..100}); status $line; status "$1"; status $line;
}

status() {
    green "$1";
}

die() {
    red "${1:-Exiting}" >&2 && exit 1;
}

green() {
    ansi 32 "$@";
}
red() {
    ansi 91 "$@";
}
ansi() {
    echo -e "\033[${1}m${*:2}\033[0m";
}

# Entry point
main
