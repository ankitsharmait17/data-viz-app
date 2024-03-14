<template>
    <div>
        <div class="code-editor-lite">
            <div class="code-editor-lite-char-count">Character Count : {{ charCount }}/3000</div>
            <div class="code-editor-lite-input">
                <textarea
                    id="code-editor-lite-input-text"
                    maxlength="3000"
                    :value="value"
                    rows="4"
                    cols="50"
                    placeholder="Enter your SQL value here..."
                    @change="onQueryUpdate"
                    @input="handleInput"
                ></textarea>
                <button class="code-editor-lite-input-run" @click="runQuery">Run</button>
                <button class="code-editor-lite-input-clear" @click="clearQuery">Clear</button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component({ name: 'CodeEditorLite' })
export default class CodeEditorLite extends Vue {
    @Prop() value!: string;
    isQueryUpdated = false;

    get charCount() {
        return this.value?.length || 0;
    }

    onQueryUpdate() {
        this.isQueryUpdated = true;
    }

    handleInput(e: any) {
        this.$emit('input', e.target.value);
    }

    clearQuery() {
        this.$emit('clear-query');
    }

    runQuery() {
        if (this.value.length) {
            this.$emit('run-query', { query: this.value, isQueryUpdated: this.isQueryUpdated });
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
            height: 100px;
            padding: 10px;
            font-size: 16px;
            font-family: monospace;
            border: 1px solid #ccc;
            border-radius: 5px;
            resize: none;
        }
        &-run {
            position: absolute;
            top: 20%;
            right: 10px;
            transform: translateY(-50%);
            margin-top: 10px;
            @include button();
        }
        &-clear {
            position: absolute;
            top: 60%;
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
</style>
