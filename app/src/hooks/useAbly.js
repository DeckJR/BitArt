import { useEffect, useRef } from 'react';
import * as Ably from 'ably';

const ABLY_KEY = import.meta.env.VITE_ABLY_KEY;

let ablyInstance = null;

function getAbly() {
    if (!ablyInstance) {
        ablyInstance = new Ably.Realtime({ key: ABLY_KEY });
    }
    return ablyInstance;
}

export function useAblyChannel(channelName, eventName, callback) {
    const callbackRef = useRef(callback);

    // actualizar ref después del render
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!channelName) return;

        const ably = getAbly();
        const channel = ably.channels.get(channelName);

        const handler = (message) => {
            callbackRef.current(message.data);
        };

        channel.subscribe(eventName, handler);

        return () => {
            channel.unsubscribe(eventName, handler);
        };
    }, [channelName, eventName]);
}