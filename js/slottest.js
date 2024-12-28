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

const mockBalanceElement = { textContent: 1000 };
const mockBetAmountElement = { value: 1001 };
const mockMessageElement = { textContent: '' };

jest.spyOn(document, 'getElementById').mockImplementation((id) => {
    switch (id) {
        case 'balance':
            return mockBalanceElement;
        case 'betAmount':
            return mockBetAmountElement;
        case 'message':
            return mockMessageElement;
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