export interface InputParams {
	type: 'text' | 'password' | 'date' | 'number' | 'email' | 'tel' | 'url' | 'radio' | 'checkbox';
	value?: string;
	placeholder: string;
	icon?: string;
}

export const defaultInputParams: InputParams = {
	type: 'text',
	placeholder: ''
};
