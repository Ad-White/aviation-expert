# Testing

Return back to the [README.md](README.md) file.

## Code Validation

### HTML

I have used the recommended [HTML W3C Validator](https://validator.w3.org) to validate my HTML.

To guarentee the testing of the tileTable code I had written.
I copy and pasted the large html section from within the script.js file containing the tileTable.
I then added that just under the welcome div within the game-area section in the index.html file.
I copy and pasted the result of this as a direct input into the validator.

| Page | W3C URL | Screenshot | Notes |
| --- | --- | --- | --- |
| By URI | [W3C](https://validator.w3.org/nu/?doc=https%3A%2F%2FAd-White.github.io%2Faviation-expert%2Findex.html) | ![screenshot](documentation/validation/html_url.png) | Pass |
| By Direct Input| --- | ![screenshot](documentation/validation/html_direct_input.png) | Pass |


### CSS

I have used the recommended [CSS Jigsaw Validator](https://jigsaw.w3.org/css-validator) to validate my CSS file.

To get a result without the interference of bootstrap being tested along side my own code.
I copy and pasted the style.css file and tested using direct input.

| File | Jigsaw URL | Screenshot | Notes |
| --- | --- | --- | --- |
| style.css - testing by URL | [Jigsaw](https://jigsaw.w3.org/css-validator/validator?uri=https%3A%2F%2Fad-white.github.io%2Faviation-expert%2F&profile=css3svg&usermedium=all&warning=1&vextwarning=&lang=en) | ![screenshot](documentation/validation/css_url.png) | Errors and Warnings - Result of trying to validate framework |
| style.css - testing by Direct Input | --- | ![screenshot](documentation/validation/css_direct_input.png) | Pass |


### JavaScript

I have used the recommended [JShint Validator](https://jshint.com) to validate my JS file.

| File | Screenshot | Notes |
| --- | --- | --- |
| Congiguration Used For Test | ![screenshot](documentation/validation/jshint_config.png) | ES6 setting used |
| script.js - Inital Report| ![screenshot](documentation/validation/jshint_initial_report.png) | Two warnings, eight undefined variables |
| script.js - Final Report| ![screenshot](documentation/validation/jshint_final_report.png) | Final Result |


## Browser Compatibility

I've tested my deployed project on multiple browsers to check for compatibility issues.

| Browser | Home | Game Start | Guess | Incorrect Answer / Skip | Next Level | Game Over | Game Completed | Quit - Continue / Exit |  Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| Chrome | ![screenshot](documentation/chrome_desktop_home.png) | ![screenshot](documentation/chrome_desktop_start.png) | ![screenshot](documentation/chrome_desktop_guess.png) | ![screenshot](documentation/chrome_desktop_answer_incorrect.png) | ![screenshot](documentation/chrome_desktop_next_level.png) | ![screenshot](documentation/chrome_desktop_game_over.png) | ![screenshot](documentation/chrome_desktop_game_completed.png) | ![screenshot](documentation/chrome_desktop_quit.png) | Works as expected |
| Safari | ![screenshot](documentation/safari_laptop_home.png) | ![screenshot](documentation/safari_laptop_start.png) | ![screenshot](documentation/safari_laptop_guess.png) | ![screenshot](documentation/safari_laptop_answer_incorrect.png) | ![screenshot](documentation/safari_laptop_next_level.png) | ![screenshot](documentation/safari_laptop_game_over.png) | ![screenshot](documentation/safari_laptop_game_completed.png) | ![screenshot](documentation/safari_laptop_quit.png) | Works as expected | 
| Firefox |![screenshot](documentation/firefox_desktop_home.png) | ![screenshot](documentation/firefox_desktop_start.png) | ![screenshot](documentation/firefox_desktop_guess.png) | ![screenshot](documentation/firefox_desktop_answer_incorrect.png) | ![screenshot](documentation/firefox_desktop_next_level.png) | ![screenshot](documentation/firefox_desktop_game_over.png) | ![screenshot](documentation/firefox_desktop_game_completed.png) | ![screenshot](documentation/firefox_desktop_quit.png) | Works as expected | 


## Responsiveness

I've tested my deployed project on multiple devices to check for responsiveness issues.

| Device | Home | Game Start | Guess | Incorrect Answer / Skip | Next Level | Game Over | Game Completed | Quit - Continue / Exit |  Notes |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | 
| Mobile | ![screenshot](documentation/safari_mobile_home.png) | ![screenshot](documentation/safari_mobile_start.png) | ![screenshot](documentation/safari_mobile_guess.png) | ![screenshot](documentation/safari_mobile_answer_incorrect.png) | ![screenshot](documentation/safari_mobile_next_level.png) | ![screenshot](documentation/safari_mobile_game_over.png) | ![screenshot](documentation/safari_mobile_game_completed.png) | ![screenshot](documentation/safari_mobile_quit.png) | Works as expected |
| Tablet (DevTools) - Horizontal | ![screenshot](documentation/chrome_tablet_home.png) | ![screenshot](documentation/chrome_tablet_start.png) | ![screenshot](documentation/chrome_tablet_guess.png) | ![screenshot](documentation/chrome_tablet_answer_incorrect.png) | ![screenshot](documentation/chrome_tablet_next_level.png) | ![screenshot](documentation/chrome_tablet_game_over.png) | ![screenshot](documentation/chrome_tablet_game_completed.png) | ![screenshot](documentation/chrome_tablet_quit.png) | Works as expected |
| Desktop | ![screenshot](documentation/chrome_desktop_home.png) | ![screenshot](documentation/chrome_desktop_start.png) | ![screenshot](documentation/chrome_desktop_guess.png) | ![screenshot](documentation/chrome_desktop_answer_incorrect.png) | ![screenshot](documentation/chrome_desktop_next_level.png) | ![screenshot](documentation/chrome_desktop_game_over.png) | ![screenshot](documentation/chrome_desktop_game_completed.png) | ![screenshot](documentation/chrome_desktop_quit.png) |  Works as expected |


## Lighthouse Audit

I've tested my deployed project using the Lighthouse Audit tool to check for any major issues.

| Status | Test Used | Size | Screenshot | Notes |
| --- | --- | --- | --- | --- |
| Start | Navigation | Mobile | ![screenshot](documentation/validation/lighthouse_navigation_mobile.png) | No warnings |
| Start | Navigation | Desktop | ![screenshot](documentation/validation/lighthouse_navigation_desktop.png) | No warnings |
| Game | Snapshot | Mobile | ![screenshot](documentation/validation/lighthouse_snapshot_mobile.png) | No warnings |
| Game | Snapshot | Desktop | ![screenshot](documentation/validation/lighthouse_snapshot_desktop.png) | No warnings |
| Game In Play | Timespan | Mobile | ![screenshot](documentation/validation/lighthouse_timespan_mobile.png) | Duration: 1 level - No warnings |
| Game In Play | Timespan| Desktop | ![screenshot](documentation/validation/lighthouse_timespan_desktop.png) | Duration: 1 level - No warnings |


