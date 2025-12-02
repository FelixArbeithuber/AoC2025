const input = await (Bun.file("input.txt").text());

{	
	let dial = 50;
	let zero_count = 0;
	for (const line of input.split('\n')) {
		const n = parseInt(line.slice(1));
		if (line[0] === 'L') {
			dial = (dial - n) % 100;
		} else {
			dial = (dial + n) % 100;
		}

		if (dial === 0) {
			zero_count += 1;
		}
	}

	console.log('part 1: ', zero_count);
}

{	
	let dial = 50;
	let zero_count = 0;
	for (const line of input.split('\n')) {
		const n = parseInt(line.slice(1));
		if (line[0] === 'L') {
			for (let i = 0; i < n; i++) {
				dial = (dial - 1) % 100;
				if (dial === 0) {
					zero_count += 1;
				}
			}
		} else {
			for (let i = 0; i < n; i++) {
				dial = (dial + 1) % 100;
				if (dial === 0) {
					zero_count += 1;
				}
			}
		}
	}

	console.log('part 2: ', zero_count);
}
