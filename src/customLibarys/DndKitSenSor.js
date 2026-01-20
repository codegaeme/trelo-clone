import {
    MouseSensor as LibMouseSensor,
    TouchSensor as LibTouchSensor
} from '@dnd-kit/core';

const handler = ({ nativeEvent }) => {
    let element = nativeEvent.target;

    while (element) {
        if (element.dataset && element.dataset.noDnd !== undefined) {
            return false;
        }
        element = element.parentElement;
    }

    return true;
};

export class MouseSensor extends LibMouseSensor {
    static activators = [
        {
            eventName: 'onMouseDown',
            handler
        }
    ];
}

export class TouchSensor extends LibTouchSensor {
    static activators = [
        {
            eventName: 'onTouchStart',
            handler
        }
    ];
}
