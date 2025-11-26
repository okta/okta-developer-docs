``` bash
resource "okta_review" "test" 
{
  campaign_id = "icizigd86iM9sOcbN1d6"
  reviewer_id = "00unli90kor62oF5Z1d7"
  review_ids = [
    "icrztblxbBFiVKepb1d6"
  ]
  reviewer_level="FIRST"
  note = "John Smith is on leave for this month. His manager Tim will be the reviewer instead."
}
```
