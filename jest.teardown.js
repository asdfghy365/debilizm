const coverage = require('@tact-lang/coverage');
const path = require('path');
const { completeCoverage } = require('@tact-lang/coverage/dist/integration/integrate');

module.exports = async () => {
    try {
        // Ensure completeCoverage is properly called
        await completeCoverage([
            path.resolve(__dirname, 'sources', 'output', '*.boc')
        ]);
    } catch (error) {
        console.error('Error in completeCoverage:', error);
        throw error;
    }
};
