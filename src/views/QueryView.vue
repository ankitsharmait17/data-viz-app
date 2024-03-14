<template>
    <div class="query">
        <div class="query-home">
            <div class="query-home-label" :key="queryNameHeading.length">{{ queryNameHeading }}</div>
            <div class="query-home-save">
                <button @click="showSaveQueryModal">Save</button>
            </div>
        </div>
        <div class="query-home-database">
            <label>
                Select a Database * :
                <select v-model="selectedDb">
                    <option value="">Select</option>
                    <option v-for="db in Object.keys(DATABASES)" :key="db" :value="db">{{ db }}</option>
                </select>
            </label>
        </div>
        <code-editor-lite v-model="query" @run-query="runQuery" @clear-query="clearQuery" />
        <query-results v-if="queryResults" :queryResults="queryResults" />
        <div class="query-home-info" v-else-if="!isError">
            Please {{ query.length === 0 ? 'type' : 'run' }} the query
        </div>
        <div class="query-home-info" v-else-if="isError">
            The table does not exist on this Database. Please check your query
        </div>
        <modal name="save-query">
            <div class="query-home-query-form">
                <label>Name * : <input type="text" v-model="queryName" /></label>
                <button @click="saveQuery">Save</button>
            </div>
        </modal>
        <modal name="save-query-info">
            <div class="query-home-query-form">{{ infoMessage }}</div>
        </modal>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CodeEditorLite from '@/components/CodeEditorLite.vue';
import QueryResults from '@/components/QueryResults.vue';
import { QueryResponse } from '@/common/types';
import { renderData } from '@/common/utils';
import { addQuery, updateQuery, getQueryById } from '@/common/savedQueries';
import { DATABASES } from '@/common/constants';

@Component({
    name: 'QueryView',
    components: {
        CodeEditorLite,
        QueryResults,
    },
})
export default class QueryView extends Vue {
    query = '';
    queryResults: QueryResponse | null = null;
    isError = false;
    queryName = '';
    queryNameHeading = 'New Query';
    infoMessage = '';
    DATABASES = DATABASES;
    selectedDb = '';

    runQuery(queryInfo: { query: string }) {
        this.isError = false;
        if (this.selectedDb.length === 0) {
            this.infoMessage = 'Please select the Database';
            this.$modal.show('save-query-info');
            return;
        }
        if (queryInfo.query.length === 0) {
            this.infoMessage = 'Please enter the query';
            this.$modal.show('save-query-info');
            return;
        }
        let data = renderData(queryInfo.query, this.selectedDb);
        if (!data) this.isError = true;
        this.queryResults = data;
    }

    clearQuery() {
        this.query = '';
        this.queryResults = null;
        this.isError = false;
    }

    showSaveQueryModal() {
        this.$modal.show('save-query');
    }

    saveQuery() {
        if (this.queryName?.length && this.query?.length) {
            const queryId = this.$route.params.queryId;
            const queryData = getQueryById(queryId);
            if (queryData)
                updateQuery({ id: queryId, queryText: this.query, name: this.queryName, dbName: this.selectedDb });
            else addQuery({ queryText: this.query, name: this.queryName, dbName: this.selectedDb });
            this.queryNameHeading = `Saved Query Name : ${this.queryName}`;
            this.$modal.hide('save-query');
            this.infoMessage = 'Added Successfully';
            this.$modal.show('save-query-info');
        } else {
            let message = '';
            if (this.query.length === 0) message += 'The query cannot be empty.';
            if (this.queryName.length === 0) message += 'The query name cannot be empty.';
            this.infoMessage = message;
            this.$modal.show('save-query-info');
        }
    }

    get heading() {
        const queryId = this.$route.params.queryId;
        const queryData = getQueryById(queryId);
        if (queryId && queryData) return queryData.name;
        else return 'New Query';
    }

    mounted() {
        const queryId = this.$route.params.queryId;
        const queryData = getQueryById(queryId);
        if (queryId && queryData) {
            this.queryName = queryData.name;
            this.selectedDb = queryData.dbName;
            this.queryNameHeading = `Saved Query Name : ${queryData.name}`;
            this.query = queryData.queryText;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixins';
.query {
    margin: 0 10px 10px 10px;
    &-home {
        background-color: #f5f5f5;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        border-radius: 5px;
        &-label {
            font-size: 20px;
            font-weight: bold;
        }
        &-save {
            text-align: end;
            button {
                @include button();
            }
        }
        &-info {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
            margin: 50px;
        }
        &-query-form {
            height: 250px;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 10px;
            border-radius: 5px;
            input {
                height: 35px;
                margin-right: 10px;
                border-radius: 5px;
            }
            button {
                @include button();
            }
        }
        &-database {
            margin: 10px;
        }
    }
}
</style>
