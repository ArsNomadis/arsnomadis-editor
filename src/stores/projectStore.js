import { writable } from 'svelte/store';

function createProject() {
    const { subscribe, set, update } = writable({
        uuid: crypto.randomUUID(),
        name: 'Untitled',
        initialLocation: [ 48.107878, -1.651773 ],
        sounds: [],
    })

    return {
        subscribe,
        set,
        addSound: (sound) => update((p) => {
            p.sounds.push({
                uuid: crypto.randomUUID(),
                name: 'Untitled',
                location: sound.latLng,
                radius: sound.radius,
                filename: '',
                loop: false,
                conditions: [],
            })

            return p
        }),
        removeSoundByID: (sound) => update((p) => {
            p.sounds = p.sounds.filter((s) => {
                return s.uuid !== sound.uuid;
            });

            return p
        }),
    }
}

export const selectedSound = writable()
export const project = createProject()