import { writable } from 'svelte/store';
import { Tween } from 'svelte/motion';
import { cubicOut } from 'svelte/easing';

export enum TooltipPosition {
	BottomLeft = 'BottomLeft',
	BottomRight = 'BottomRight',
	TopLeft = 'TopLeft',
	TopRight = 'TopRight'
}

type TooltipState = {
	visible: boolean;
	text: string;
	position: TooltipPosition;
	offset: number;
};

function createTooltipStore() {
	const { subscribe, update } = writable<TooltipState>({
		visible: false,
		text: '',
		position: TooltipPosition.BottomLeft,
		offset: 10
	});

	const tooltipX = new Tween(0, { duration: 300, easing: cubicOut });
	const tooltipY = new Tween(0, { duration: 300, easing: cubicOut });
	let tooltipEl: HTMLElement;

	function handleMouseMove(event: MouseEvent) {
		const width = tooltipEl ? tooltipEl.offsetWidth : 0;
		const height = tooltipEl ? tooltipEl.offsetHeight : 0;
		update(state => {
			switch (state.position) {
				case TooltipPosition.BottomLeft:
					tooltipX.target = event.clientX - width;
					tooltipY.target = event.clientY + state.offset;
					break;
				case TooltipPosition.BottomRight:
					tooltipX.target = event.clientX;
					tooltipY.target = event.clientY + state.offset;
					break;
				case TooltipPosition.TopLeft:
					tooltipX.target = event.clientX - width;
					tooltipY.target = event.clientY - height - state.offset;
					break;
				case TooltipPosition.TopRight:
					tooltipX.target = event.clientX + state.offset;
					tooltipY.target = event.clientY - height - state.offset;
					break;
			}
			return state;
		});
	}

	function show(text: string, options?: { position?: TooltipPosition; offset?: number }) {
		update(state => ({
			...state,
			visible: true,
			text,
			position: options?.position ?? TooltipPosition.BottomLeft,
			offset: options?.offset ?? 10
		}));
	}

	function hide() {
		update(state => ({ ...state, visible: false }));
	}

	function setTooltipEl(el: HTMLElement) {
		tooltipEl = el;
	}

	return { subscribe, show, hide, setTooltipEl, tooltipX, tooltipY, handleMouseMove };
}

export const tooltip = createTooltipStore();