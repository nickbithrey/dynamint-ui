export default class SelectionButton {
	
	constructor(text, path, condition, stateFn) {
		this.text = text;
		this.path = path;
		this.condition = condition;
		this.stateFn = stateFn;
	}
	
	build() {
		return {
			text: this.text,
			pathname: this.path,
			stateFn: this.stateFn ? this.stateFn : () => {},
			condition: this.condition ? this.condition : alwaysShow
		};
	}
	
}

const alwaysShow = () => true;

const hasSelection = selection => selection.getSelectedCount() > 0;

const getUriFromSelection = selectionDetails => (
	{
		id: selectionDetails.getSelection()[0].reference,
		uri: selectionDetails.getSelection()[0].uri
	}
);

export {
	alwaysShow,
	hasSelection,
	getUriFromSelection
};