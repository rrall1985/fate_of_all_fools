describe('shaderDecorator.js', function() {

  const fateBus = require('fateBus.js');
  const brunchModule = {id:'test'+this.result.description};
  const shader = require('shader.js');
  const shaderDatabase = require('shaderDatabase').shaderDB;

  const KEEP_SHADER_NAME = 'New Age Black Armory';
  const NO_KEEP_SHADER_NAME = 'Vitrified Chronology'

  beforeEach(function() {
    fateBus.registerModule(brunchModule);
  });

  beforeEach(function() {
    loadFixtures(
      'entireDocumentRaw-6.2.0.html'
    );
    spyOn(shaderDatabase, 'contains').and.callFake(function(name) {
      // "Registering" one from inventory and one the from vault
      return ['New Age Black Armory','Vitrified Chronology'].includes(name);
    });
    spyOn(shaderDatabase, 'get').and.callFake(function(name) {
      switch(name) {
        case KEEP_SHADER_NAME:
          return {name: KEEP_SHADER_NAME, keepStatus:shader.Keep.YES, comments: 'Cool winter camo!'};
        case NO_KEEP_SHADER_NAME:
          return {name: NO_KEEP_SHADER_NAME, keepStatus:shader.Keep.NO, comments: 'Titan vomitorium :('};
      }
    });
    fateBus.publish(brunchModule, 'fate.refresh');
  })

  describe('in response to fate.refresh', function() {
    it('should store the original shader name', function() {
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toExist();
      expect($('[data-fate-shader-name="'+NO_KEEP_SHADER_NAME+'"]')).toExist();
      expect($('[data-fate-shader-name="Crucible Vermillion"]')).toExist();
      expect($('[data-fate-shader-name="Iron Oxide"]')).toExist();
    });
    it('should store if the shader is registered', function() {
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-registered', 'true');
      expect($('[data-fate-shader-name="'+NO_KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-registered', 'true');
      expect($('[data-fate-shader-name="Crucible Vermillion"]')).toHaveAttr('data-fate-shader-registered', 'false');
      expect($('[data-fate-shader-name="Iron Oxide"]')).toHaveAttr('data-fate-shader-registered', 'false');
    });
    it('should store if we should keep the shader', function() {
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-keep', 'true');
      expect($('[data-fate-shader-name="'+NO_KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-keep', 'false');
    });
    it('should store the comments', function() {
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-comment', 'Cool winter camo!');
      expect($('[data-fate-shader-name="'+NO_KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-comment', 'Titan vomitorium :(');
    });
  });

  describe('on subsequent refreshes', function() {

    it('should not overwrite the original shader name' , function() {
      $('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]').attr('title', '_');
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]')).toHaveAttr('data-fate-shader-name', KEEP_SHADER_NAME);
    });

    it('should remove registered attributes if the shader becomes unregistered', function() {
      $('[data-fate-shader-name="'+KEEP_SHADER_NAME+'"]').attr('data-fate-shader-name', 'TEST_NOW_UNREGISTERED');
      fateBus.publish(brunchModule, 'fate.refresh');
      expect($('[data-fate-shader-name="TEST_NOW_UNREGISTERED"]')).toHaveAttr('data-fate-shader-registered', 'false');
      expect($('[data-fate-shader-name="TEST_NOW_UNREGISTERED"]')).not.toHaveAttr('data-fate-shader-keep');
      expect($('[data-fate-shader-name="TEST_NOW_UNREGISTERED"]')).not.toHaveAttr('data-fate-shader-comment');
    })
  });

});
