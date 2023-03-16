import { describe, it, expect } from 'vitest';
// import { get, post, put, del } from './index';

// TODO: revisar como testear funciones que usan fetch
describe('ajax test', () => {
	it('get', async () => {
		const result = 'get';
		expect(result).not.toBe(null);
	});
	it('post', async () => {
		const result = 'post';
		expect(result).not.toBe(null);
	});
	it('put', async () => {
		const result = 'put';
		expect(result).not.toBe(null);
	});
	it('delete', async () => {
		const result = 'delete';
		expect(result).not.toBe(null);
	});
});
