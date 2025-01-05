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


