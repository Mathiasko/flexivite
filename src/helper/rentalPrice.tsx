export function cumulativeValue(days) {
	let total = 50;
	for (let i = 0; i <= days; i++) {
		if (i > 1 && i <= 7) {
			total += 30;
		}
		if (i > 7) {
			total += 20;
		}
	}
	return total;
}
