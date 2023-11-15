#!/bin/bash

json_file="/Users/brianduffield/Documents/okta-developer-docs/packages/@okta/vuepress-site/data/event-types.json"
csv_file="/Users/brianduffield/Documents/okta-developer-docs/packages/@okta/vuepress-site/data/event-types-output.csv"

# Check if JSON is availab le
if [ ! -f "$json_file" ]; then
    echo "Error: JSON file not found."
    exit 1
fi

# Use jq to convert JSON to CSV
#jq -r '.eventTypes | map([.version, .releaseDate] | @csv) | (.[0] | keys_unsorted) as $keys | $keys, .[]' "$json_file" > "$csv_file"

# Use jq to convert "eventTypes" array within "versions" array to CSV, if it exists
jq -r 'if has("versions") and (.versions | arrays) then .versions[] | select(has("eventTypes") and (.eventTypes | arrays)) | .eventTypes | map([.id, .description] | @csv) | (.[0] | keys_unsorted) as $keys | $keys, .[] else empty end' "$json_file" > "$csv_file"