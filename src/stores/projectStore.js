import { writable } from 'svelte/store';

function createProject() {
    const { subscribe, set, update } = writable({
        uuid: crypto.randomUUID(),
        name: 'Untitled',
        initialLocation: [ 48.107878, -1.651773 ],
        zones: [],
    })

    return {
        subscribe,
        set,
        addZone: (zone) => update((p) => {
            p.zones.push({
                uuid: crypto.randomUUID(),
                name: 'Untitled',
                location: zone.latLng,
                radius: zone.radius,
                visible: true, // Ui only (should be removed from export)
                sounds: [],
            })

            return p
        }),
        removeZone: (zoneIndex) => update((p) => {
            p.zones.splice(zoneIndex, 1)

            return p
        }),
        addSound: (zoneIndex) => update((p) => {
            p.zones[zoneIndex].sounds.push({
                filename: '',
                playEvent: 'enter', // 'exit' || 'button'
                stopEvent: 'exit', // 'none' || 'enter_new_zone'
                zoneCondition: 'any', // 'never_visited' || 'already_visited'
                fadein: 0.15,
                fadeout: 0.15,
                loop: false,
            })

            return p
        }),
        removeSound: (zoneIndex, soundIndex) => update((p) => {
            p.zones[zoneIndex].sounds.splice(soundIndex, 1)

            return p
        }),
    }
}

export const selectedZone = writable()
export const project = createProject()