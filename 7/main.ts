{
	const input = await Bun.file('input.txt').text();
	const lines = input.trim().split('\n');

	let state = Array(lines[0].length);
	for (let i = 0; i < lines[0].length; i++) {
		state[i] = false;
	}
	state[lines[0].indexOf('S')] = true;

	let splits = 0;
	for (let lineIdx = 2; lineIdx < lines.length; lineIdx += 2) {
		for (let i = 0; i < lines[0].length; i++) {
			if (state[i] && lines[lineIdx][i] === '^') {
				state[i - 1] = true;
				state[i + 0] = false;
				state[i + 1] = true;
				splits += 1;
			}
		}
	}

	console.log('part 1: ' + splits);
}

{
	const input = await Bun.file('input.txt').text();
	const lines = input.trim().split('\n');

	let state = Array(lines[0].length);
	for (let i = 0; i < lines[0].length; i++) {
		state[i] = 0;
	}
	state[lines[0].indexOf('S')] = 1;

	for (let lineIdx = 2; lineIdx < lines.length; lineIdx += 2) {
		for (let i = 0; i < lines[0].length; i++) {
			if (state[i] > 0 && lines[lineIdx][i] === '^') {
				state[i - 1] += state[i];
				state[i + 1] += state[i];
				state[i + 0] = 0;
			}
		}
	}

	console.log('part 2: ' + state.reduce((acc, e) => acc + e, 0));
}
