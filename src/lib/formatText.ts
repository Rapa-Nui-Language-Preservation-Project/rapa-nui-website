/**
 * Converts newline characters (\n) to HTML line breaks (<br>)
 * This is used to properly format text from the database that contains paragraph breaks
 * Mainly used for Macrocuentos (or Microcuentas) layers
 */
export function formatTextWithBreaks(text: string | undefined): string {
	if (!text) return '';
	return text.replace(/\n/g, '<br>');
}
