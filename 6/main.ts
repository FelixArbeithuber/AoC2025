{
	const input = await Bun.file('input.txt').text();
	const math_table = input.trim()
			.split('\n')
			.map(line => line.trim().split(/\s+/));

	let grand_total = 0;
	for (let col = 0; col < math_table[0].length; col++) {
		const operation = math_table.at(-1)[col];

		let col_result;
		if (operation === '+') {
			col_result = 0;
			for (let row = 0; row < math_table.length - 1; row++) {
				col_result += parseInt(math_table[row][col]);
			}
		} else if (operation === '*') {
			col_result = 1;
			for (let row = 0; row < math_table.length - 1; row++) {
				col_result *= parseInt(math_table[row][col]);
			}
		}
		
		grand_total += col_result;
	}

	console.log('part 1: ' + grand_total);
}


{
	function transpose<T>(matrix: T[][]): T[][] {
	    return matrix[0].map((col, c) => matrix.map((row, r) => matrix[r][c]));
	}
	
	const input = await Bun.file('input.txt').text();
	const lines = input.trim().split('\n');
	const math_table_str = transpose(lines.slice(0, -1).map(line => line.split('')))
			.map(row => row.join(''))
			.map(row => row.trim().length === 0 ? '\n' : row)
			.join(' ');

	const math_table = math_table_str.split('\n')
			.map(row => row.trim().split(/\s+/));
	const operations = lines.at(-1).trim().split(/\s+/);

	let grand_total = 0;
	for (let row = 0; row < math_table.length; row++) {
		const operation = operations[row];

		let row_result;
		if (operation === '+') {
			row_result = 0;
			for (let col = 0; col < math_table[row].length; col++) {
				row_result += parseInt(math_table[row][col]);
			}
		} else if (operation === '*') {
			row_result = 1;
			for (let col = 0; col < math_table[row].length; col++) {
				row_result *= parseInt(math_table[row][col]);
			}
		}

		grand_total += row_result;
	}

	console.log('part 2: ' + grand_total);
}
