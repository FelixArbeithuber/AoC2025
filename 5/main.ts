function in_range(range: number[], id: number) {
	return range[0] <= id && id <= range[1];
}

{
	const input = await Bun.file('input.txt').text();
	const [fresh, ids_to_check] = input.trim()
			.split('\n\n')
			.map(lines => lines.split('\n'));

	const fresh_ranges = fresh.map(r => r.split('-').map(r => parseInt(r)));
	const ids = ids_to_check.map(id => parseInt(id));

	let fresh_count = 0;
	for (const id of ids) {
		for (const range of fresh_ranges) {
			if (in_range(range, id)) {
				fresh_count += 1;
				break;
			}
		}
	}

	console.log('part 1: ' + fresh_count);
}

{
	const input = await Bun.file('input.txt').text();

	const fresh = input.trim()
			.split('\n\n')[0]
			.split('\n');

	const fresh_ranges = fresh.map(r => r.split('-')
		.map(r => parseInt(r)))
		.sort((a, b) => a[0] - b[0]);

	let fresh_count = 0;
	let min_range = 0;
	for (const range of fresh_ranges) {
		fresh_count += Math.max(0, (range[1] + 1) - Math.max(range[0], min_range));
		if (range[1] > min_range) {
			min_range = range[1] + 1;
		}
	}

	console.log('part 2: ' + fresh_count);
}
