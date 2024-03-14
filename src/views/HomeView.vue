<template>
    <div class="home">
        <div class="quer-home">
            <div class="quer-home-label">New Query</div>
            <div class="quer-home-save"><button>Save</button></div>
        </div>
        <code-editor-lite v-model="query" @run-query="runQuery" @clear-query="clearQuery" />
        <query-results v-if="queryResults" :queryResults="queryResults" />
        <div class="quer-home-info" v-else-if="!isError">Please type a query above</div>
        <div class="quer-home-info" v-else-if="isError">
            The table does not exist on this Database. Please check your query
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CodeEditorLite from '@/components/CodeEditorLite.vue';
import QueryResults from '@/components/QueryResults.vue';
import { QueryResponse } from '@/common/types';
import { renderData } from '@/common/utils';

@Component({
    components: {
        CodeEditorLite,
        QueryResults,
    },
})
export default class HomeView extends Vue {
    query = '';
    queryResults: QueryResponse | null = null;
    isError = false;

    runQuery(queryInfo: { query: string; isQueryUpdated: boolean }) {
        this.isError = false;
        if (queryInfo.isQueryUpdated) {
            let data = renderData(queryInfo.query);
            if (!data) this.isError = true;
            this.queryResults = data;
        }
    }

    clearQuery() {
        this.query = '';
        this.queryResults = null;
        this.isError = false;
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixins';
.quer-home {
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
}
</style>
