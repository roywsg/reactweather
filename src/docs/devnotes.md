# Dev Notes

#### High level story
- User can key in city or country name and view the current weather.
- Store search history.
- Retrieve weather of search history.
- Delete history entries.
- Display error messages if no cities or countries match.


#### Assumptions
- City or Country is required for search not both.
- Max 10 histories. Start to replace the earliest entries if exceeded.
- Max 50 length for city, 5 for country input boxes.
- Histories stored to localstorage.
- No error log persistence required.
- History can contain duplicates
- Mobile responsive
- Light and dark mode

#### Possible enhancements
- Paginate history
- Instead of duplicated hisory, increment frequency
- List hisory sorted by most frequently searched
- Protect api key with backend call instead
- Cache fetched data
- Clear all histories
- Enhance ui with images