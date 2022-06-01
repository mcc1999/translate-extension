// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { baiduTranslate } from './api';
import { Word } from './api/types';
import { isUpperCase, splitWord } from './utils';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "select-translation" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('select-translation.translate', async () => {
		// The code you place here will be executed every time your command is executed
		const res = await baiduTranslate(
			'Congratulations, your extension "select-translate" is now active!'
		);
		vscode.window.showInformationMessage(res['trans_result'][0].dst);
	});

	context.subscriptions.push(disposable);

	vscode.languages.registerHoverProvider("*", {
		async provideHover(document, position, token) {
			console.log(position, 'position');

			// get hover text
			const range = document.getWordRangeAtPosition(position);
			const hoverText = document.getText(range);
			// get select text
			const editor = vscode.window.activeTextEditor;
			if (!editor) {
				return;
			}
			const selection = editor.selection;
			const selectText = document.getText(selection);
			console.log('selectText:', selectText, 'hoverText:', hoverText, selectText && selectText === hoverText);

			if (selectText && selectText.includes(hoverText)) {
				const words = splitWord(selectText);
				console.log('words', words);

				let res: string[] = [];
				const allPromise = Promise.all(
					words.map(async (w) => {
						const result = await baiduTranslate(w);
						return result['trans_result'][0].dst;
					}
					));
				await allPromise.then((values) => {
					res = values;
				})

				if (res.length) {
					const markdownString = new vscode.MarkdownString();
					let translationStr = '';
					res.forEach((w, i) => {
						translationStr += `\n${words[i]}: ${w}; `
					})
					markdownString.appendMarkdown(
						`翻译【 ${translationStr}】`
					);
					// markdownString.supportHtml = true; 
					markdownString.isTrusted = true;

					return new vscode.Hover(markdownString);
				}
			} else {
				return null;
			}
		},
	});
}

// this method is called when your extension is deactivated
export function deactivate() { }
