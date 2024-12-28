const mockElements = {
    balance: { textContent: '1000' },
    betAmount: { value: '500' },
    message: { textContent: '' },
};

const mockFunctions = {
    updateBalance: jest.fn(),
    checkWinWithBet: jest.fn(),
};

jest.mock('./slot', () => ({
    ...jest.requireActual('./slot'),
    document: {
        getElementById: id => mockElements[id],
    },
    updateBalance: mockFunctions.updateBalance,
    checkWinWithBet: mockFunctions.checkWinWithBet,
}));

const { spinReels } = require('./slot');

test('Should display an error message when the balance is less than the bet amount', async () => {
    await spinReels();

    expect(mockElements.message.textContent).toBe('❌ Недостаточно средств для ставки!');
    expect(mockFunctions.updateBalance).not.toHaveBeenCalled();
    expect(mockFunctions.checkWinWithBet).not.toHaveBeenCalled();
});

const mockElements1 = {
    balance: { textContent: '1000' },
    betAmount: { value: '-500' },
    message: { textContent: '' },
};

const mockFunctions1 = {
    updateBalance: jest.fn(),
    checkWinWithBet: jest.fn(),
};

jest.mock('./slot', () => ({
    ...jest.requireActual('./slot'),
    document: {
        getElementById: id => mockElements1[id],
    },
    updateBalance: mockFunctions1.updateBalance,
    checkWinWithBet: mockFunctions1.checkWinWithBet,
}));

const { spinReels2 } = require('./slot');

test('Should handle a bet amount that is a negative number', async () => {
    await spinReels2();

    expect(mockElements1.message.textContent).toBe('❌ Недостаточно средств для ставки!');
    expect(mockFunctions1.updateBalance).not.toHaveBeenCalled();
    expect(mockFunctions1.checkWinWithBet).not.toHaveBeenCalled();
});

const mockElements3 = {
    balance: { textContent: '1000' },
    betAmount: { value: '0' },
    message: { textContent: '' },
};

const mockFunctions3 = {
    updateBalance: jest.fn(),
    checkWinWithBet: jest.fn(),
};

jest.mock('./slot', () => ({
    ...jest.requireActual('./slot'),
    document: {
        getElementById: id => mockElements[id],
    },
    updateBalance: mockFunctions3.updateBalance,
    checkWinWithBet: mockFunctions3.checkWinWithBet,
}));

const { spinReels3 } = require('./slot');

test('Should handle a bet amount that is zero', async () => {
    await spinReels3();

    expect(mockElements3.message.textContent).toBe('❌ Недостаточно средств для ставки!');
    expect(mockFunctions3.updateBalance).not.toHaveBeenCalled();
    expect(mockFunctions3.checkWinWithBet).not.toHaveBeenCalled();
});

const mockBalanceElement4 = { textContent: 1000 };
const mockBetAmountElement4 = { value: 1001 };
const mockMessageElement4 = { textContent: '' };

jest.spyOn(document, 'getElementById').mockImplementation((id) => {
    switch (id) {
        case 'balance':
            return mockBalanceElement4;
        case 'betAmount':
            return mockBetAmountElement4;
        case 'message':
            return mockMessageElement4;
        default:
            return null;
    }
});

const mockUpdateBalance = jest.fn();
jest.spyOn(window, 'updateBalance').mockImplementation(mockUpdateBalance);

const mockCheckWinWithBet = jest.fn();
jest.spyOn(window, 'checkWinWithBet').mockImplementation(mockCheckWinWithBet);

const mockSpinReel = jest.fn();
jest.spyOn(window, 'spinReel').mockImplementation(mockSpinReel);

const mockSpinReels = jest.fn();
jest.spyOn(window, 'spinReels').mockImplementation(mockSpinReels);

test('handles a bet amount that exceeds the maximum balance', async () => {
    await spinReels();

    expect(mockMessageElement.textContent).toBe('❌ Недостаточно средств для ставки!');
    expect(mockUpdateBalance).not.toHaveBeenCalled();
    expect(mockCheckWinWithBet).not.toHaveBeenCalled();
});

const mockBalanceElement5 = { textContent: 1000 };
const mockBetAmountElement5 = { value: NaN };
const mockMessageElement5 = { textContent: '' };

jest.spyOn(document, 'getElementById').mockImplementation((id) => {
    switch (id) {
        case 'balance':
            return mockBalanceElement5;
        case 'betAmount':
            return mockBetAmountElement5;
        case 'message':
            return mockMessageElement5;
        default:
            return null;
    }
});

const mockUpdateBalance5 = jest.fn();
jest.spyOn(window, 'updateBalance').mockImplementation(mockUpdateBalance5);

const mockCheckWinWithBet5 = jest.fn();
jest.spyOn(window, 'checkWinWithBet').mockImplementation(mockCheckWinWithBet5);

test('handles a bet amount that is NaN', async () => {
    await spinReels();

    expect(mockMessageElement.textContent).toBe('❌ Недостаточно средств для ставки!');
    expect(mockUpdateBalance).not.toHaveBeenCalled();
    expect(mockCheckWinWithBet).not.toHaveBeenCalled();
});