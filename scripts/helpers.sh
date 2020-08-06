#!/bin/bash

###############################################################################
# LINT
###############################################################################
export GENERATED_SITE_LOCATION=${OKTA_HOME}/${REPO}/packages/vuepress-site/.vuepress/dist

function url_consistency_check() {
    if [ ! -d "$GENERATED_SITE_LOCATION" ]; then
       echo "Directory ${GENERATED_SITE_LOCATION} not found";
       return 1;
    fi

    url_consistency_check_file=`mktemp`
    # Search the dist directory for all files (-type f) ending in .html (-iname '*.html')
    find $GENERATED_SITE_LOCATION -type f -iname '*.html' | \
        # 'grep' all found files for 'api-uri-template', printing line numbers on output
        xargs grep -n api-uri-template | \
        # Search for the 'api/v' string, so we match "api/v1", "api/v2", etc
        grep -v "{baseUrl}\?</strong>\/v" | grep -v /api/v | grep -v /oauth2 | grep -v /.well-known | \
        # The 'sed' command below pulls out the filename (\1), the line number (\2) and the URL path (\3)
        # For example, this:
        # dist/docs/api/resources/authn.html:2278:<p><span class="api-uri-template api-uri-post"><span class="api-label">POST</span> /api/v1/authn</span></p>
        # becomes this:
        # dist/docs/api/resources/authn.html:2278:/api/v1/authn
        sed -e 's/^\([^:]*\):\([^:]*\).*<\/span> \(.*\)<\/span>.*/\1:\2:\3/' | \
        # Write the results to STDOUT and the $url_consistency_check_file
        tee $url_consistency_check_file
    # Return "True" if the file is empty
    return `[ ! -s $url_consistency_check_file ]`
}

function duplicate_slug_in_url() {
    output_file=`mktemp`
    find $GENERATED_SITE_LOCATION -iname '*.html' | xargs grep '/api/v1/api/v1' | tee $output_file
    # Return "True" if the file is empty
    return `[ ! -s $output_file ]`
}

###############################################################################
# SETUP
###############################################################################

# Print an easily visible line, useful for log files.
function interject() {
    echo "----- ${1} -----"
}

function check_for_yarn_dependencies() {
    interject 'Checking Yarn dependencies'
    command -v yarn > /dev/null 2>&1 || { echo "This script requires 'yarn', which is not installed"; exit 1; }
    npm install
    interject 'Done checking Yarn dependencies'
}

function generate_html() {
    check_for_jekyll_dependencies

    interject 'Building Site'

    if [ ! -d $GENERATED_SITE_LOCATION ]; then
        check_for_yarn_dependencies
        yarn migrate
        yarn build
        local status=$?
        interject 'Done generating HTML'
        return $status
    else
        interject 'HTML already generated'
        return 0
    fi
}

function generate_conductor_file() {
    pushd $GENERATED_SITE_LOCATION
    CONDUCTOR_FILE=conductor.yml
    find -type f -iname 'index.html' | xargs dirname | sed -s "s/^\.//" | while read -r line ; do
        if [ ! -z "${line}" ]; then
            echo "  - from: ${line}" >> ${CONDUCTOR_FILE}
            echo "    to: ${line}/" >> ${CONDUCTOR_FILE}
        fi
    done
    popd
}

function require_env_var() {
    local env_var_name=$1
    eval env_var=\$$env_var_name
    if [[ -z "${env_var}" ]]; then
        echo "Environment variable '${env_var_name}' must be defined, but isn't.";
        exit 1
    fi
}

# Check for broken markdown headers
function header_checker() {
    local dir=$(pwd)
    local allheaders=$( grep -EoR "##" --include="*.html" $dir --exclude-dir={node_modules,scripts,tests,dist,_source,vendor} | sort | uniq )
    if [ "$allheaders" ];
    then
        echo $allheaders
        echo "Files contain broken headers."
        return 1
    fi
}

function check_for_quickstart_pages_in_sitemap() {
    if grep "quickstart/[^<]" dist/sitemap.xml;
    then
        exit 1
    fi
}

function fold() {
    local name=$1
    local command="${@:2}"
    echo -en "travis_fold:start:${name}\\r"
    echo "\$ ${command}"
    ${command}
    echo -en "travis_fold:end:${name}\\r"
}

function send_promotion_message() {
    curl -H "Authorization: Bearer ${TESTSERVICE_SLAVE_JWT}" \
      -H "Content-Type: application/json" \
      -X POST -d "[{\"artifactId\":\"$1\",\"repository\":\"npm-release\",\"artifact\":\"$2\",\"version\":\"$3\",\"promotionType\":\"ARTIFACT\"}]" \
      -k "${APERTURE_BASE_URL}/v1/artifact-promotion/createPromotionEvent"
}
