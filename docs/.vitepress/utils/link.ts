export function isExtLink(url?: string) {
	if (!url)
		return false
	return url.includes(':')
}
