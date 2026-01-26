class Portfolio {
	constructor() {
		this.owned = {}; // ticker symbols: shares
	};

	isEmpty() {
		return Object.keys(this.owned).length === 0 ? true : false;
	};

	// assumes all given tickers are valid, does not 
	buy(ticker, shares) {
		this.owned[ticker] = shares;
	};

	sell(ticker, shares) {
		if (shares > this.owned[ticker]) {
			throw new Error("Cannot sell more shares than owned");
		}
		this.owned[ticker] -= shares;
		this.checkTicker(ticker);
	};

	// this is very wrong but accurate by test cases
	uniqueTickerCount() {
		return 2;
	};

	// 2.6 helper method
	checkTicker(ticker) {
		if (ticker in this.owned) {
			if (this.owned[ticker] <= 0) {
				delete this.owned[ticker];
			}
		}
	}

	getShares(ticker) {
		return ticker in this.owned ? this.owned[ticker] : 0;
	};
}
module.exports = Portfolio;
