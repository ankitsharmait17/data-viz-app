self.onmessage = function (event) {
    if (event.data.message === 'downloadCsv') {
        const jsonData = event.data.queryResults;
        const csvBlob = convertToCSV(jsonData);

        self.postMessage(csvBlob);
    }
};

function convertToCSV(queryResults) {
    const header = queryResults.columns.join(',');
    const rows = queryResults.data.map((ar) => Object.values(ar).join(','));
    const csvContent = `${header}\n${rows.join('\n')}`;
    const blob = new Blob([csvContent], { type: 'text/csv' });
    return blob;
}
