<template>
    <codemirror
        ref="editor"
        :value="value"
        @input="$emit('input', $event)"
        :options="codeEditorOptions"
        @changes="onChange"
    />
</template>

<script lang="ts">
import { CodeMirror, codemirror } from 'vue-codemirror';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/sql-hint';
import { Prop, Component, Vue } from 'vue-property-decorator';

@Component({
    name: 'CodeEditor',
    components: {
        codemirror,
    },
})
export default class CodeEditor extends Vue {
    @Prop({ default: '' }) value!: string;

    codeEditorOptions = {
        tabSize: 2,
        styleActiveLine: true,
        lineWrapping: true,
        lineNumbers: true,
        line: true,
        styleSelectedText: true,
        mode: 'sql',
        theme: 'lesser-dark',
    };

    setupCommands() {
        CodeMirror.commands.autocomplete = function (cm: any) {
            cm.showHint({
                hint: CodeMirror.hint.sql,
                completeSingle: false,
            });
        };
    }
    onChange(editor: any, change: any) {
        const { text, origin } = change[0];
        // trigger when origin is input and text is not empty
        if (origin === '+input' && text[0].trim()) {
            editor.execCommand('autocomplete');
        }
    }

    mounted() {
        this.setupCommands();
    }
}
</script>

<style>
@import 'codemirror/theme/lesser-dark.css';
@import 'codemirror/addon/hint/show-hint.css';
</style>
