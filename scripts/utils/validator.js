let Validator = (function () {
    function isNullOrUndefined(parameter) {
        if (parameter === null || parameter === undefined) {
            throw new Error(`parameter is null or undefined!`);
        }
    }

    function isInstanceOf(childInstance, parentClass) {
        if (!(childInstance instanceof parentClass)) {
            throw new Error(`${childInstance} must be instance of ${parentClass}`);
        }
    }

    function isEmptyString(parameter) {
        if (parameter.length === 0) {
            throw new Error(`parameter is empty string!`);
        }
    }

    function validateStringRange(parameter, min, max) {
        if (parameter.length < min || parameter.length > max) {
            throw new Error(`parameter must have length between ${min} and ${max}`);
        }
    }

    function isStringType(parameter) {
        if (typeof (parameter) !== 'string') {
            throw new Error(`parameter type is not a string!`);
        }
    }

    function containsOnlyDigits(parameter) {
        if (!(/^[\d]+$/g.test(parameter))) {
            throw new Error(`parameter must contain only digits!`);
        }
    }

    function containsOnlyLetters(parameter) {
        if (!(/^[a-zA-Z]+$/g.test(parameter))) {
            throw new Error(`parameter must contain only letters!`);
        }
    }

    function containsOnlyLettersAndDigits(parameter) {
        if (!(/^[a-zA-Z0-9]+$/g.test(parameter))) {
            throw new Error(`parameter must contain only letters and digits!`);
        }
    }

    return {
        isNullOrUndefined: isNullOrUndefined,
        isInstanceOf: isInstanceOf,
        isEmptyString: isEmptyString,
        validateStringRange: validateStringRange,
        isStringType: isStringType,
        containsOnlyDigits: containsOnlyDigits,
        containsOnlyLetters: containsOnlyLetters,
        containsOnlyLettersAndDigits: containsOnlyLettersAndDigits
    };
} ());

export { Validator };