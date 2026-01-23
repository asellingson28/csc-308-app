// You can assume the input parameters for the div() function will always be numbers and the input parameter for the containsNumbers() function will always be a string.


const myFuncs = require("./functions")

// ================= TESTING div FUNCTION ====================
test('Testing .div: simple even division', () => {
    const target = 4;
    const result = myFuncs.div(8, 2);
    expect(target).toBe(result);
    
});
test('Testing .div: result of dividing by infinity', () => {
    const target = Infinity
    const result = myFuncs.div(1, 0);
    expect(target).toBe(result);
    
});
test('Testing .div: result of dividing even and odd', () => {
    const target = 3.5
    const result = myFuncs.div(7, 2);
    expect(target).toBe(result);
    
});
test('Testing .div: result of dividing odd and odd, not int result', () => {
    const target = 1.667
    const result = myFuncs.div(5, 3);
    expect(target).toBeCloseTo(result, 1);
    
});
test('Testing .div: result of dividing odd and odd', () => {
    const target = 3
    const result = myFuncs.div(9, 3);
    expect(target).toBe(result);
    
});
test('Testing .div: result of dividing negative result with numerator', () => {
    const target = -3
    const result = myFuncs.div(-9, 3);
    expect(target).toBe(result);
    
});
test('Testing .div: result of dividing negative result with divisor', () => {
    const target = -3
    const result = myFuncs.div(9, -3);
    expect(target).toBe(result);
    
});


// ================= TESTING div FUNCTION ====================
test('Testing .containsNumbers: regular string no numbers', () => {
    const input = "HelloWorld"
    const result = myFuncs.containsNumbers(input)
    expect(result).toBeFalsy();
});
test('Testing .containsNumbers: regular string with !', () => {
    const input = "HelloWorld!"
    const result = myFuncs.containsNumbers(input)
    expect(result).toBeFalsy();
});
test('Testing .containsNumbers: regular string with ! and 0', () => {
    const input = "Hell0W0rld!"
    const result = myFuncs.containsNumbers(input)
    expect(result).toBeTruthy();
});
test('Testing .containsNumbers: regular string no numbers but with space', () => {
    const input = "Hello World"
    const result = myFuncs.containsNumbers(input)
    expect(result).toBeTruthy();
});
test('Testing .containsNumbers: regular string with ! but with space', () => {
    const input = "Hello World!"
    const result = myFuncs.containsNumbers(input)
    expect(result).toBeTruthy();
});
test('Testing .containsNumbers: regular string with ! and 0', () => {
    const input = "Hell0 W0rld! but with space"
    const result = myFuncs.containsNumbers(input)
    expect(result).toBeTruthy();
});

