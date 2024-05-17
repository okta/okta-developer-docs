#!/bin/bash

broken_urls=($(comm -23 <(sort urls.txt | uniq) <(sort falsepos.txt | uniq)))
urls=$(echo "$broken_urls" | tr ' ' '\n')
hyperlinks=""
while IFS= read -r url; do
    hyperlinks+="<a href=\"$url\">$url</a><br/>"
done <<< "$urls"

if [ -n "$broken_urls" ]; then
    curl --location --request POST 'https://www.cinotify.cc/api/notify' \
            -d "to=${NOTIFY_EMAIL}&subject=FAILED: Dev Docs Nightly Job&type=text/html&body=<p style='font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; text-align: center; background-color: #ffcccc; padding: 10px;'>
            <span style='font-weight: bold;'>Nightly link checker job failed. See the list of broken URLs below.</span><br><br>
            <a href='https://app.circleci.com/pipelines/github/okta/okta-developer-docs/<< pipeline.number >>' style='display: inline-block; padding: 5px 10px; background-color: #4caf50; color: white; text-decoration: none;'>Click here</a>
            to see job details.<br>
        </p><h2 style='font-family: Arial, sans-serif; font-size: 16px; color: #333; line-height: 1.6; text-align: center;'>List of broken URLs:</h2>$hyperlinks"
fi