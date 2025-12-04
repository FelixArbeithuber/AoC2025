{
    const input = (await Bun.file("input.txt").text()).trim();
    const lines = input.split("\n");

    const count_arr = Array(lines.length + 2);
    for (let i = 0; i < count_arr.length; i++) {
        count_arr[i] = Array(lines[0].length + 2).fill(0);
    }

    for (let r = 1; r < lines.length + 1; r++) {
        for (let c = 1; c < lines[0].length + 1; c++) {
            if (lines[r - 1][c - 1] === "@") {
                count_arr[r - 1][c - 1] += 1;
                count_arr[r - 1][c + 0] += 1;
                count_arr[r - 1][c + 1] += 1;

                count_arr[r][c - 1] += 1;
                count_arr[r][c + 1] += 1;

                count_arr[r + 1][c - 1] += 1;
                count_arr[r + 1][c + 0] += 1;
                count_arr[r + 1][c + 1] += 1;
            }
        }
    }

    let sum = 0;
    for (let r = 1; r < lines.length + 1; r++) {
        for (let c = 1; c < lines[0].length + 1; c++) {
            if (lines[r - 1][c - 1] === "@" && count_arr[r][c] < 4) {
                sum += 1;
            }
        }
    }

    console.log("part 1: " + sum);
}

{
    const input = (await Bun.file("input.txt").text()).trim();
    const lines = input.split("\n").map((l) => l.split(""));

    const count_arr = Array(lines.length + 2);
    for (let i = 0; i < count_arr.length; i++) {
        count_arr[i] = Array(lines[0].length + 2).fill(0);
    }

    for (let r = 1; r < lines.length + 1; r++) {
        for (let c = 1; c < lines[0].length + 1; c++) {
            if (lines[r - 1][c - 1] === "@") {
                count_arr[r - 1][c - 1] += 1;
                count_arr[r - 1][c + 0] += 1;
                count_arr[r - 1][c + 1] += 1;

                count_arr[r][c - 1] += 1;
                count_arr[r][c + 1] += 1;

                count_arr[r + 1][c - 1] += 1;
                count_arr[r + 1][c + 0] += 1;
                count_arr[r + 1][c + 1] += 1;
            }
        }
    }

    let total_sum = 0;
    while (true) {
        let sum = 0;

        for (let r = 1; r < lines.length + 1; r++) {
            for (let c = 1; c < lines[0].length + 1; c++) {
                if (lines[r - 1][c - 1] === "@" && count_arr[r][c] < 4) {
                    count_arr[r - 1][c - 1] -= 1;
                    count_arr[r - 1][c + 0] -= 1;
                    count_arr[r - 1][c + 1] -= 1;

                    count_arr[r][c - 1] -= 1;
                    count_arr[r][c + 1] -= 1;

                    count_arr[r + 1][c - 1] -= 1;
                    count_arr[r + 1][c + 0] -= 1;
                    count_arr[r + 1][c + 1] -= 1;

                    lines[r - 1][c - 1] = ".";
                    sum += 1;
                }
            }
        }

        if (sum === 0) {
            break;
        }
        total_sum += sum;
    }

    console.log("part 2: " + total_sum);
}
