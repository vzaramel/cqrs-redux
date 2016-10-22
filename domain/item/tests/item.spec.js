var assert = require('assert');
var bddTest = require('../../../lib/bddTest')

import items from '../'

var given = bddTest.given;
var when =  bddTest.when;
var then =   bddTest.then;
var thenFailWith =   bddTest.thenFailWith;


describe('ItemAggregate', function() {
  const {reducer, handlers, errors} = items;
  const Test = bddTest.setup(reducer, handlers);
  describe('Create Item', function() {
    it('Should Return Event Item Created', function() {
        Test(
          given(),
          when({
              command: 'createItem',
              payload:{
                id: '123',
                text: 'hello'
              }
          }),
          then({
              event: 'itemCreated',
              payload:{
                id: '123',
                text: 'hello'
              }
          })
        )
    });

    it('Should Give Error', function() {
        Test(
          given(),
          when({
              command: 'changeItem',
              aggId: 'testId',
              payload:{
                text: 'hello'
              }
          }),
          thenFailWith(new errors.ItemDoesNoteExists())
        )
    });

    it('Change Item text shoul return ItemChanged Event', function() {
        Test(
          given({
              event: 'itemCreated',
              payload:{
                id: '123',
                text: 'hello'
              }
          }),
          when({
              command: 'changeItem',
              aggId: '123',
              payload:{
                text: 'hello World'
              }
          }),
          then({
              event: 'itemChanged',
              payload:{
                id: '123',
                text: 'hello World'
              }
          })
        )
    });
  });
});
