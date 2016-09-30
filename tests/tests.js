mocha.setup('bdd');

const {expect, assert} = chai;

describe('Tests', function() {
	describe('Initial test group', function() {

		beforeEach(function() {

		});
		afterEach(function() {
			
		});

		it('expect 2 to be 2 lol', function() {
			expect(2).to.equal(2);
		});
	});
});

mocha.run();
