import type { ExpandedLayer, ExpandedLocation } from '$lib/expanded-models';
import type { LocationsHistCycleOptions } from '$lib/pocketbase-types';

export const HISTORIAS_PERDIDAS_LAYER_ID = '4c4nr8x4kddb839';

export const HISTORIAS_CYCLES = [
	{ value: 'primer', label: 'Primer Ciclo' },
	{ value: 'segundo', label: 'Segundo Ciclo' },
	{ value: 'tercer', label: 'Tercer Ciclo' }
] as const satisfies readonly { value: LocationsHistCycleOptions; label: string }[];

export type HistoriasCycle = LocationsHistCycleOptions;

export function isHistoriasPerdidasLayer(layer: Pick<ExpandedLayer, 'id' | 'name'>): boolean {
	return layer.id === HISTORIAS_PERDIDAS_LAYER_ID || layer.name === 'Historias Perdidas';
}

export function getHistoriasCycle(location: ExpandedLocation): HistoriasCycle {
	return location.hist_cycle ?? 'primer';
}

export function getHistoriasCycleLabel(cycle: HistoriasCycle): string {
	return HISTORIAS_CYCLES.find((item) => item.value === cycle)?.label ?? 'Primer Ciclo';
}
