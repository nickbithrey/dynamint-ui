import React from 'react';
import SelectionButton, { alwaysShow, hasSelection, getUriFromSelection } from '~/lib/selector/SelectionButton';


test('selection button\'s build function', () => {
	const text = 'text';
	const path = 'path';
	const condition = sel => true;
	const stateFn = sel => ({});
	const btn = new SelectionButton(text, path, condition, stateFn);
	
	const build = btn.build();
	expect(build.text).toBe(text);
	expect(build.pathname).toBe(path);
	expect(build.condition).toBe(condition);
	expect(build.stateFn).toBe(stateFn);
});

test('alwaysShow function', () => {
	expect(alwaysShow({})).toBeTruthy();
});

test('hasSelection function', () => {
	const selection = {
		getSelectedCount: () => 0
	}
	expect(hasSelection(selection)).toBeFalsy();
	
	selection.getSelectedCount = () => 1
	expect(hasSelection(selection)).toBeTruthy();
});

test('getUriFromSelection function', () => {
	const selection = {
			getSelection: () => (
				[
					{reference: 'ref', uri: 'uri'}
				]
			)
		}
	expect(getUriFromSelection(selection)).toEqual({id: 'ref', uri: 'uri'});
});