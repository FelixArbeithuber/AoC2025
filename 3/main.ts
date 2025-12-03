{
	const input = (await Bun.file('input.txt').text()).trim();

	let sum = 0;
	for (const line of input.split('\n')) {
		let d1 = line.charCodeAt(0) - 48;
		let d2 = line.charCodeAt(1) - 48;

		for (let i = 1; i < line.length - 1; i++) {
			const digit1 = line.charCodeAt(i) - 48;
			const digit2 = line.charCodeAt(i + 1) - 48;
			if (digit1 > d1) {
				d1 = digit1;
				d2 = digit2;
			} else if (digit2 > d2) {
				d2 = digit2;
			}
		} 

		sum += d1 * 10 + d2;
	}

	console.log('part 1: ' + sum);
}

{
	const input = (await Bun.file('input.txt').text()).trim();

	let sum = 0;
	for (const line of input.split('\n')) {
		const digits = [];
		for (let i = 0; i < 12; i++) {
			digits[i] = line.charCodeAt(i) - 48;
		}

		for (let i = 1; i < line.length - 11; i++) {
			for (let j = 0; j < 12; j++) {
				const digit = line.charCodeAt(i + j) - 48;
				if (digit > digits[j]) {
					for (let k = j; k < 12; k++) {
						digits[k] = line.charCodeAt(i + k) - 48;
					}
					break;
				}
			}
		}

		sum += digits.reverse().reduce((acc, e, i) => acc + e * (10**i), 0);
	}

	console.log('part 2: ' + sum);
}
