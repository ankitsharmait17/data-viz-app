<template>
    <div>
        <div class="code-editor-new-query">
            <div class="code-editor-new-query-label">New Query</div>
            <div class="code-editor-new-query-save"><button>Save</button></div>
        </div>
        <div class="code-editor-lite">
            <div class="code-editor-lite-char-count">Character Count : {{ charCount }}/3000</div>
            <div class="code-editor-lite-input">
                <textarea
                    id="code-editor-lite-input-text"
                    maxlength="3000"
                    v-model="query"
                    rows="4"
                    cols="50"
                    placeholder="Enter your SQL query here..."
                    @change="onQueryUpdate"
                ></textarea>
                <button class="code-editor-lite-input-run" @click="runQuery">Run</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({ name: 'CodeEditorLite' })
export default class CodeEditorLite extends Vue {
    query = '';
    isQueryUpdated = false;

    get charCount() {
        return this.query?.length || 0;
    }

    onQueryUpdate() {
        this.isQueryUpdated = true;
    }

    runQuery() {
        if (this.query.length) {
            this.$emit('run-query', { query: this.query, isQueryUpdated: this.isQueryUpdated });
            this.isQueryUpdated = false;
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/scss/mixins';

.code-editor-lite {
    margin-top: 10px;
    margin-bottom: 10px;
    &-input {
        position: relative;
        textarea {
            width: calc(100% - 20px);
            height: 200px;
            padding: 10px;
            font-size: 16px;
            font-family: monospace;
            border: 1px solid #ccc;
            border-radius: 5px;
            resize: none;
        }
        &-run {
            position: absolute;
            top: 50%;
            right: 10px;
            transform: translateY(-50%);
            margin-top: 10px;
            @include button();
        }
    }
    &-char-count {
        font-size: 14px;
        text-align: end;
    }
}

.code-editor-new-query {
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
}
</style>
