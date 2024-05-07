describe('configuration.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.description};

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  describe('initialization', function() {

    it('should register configuration tooling', function() {
      spyOn(GM_config, 'init');
      fateBus.publish(brunchModule, 'fate.init');
      expect(GM_config.init).toHaveBeenCalled();
    });

    it('should broadcast the configuration', function() {
      spyOn(fateBus, 'publish').and.callThrough();
      fateBus.publish(brunchModule, 'fate.init');
      expect(fateBus.publish).toHaveBeenCalledWith(
        jasmine.any(Object),
        'fate.configurationLoaded',
        {
          rollDataTSV: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1131147082&single=true&output=tsv',
          armorRollTSV: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1332329724&single=true&output=tsv'
        }
      )
    });

    describe('defaults and attachment handling', function() {
      it('should use Slifs spreadsheet by default', function() {
        fateBus.publish(brunchModule, 'fate.init');
        expect(GM_config.get('rollDataTSV')).toBe('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1131147082&single=true&output=tsv');
        expect(GM_config.get('armorRollTSV')).toBe('https://docs.google.com/spreadsheets/d/e/2PACX-1vQ06pCDSdvu2nQzgHMXl22ci-6pO9rTTmvZmlKXaiBrIHVhl1X1awIaHEOagZcs4ME4X9ZMEghBP9NE/pub?gid=1332329724&single=true&output=tsv');
      });
    });
  });

});
