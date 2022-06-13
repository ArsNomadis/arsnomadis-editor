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
                sounds: [],
            })

            return p
        }),
        removeZoneByID: (zone) => update((p) => {
            p.zones = p.zones.filter((s) => {
                return s.uuid !== zone.uuid;
            });

            return p
        }),
    }
}

export const selectedZone = writable()
export const project = createProject()