{
	const input = await Bun.file('input.txt').text();
	const invalid_ids = [];
	for (const range_text of input.split(',')) {
		const [start, end] = range_text.split('-');
		const start_int = parseInt(start);
		const end_int = parseInt(end);

		for (let i = start_int; i <= end_int; i++) {
			const i_str = i.toString();
			if (i_str.length % 2 == 0) {
				const p1 = i_str.slice(0, i_str.length / 2);
				const p2 = i_str.slice(i_str.length / 2);
				if (p1 === p2) {
					invalid_ids.push(i);
				}
			}
		}
	}

	console.log('part 1:', invalid_ids.reduce((a, b) => a + b));
}

{
	const input = await Bun.file('input.txt').text();
	const invalid_ids = [];
	for (const range_text of input.split(',')) {
		const [start, end] = range_text.split('-');
		const start_int = parseInt(start);
		const end_int = parseInt(end);

		for (let i = start_int; i <= end_int; i++) {
			const i_str = i.toString();
			for (let len = 1; len <= i_str.length / 2; len++) {
				const base_pattern = i_str.slice(0, len);
				const pattern = Array(Math.floor(i_str.length / len)).keys()
						.reduce((acc) => acc + base_pattern, '');

				if (i_str === pattern) {
					invalid_ids.push(i);
					break;
				}
			}
		}
	}

	console.log('part 2:', invalid_ids.reduce((a, b) => a + b));
}
