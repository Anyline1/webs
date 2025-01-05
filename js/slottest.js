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



