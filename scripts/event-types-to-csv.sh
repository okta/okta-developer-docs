#!/bin/bash

json_file="packages/@okta/vuepress-site/data/event-types.json"
csv_file="packages/@okta/vuepress-site/.vuepress/public/docs/okta-event-types.csv"

# Check if JSON is available
if [ ! -f "$json_file" ]; then
    echo "Error: JSON file not found."
    exit 1
fi

# Use jq to convert JSON to CSV

jq -r '.versions[].eventTypes[] | select(.beta != true and .internal !=true) | [ .id // empty, .description // empty, .tags[] // empty, .info.release //empty] | @csv' "$json_file" > "$csv_file"

echo "CSV file generated: $csv_file"