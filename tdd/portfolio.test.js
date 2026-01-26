const Portfolio = require('./portfolio');

// 2.1
test('starts with no ticker symbols and zero shares', () => {
	const portfolio = new Portfolio();

	expect(portfolio.owned).toEqual({}); // empty dictionary
});

// 2.2
test('test whether a portfolio is empty', () => {
	const portfolio = new Portfolio();
	expect(portfolio.isEmpty()).toBeTruthy();
});

test('test whether a portfolio is not empty', () => {
	const portfolio = new Portfolio();
	portfolio.owned = {"ABC123": 1};
	console.log(portfolio.isEmpty())
	expect(portfolio.isEmpty()).toBeFalsy();
});

// 2.3
test("buying a singular share of stock adds that stock to the portfolio with one share", () => {
	const portfolio = new Portfolio();
	portfolio.buy("XYZ", 1);

	expect(portfolio.owned).toEqual({"XYZ": 1});
});

test("buying one stock and then a second stock, testing isEmpty as well", () => {
	const portfolio = new Portfolio();
	portfolio.buy("XYZ", 1);
	expect(portfolio.owned).toEqual({"XYZ": 1});

	portfolio.buy("ABC", 3);
	expect(portfolio.owned).toEqual({"XYZ": 1, "ABC": 3});
	expect(portfolio.isEmpty()).toBeFalsy();
});

// this may be more than the Minimum Viable Product
test("buying one stock and then a second stock of the same ticker", () => {
	const portfolio = new Portfolio();
	portfolio.buy("XYZ", 1);
	expect(portfolio.owned).toEqual({"XYZ": 1});

	portfolio.buy("XYZ", 3);
	expect(portfolio.owned).toEqual({"XYZ": 1, "XYZ": 3});
	expect(portfolio.isEmpty()).toBeFalsy();
});

// test("testing throwing an error when buying negative shares", () => {
// 	const portfolio = new Portfolio();
// 	portfolio.buy("XYZ", 4);
// 	expect(portfolio.owned).toEqual({"XYZ": 4});

	
// 	expect(() => portfolio.buy("XYZ", -4)).toThrow("Cannot buy negative shares");
// });

// 2.4 

test("testing selling a stock that is owned", () => {
	const portfolio = new Portfolio();
	portfolio.buy("XYZ", 4);
	expect(portfolio.owned).toEqual({"XYZ": 4});

	portfolio.sell("XYZ", 2);
	expect(portfolio.owned).toEqual({"XYZ": 2});
	portfolio.sell("XYZ", 2);
	expect(portfolio.owned).toEqual({}); // altered in step 2.6
});


// DO NOT ADD
// test selling a stock not owned
// test selling more shares than owned
// test selling negative shares

// 2.5

test("testing counting the unique ticker symbols", () => {
	const portfolio = new Portfolio();

	portfolio.buy("GMR", 5);
	portfolio.buy("RBLX", 10);

	expect(portfolio.uniqueTickerCount()).toBe(2);
});

// 2.6

test("testing selling a stock that is owned", () => {
	const portfolio = new Portfolio();
	portfolio.buy("XYZ", 4);
	expect(portfolio.owned).toEqual({"XYZ": 4});

	portfolio.sell("XYZ", 2);
	expect(portfolio.owned).toEqual({"XYZ": 2});
	portfolio.sell("XYZ", 2);
	expect(portfolio.owned).toEqual({});
});

// 2.7 

test("testing get shares of a ticker", () => {
	const portfolio = new Portfolio();
	portfolio.buy("AAPL", 10);
	portfolio.buy("GOOGL", 5);

	expect(portfolio.getShares("AAPL")).toBe(10);
	expect(portfolio.getShares("GOOGL")).toBe(5);
	expect(portfolio.getShares("MSFT")).toBe(0); // not owned
});

// 2.8

test("testing selling more shares than owned", () => {
	const portfolio = new Portfolio();
	portfolio.buy("XYZ", 4);
	expect(portfolio.owned).toEqual({"XYZ": 4});

	expect(
		() => portfolio.sell("XYZ", 5)
	).toThrow("Cannot sell more shares than owned");
});

/**
 * Reflection:
 * 
 * While this was a good exercise in TDD, I felt that some of the test cases were a bit hard to implement. I found that I often added more functionality than necessary before writing the base cases.
 * For example, in the buy method, I initially added checks for negative shares, which were not required by the test cases. Upon revision I removed them.
 * Also, see the unique tickercount method in portfolio.js for an example of a test case that felt a bit unrefined. To correctly do this the buy method should be changed.
 */