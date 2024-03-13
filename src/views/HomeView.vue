<template>
    <div class="home">
        <code-editor-lite @run-query="runQuery" />
        <query-results v-if="queryResults" :queryResults="queryResults" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CodeEditorLite from '@/components/CodeEditorLite.vue';
import QueryResults from '@/components/QueryResults.vue';
import order_details from '@/mocks/order_details.json';
import orders from '@/mocks/orders.json';
import products from '@/mocks/products.json';
import suppliers from '@/mocks/suppliers.json';
import { QueryResponse } from '@/common/types';

@Component({
    components: {
        CodeEditorLite,
        QueryResults,
    },
})
export default class HomeView extends Vue {
    queryResults: QueryResponse | null = null;
    random = 0;

    runQuery(queryInfo: { query: string; isQueryUpdated: boolean }) {
        this.random++;
        const index = this.random % 4;
        let data: QueryResponse | null = null;
        if (queryInfo.isQueryUpdated) {
            switch (index) {
                case 0:
                    data = order_details;
                    break;
                case 1:
                    data = orders;
                    break;
                case 2:
                    data = products;
                    break;
                case 3:
                    data = suppliers;
                    break;
            }
            if (data) {
                this.queryResults = data;
            }
        }
    }
}
</script>
