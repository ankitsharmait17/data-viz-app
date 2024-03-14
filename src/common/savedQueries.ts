const key = 'savedQueries';

export function addQuery(queryData: { queryText: string; name: string; dbName: string }) {
    const id = Date.now();
    const queries = getQueries();
    queries[id] = { queryText: queryData.queryText, name: queryData.name, dbName: queryData.dbName };
    localStorage.setItem(key, JSON.stringify(queries));
}

export function getQueries() {
    const queries = localStorage.getItem(key);
    try {
        if (queries) return JSON.parse(queries);
        else return {};
    } catch (error) {
        console.error('error in getting queries');
        return {};
    }
}

export function updateQuery(queryData: { id: string; queryText: string; name: string; dbName: string }) {
    const queries = getQueries();
    queries[queryData.id] = queryData;
    localStorage.setItem(key, JSON.stringify(queries));
}

export function getQueryById(id: string) {
    const queries = getQueries();
    return queries[id];
}
