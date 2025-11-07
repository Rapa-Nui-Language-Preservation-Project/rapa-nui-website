export function watchMediaQuery(query: string, onChange: (matches: boolean) => void) {
	if (typeof window === 'undefined') {
		return () => {};
	}

	const mediaQuery = window.matchMedia(query);
	const notify = () => onChange(mediaQuery.matches);
	const handleChange = (event: MediaQueryListEvent) => onChange(event.matches);

	notify();

	if (typeof mediaQuery.addEventListener === 'function') {
		mediaQuery.addEventListener('change', handleChange);
		return () => mediaQuery.removeEventListener('change', handleChange);
	}

	return () => {};
}
