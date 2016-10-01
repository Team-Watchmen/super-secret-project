import { Validator } from '../scripts/utils/validator.js';

mocha.setup('bdd');

const {expect, assert} = chai;


describe('Public scripts tests', function () {
	describe('Validator tests', function () {
		it('Expect isNullOrUndefined to throw when passed a null value', function () {
			expect(Validator.isNullOrUndefined.bind(Validator, null)).to.Throw();
		});
		it('Expect isNullOrUndefined to throw when passed undefined', function () {
			expect(Validator.isNullOrUndefined.bind(Validator, undefined)).to.Throw();
		});
		it('Expect isNullOrUndefined to not throw when passed a valid argument', function () {
			expect(Validator.isNullOrUndefined.bind(Validator, 1)).to.not.Throw();
		});
		it('Expect isInstanceOf to not throw when passed arguments are of the same type', function () {
			let exampleInstance = [1, 2];
			expect(Validator.isInstanceOf.bind(Validator, exampleInstance, Array)).to.not.Throw();
		});
		it('Expect isInstanceOf to throw when passed arguments are not of the same type', function () {
			let exampleInstance = 22;
			expect(Validator.isInstanceOf.bind(Validator, exampleInstance, Array)).to.Throw();
		});
		it('Expect isEmptyString to throw when passed argument is empty string', function () {
			expect(Validator.isEmptyString.bind(Validator, '')).to.Throw();
		});
		it('Expect isEmptyString to not throw when passed argument is not empty string', function () {
			expect(Validator.isEmptyString.bind(Validator, '22')).to.not.Throw();
		});
		it('Expect validateStringRange to throw when passed argument size is lower than requirements', function () {
			expect(Validator.validateStringRange.bind(Validator, '22', 4, 10)).to.Throw();
		});
		it('Expect validateStringRange to throw when passed argument size is higher than requirements', function () {
			expect(Validator.validateStringRange.bind(Validator, '22qweqweqweqweasd', 4, 7)).to.Throw();
		});
		it('Expect validateStringRange to not throw when passed argument size is within bounds', function () {
			expect(Validator.validateStringRange.bind(Validator, 'something', 4, 13)).to.not.Throw();
		});
		it('Expect isStringType to throw when passed argument is not a string', function () {
			expect(Validator.isStringType.bind(Validator, 666)).to.Throw();
		});
		it('Expect isStringType to not throw when passed argument is a string', function () {
			expect(Validator.isStringType.bind(Validator, 'something')).to.not.Throw();
		});
		it('Expect containsOnlyDigits to not throw when passed argument contains only digits', function () {
			expect(Validator.containsOnlyDigits.bind(Validator, '123456')).to.not.Throw();
		});
		it('Expect containsOnlyDigits to throw when passed argument contains non-digit symbols', function () {
			expect(Validator.containsOnlyDigits.bind(Validator, '1s0me7hing')).to.Throw();
		});
		it('Expect containsOnlyLetters to throw when passed argument contains non-letter symbols', function () {
			expect(Validator.containsOnlyLetters.bind(Validator, '1s0me7hing')).to.Throw();
		});
		it('Expect containsOnlyLetters to not throw when passed argument contains only letters', function () {
			expect(Validator.containsOnlyLetters.bind(Validator, 'something')).to.not.Throw();
		});
		it('Expect containsOnlyLettersAndDigits to not throw when passed argument contains only letters and/or digits', function () {
			expect(Validator.containsOnlyLettersAndDigits.bind(Validator, 'something1')).to.not.Throw();
		});
		it('Expect containsOnlyLettersAndDigits to throw when passed argument contains symbols that arent letters/digits', function () {
			expect(Validator.containsOnlyLettersAndDigits.bind(Validator, 'you@the1stAcademy7')).to.Throw();
		});
	});

	describe(' tests', function () {

		beforeEach(function () {

		});
		afterEach(function () {

		});

		it('expect ', function () {
			expect(2).to.equal(2);
		});
	});
});

mocha.run();
