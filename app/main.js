// Install the configuration interface and set default values
require('configuration.js');

// Use DIM styling overrides and our own custom styling
require('beautification.js');

// Update weapon comments from our database
require('commentDecorator.js');

// Show higher/lower dupes
require('dupeIndicator.js');

// Retrieve and publish data for all item types
require('itemDataRefresher.js');

// Copy-to-clipboard support for the serial number
require('itemIdCopy.js');

require('shader.js');
require('shaderDatabase.js');
require('shaderDecorator.js');
require('shaderDataRefresher.js');
require('shaderStatusIndicator.js');

require('weaponDecorator.js');
require('weaponRollAssessment.js');
require('weaponRollDatabase.js');
require('weaponRollDataRefresher.js');

require('armorDecorator.js');
require('armorRollAssessment.js');
require('armorRollDatabase.js');
require('armorRollDataRefresher.js');

require('indicators.js');

/*
  The nicest change-refresh flow means loading the development version of
  the script from Tampermonkey while editing. This lets us skip kicking off
  the app when running under Karma.
*/
if (!window.navigator.userAgent.includes('HeadlessChrome')) {
  const logger = require('logger');
  const $ = require('jquery');

  logger.setEnabled(true);
  logger.log('main.js: Initializing');

  // One-time configuration (CSS, data URLs, etc.)
  fateBus.publish(module, 'fate.init');
  
  // Refresh from Google Sheets
  fateBus.publish(module, 'fate.itemDataStale');

  // First update, ASAP
  let intervalId = setInterval(function() {
    if ($('.item-img').length > 1) {
      clearInterval(intervalId);
      fateBus.publish(module, 'fate.refresh');
    }
  }, 100);

  // Update from Google Sheets every so often, but it doesn't refresh cache all
  // that often so we can chill out for a bit
  setInterval(function() {
    fateBus.publish(module, 'fate.itemDataStale');
  }, 60000);

  // When we move items around, delete items, etc. they need to be refreshed
  setInterval(function() {
    fateBus.publish(module, 'fate.refresh');
  }, 3000);
}
