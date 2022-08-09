export function parseMilliseconds(milliseconds) {
	if (typeof milliseconds !== 'number')
		throw new TypeError('Expected a number');

	return {
		days: Math.trunc(milliseconds / 86400000),
		hours: Math.trunc(milliseconds / 3600000) % 24,
		minutes: Math.trunc(milliseconds / 60000) % 60,
		seconds: Math.trunc(milliseconds / 1000) % 60
	};
}

export default function prettyMilliseconds(milliseconds, options = { verbose: false, compact: false }) {
	let parsed = parseMilliseconds(milliseconds);
	let result = [];
	
	const pluralize = (word, count) => count === 1 ? word : `${word}s`;
	const add = (value, long, short, valueString) => {
		if (result.length === 0 && value === 0) return;
		
		valueString = (valueString || value || '0').toString();
		let prefix;
		let suffix;
		prefix = ' ';
		suffix = ' ' + (options.verbose ? pluralize(long, value) : pluralize(short, value));
		result.push(prefix + valueString + suffix);
	};
	
	add(Math.trunc(parsed.days / 365), 'year', 'yr');
	add(parsed.days % 365, 'day', 'day');
	add(parsed.hours, 'hour', 'hr');
	add(parsed.minutes, 'minute', 'min');
	add(parsed.seconds, 'second', 'sec');
	
	if (options.compact) return result[0];
	else return result;
}