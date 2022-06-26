import { readable } from 'svelte/store';

/**
 * Exports a function that return a readable given a string media query as input.
 * 
 * From a blog post by Ricciuti Paolo.
 * @see https://medium.com/@ricciutipaolo/how-to-check-for-media-queries-in-svelte-with-usemediaquery-604f14190035
 */
export const useMediaQuery = (mediaQueryString)=>{
	const matches = readable(null, (set) => {
		const m = window.matchMedia(mediaQueryString)

        set(m.matches)

        const el = e => set(e.matches)

        m.addEventListener('change', el)

		return () => { 
            m.removeEventListener('change', el)
        }
	})

    return matches
}