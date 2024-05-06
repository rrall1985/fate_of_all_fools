[![Build Status](https://travis-ci.org/rslifka/fate_of_all_fools.svg?branch=master)](https://travis-ci.org/rslifka/fate_of_all_fools)

# Overview

`Fate of All Fools` (`Fate`) is a suite of visual modifications and data overlays on top of [Destiny Item Manager](https://www.destinyitemmanager.com/) (DIM) for the Destiny video game. *`Fate` only works with the online version of DIM, not the DIM browser extension.*

# Quickstart

1. Install the [Tampermonkey](https://tampermonkey.net/) browser extension.
1. Install `Fate` from [OpenUserJS](https://openuserjs.org/scripts/rslifka/FateOfAllFools_-_DIM_Customization).
1. Do nothing, and enjoy only the visual enhancements `Fate` provides.
1. TODO - Link to data customization

# Features

`Fate` builds on DIM in two ways:

1. **Visual Modification**: It modifies the presentation of **existing** information (that DIM provides).
1. **Information Overlays**: It displays **new** information (that you provide).

We'll review each of these below (TODO).

# Development Setup
`Fate of All Fools` is a node-based project using ES6 (TypeScript wasn't yet a thing when I kicked this off in 2017). Much of the complexity of project configuration has been done to accelerate the local `modify => refresh => test` loop! Upon saving any file, everything is built, tested and bundled.

1. [Install Tampermonkey](https://chrome.google.com/webstore/detail/Tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) from the Chrome Web Store. You cannot use the Safari version of TamperMonkey for development because Safari will not allow you to configure the next setting.
1. In Chrome's "Extension" settings, choose "Tampermonkey" and enable the option `Allow access to file URLs`. This allows you to refresh your browser to pick up changes during development, using the file URLs present in the next steps.
1. Create a new script in Tampermonkey and paste the contents of [fateOfAllFools.dev.user.js](https://github.com/rslifka/fate_of_all_fools/blob/master/fateOfAllFools.dev.user.js).
1. Modify the `@require` and `@resource` directives to be accurate based on your filesystem.
1. `npm install`
1. `brunch watch` Monitors filesystem for changes to JS and CSS, building as appropriate.
1. `karma start` Monitors assets for changes, running tests in response.
