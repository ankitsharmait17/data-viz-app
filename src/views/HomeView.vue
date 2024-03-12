<template>
    <div class="home">
        <code-editor-lite @run-query="runQuery" />
        <query-results v-if="results && results.length > 0" :data="results" :columns="columns" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import CodeEditorLite from '@/components/CodeEditorLite.vue';
import QueryResults from '@/components/QueryResults.vue';

@Component({
    components: {
        CodeEditorLite,
        QueryResults,
    },
})
export default class HomeView extends Vue {
    results: Record<string, string>[] = [];
    columns: string[] = [];

    runQuery(query: string) {
        console.log('Query executed', query);
    }
}
</script>
