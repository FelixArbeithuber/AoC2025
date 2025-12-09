type Coord = {
	x: number
	y: number
	z: number
}

type Edge = {
	boxes: number[]
	length: number
}

function euclidean_distance(p1: Coord, p2: Coord): number {
	return Math.sqrt((p1.x - p2.x)**2 + (p1.y - p2.y)**2 + (p1.z - p2.z)**2);
}

{
	const input = await Bun.file('input.txt').text();
	const box_coords: Coord[] = input.trim()
			.split('\n')
			.map(line => line.split(','))
			.map(([x, y, z]) => ({ x: parseInt(x), y: parseInt(y), z: parseInt(z) }));

	const visited = Array(box_coords.length).fill(false);
	const edges: Edge[] = [];
	for (let i = 0; i < box_coords.length; i += 1) {
		visited[i] = true;
		for (let j = 0; j < box_coords.length; j += 1) {
			if (visited[j]) {
				continue;
			}

			edges.push({
				boxes: [i, j],
				length: euclidean_distance(box_coords[i], box_coords[j])
			});
		}
	}

	edges.sort((e1, e2) => e1.length - e2.length);

	const sets = [];
	const set_map = new Map();
	for (let i = 0; i < 1000; i += 1) {
		const edge = edges[i];

		const set_idx1 = set_map.get(edge.boxes[0]);
		const set_idx2 = set_map.get(edge.boxes[1]);
		if (set_idx1 === undefined && set_idx2 === undefined) {
			const idx = sets.push(new Set(edge.boxes)) - 1;
			set_map.set(edge.boxes[0], idx);
			set_map.set(edge.boxes[1], idx);
		} else if (set_idx1 !== undefined && set_idx2 === undefined) {
			sets[set_idx1].add(edge.boxes[1]);
			set_map.set(edge.boxes[1], set_idx1);
		} else if (set_idx1 === undefined && set_idx2 !== undefined) {
			sets[set_idx2].add(edge.boxes[0]);
			set_map.set(edge.boxes[0], set_idx2);
		} else if (set_idx1 !== set_idx2) {
			sets[set_idx1] = sets[set_idx1].union(sets[set_idx2]);
			for (const el of sets[set_idx2]) {
				set_map.set(el, set_idx1);
			}
			sets[set_idx2].clear();
		}
	}
	
	console.log('part 1: ' + sets.sort((a, b) => b.size - a.size).slice(0, 3).reduce((acc, e) => acc * e.size, 1));
}


{
	const input = await Bun.file('input.txt').text();
	const box_coords: Coord[] = input.trim()
			.split('\n')
			.map(line => line.split(','))
			.map(([x, y, z]) => ({ x: parseInt(x), y: parseInt(y), z: parseInt(z) }));

	const visited = Array(box_coords.length).fill(false);
	const edges: Edge[] = [];
	for (let i = 0; i < box_coords.length; i += 1) {
		visited[i] = true;
		for (let j = 0; j < box_coords.length; j += 1) {
			if (visited[j]) {
				continue;
			}

			edges.push({
				boxes: [i, j],
				length: euclidean_distance(box_coords[i], box_coords[j])
			});
		}
	}

	edges.sort((e1, e2) => e1.length - e2.length);

	const sets = [];
	const set_map = new Map();
	for (let i = 0; true; i += 1) {
		const edge = edges[i];

		const set_idx1 = set_map.get(edge.boxes[0]);
		const set_idx2 = set_map.get(edge.boxes[1]);
		if (set_idx1 === undefined && set_idx2 === undefined) {
			const idx = sets.push(new Set(edge.boxes)) - 1;
			set_map.set(edge.boxes[0], idx);
			set_map.set(edge.boxes[1], idx);
		} else if (set_idx1 !== undefined && set_idx2 === undefined) {
			sets[set_idx1].add(edge.boxes[1]);
			set_map.set(edge.boxes[1], set_idx1);
		} else if (set_idx1 === undefined && set_idx2 !== undefined) {
			sets[set_idx2].add(edge.boxes[0]);
			set_map.set(edge.boxes[0], set_idx2);
		} else if (set_idx1 !== set_idx2) {
			sets[set_idx1] = sets[set_idx1].union(sets[set_idx2]);
			for (const el of sets[set_idx2]) {
				set_map.set(el, set_idx1);
			}
			sets[set_idx2].clear();
		}

		if (sets[set_idx1]?.size === box_coords.length || sets[set_idx2]?.size === box_coords.length) {
			console.log('part 2: ' + box_coords[edge.boxes[0]].x * box_coords[edge.boxes[1]].x);
			break;
		}
	}
}

export {}
