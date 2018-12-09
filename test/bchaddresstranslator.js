'use strict';

var _ = require('lodash');
var chai = require('chai');
var sinon = require('sinon');
var should = chai.should();
var t = require('../lib/bchaddresstranslator');

describe('LTZ Address translator', function() {
 
  describe('#getAddressCoin', function() {
    it('should identify btc as coin for 1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA', function() {
      t.getAddressCoin('1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA').should.equal('legacy');
    });
    it('should identify ltz as coin for L1Ucd8BU7KfeoGWXFjgwerQHVHQS6uMVzfA', function() {
      t.getAddressCoin('L1Ucd8BU7KfeoGWXFjgwerQHVHQS6uMVzfA').should.equal('copay');
    });
    it('should return null for 1L', function() {
      should.not.exist(t.getAddressCoin('1L'));
    });
  });
 

  describe('#translateAddress', function() {
    it('should translate address from btc to ltz', function() {
      var res = t.translate('1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA', 'copay');
      res.should.equal('L1Ucd8BU7KfeoGWXFjgwerQHVHQS6uMVzfA');
    });
    it('should translate address from ltz to btc', function() {
      var res = t.translate('HBf8isgS8EXG1r3X6GP89FmooUmiJ42wHS', 'legacy');
      res.should.equal('36q2G5FMGvJbPgAVEaiyAsFGmpkhPKwk2r');
    });
 
    it('should keep the address if there is nothing to do (ltz)', function() {
      var res = t.translate('L1Ucd8BU7KfeoGWXFjgwerQHVHQS6uMVzfA', 'copay');
      res.should.equal('L1Ucd8BU7KfeoGWXFjgwerQHVHQS6uMVzfA');
    });
    it('should keep the address if there is nothing to do (btc)', function() {
      var res = t.translate('1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA', 'legacy');
      should.exist(res);
      res.should.equal('1LqBGSKuX5yYUonjxT5qGfpUsXKYYWeabA');
    });
  });
});

