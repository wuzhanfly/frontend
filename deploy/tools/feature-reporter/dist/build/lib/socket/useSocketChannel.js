"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = useSocketChannel;
const react_1 = require("react");
const context_1 = require("./context");
function useSocketChannel({ topic, params, isDisabled, onJoin, onSocketClose, onSocketError, socketName }) {
    const { socket, channelRegistry } = (0, context_1.useSocket)(socketName) || {};
    const [channel, setChannel] = (0, react_1.useState)();
    const onCloseRef = (0, react_1.useRef)(undefined);
    const onErrorRef = (0, react_1.useRef)(undefined);
    const onJoinRef = (0, react_1.useRef)(onJoin);
    onJoinRef.current = onJoin;
    (0, react_1.useEffect)(() => {
        const cleanUpRefs = () => {
            const refs = [onCloseRef.current, onErrorRef.current].filter(Boolean);
            refs.length > 0 && socket?.off(refs);
        };
        if (!isDisabled) {
            onCloseRef.current = onSocketClose && socket?.onClose(onSocketClose);
            onErrorRef.current = onSocketError && socket?.onError(onSocketError);
        }
        else {
            cleanUpRefs();
        }
        return cleanUpRefs;
    }, [onSocketClose, onSocketError, socket, isDisabled]);
    (0, react_1.useEffect)(() => {
        if (isDisabled && channel) {
            channel.leave();
            setChannel(undefined);
        }
    }, [channel, isDisabled]);
    (0, react_1.useEffect)(() => {
        if (!socket || isDisabled || !topic || !channelRegistry) {
            return;
        }
        let ch;
        if (channelRegistry.current[topic]) {
            ch = channelRegistry.current[topic].channel;
            channelRegistry.current[topic].subscribers++;
            onJoinRef.current?.(ch, '');
        }
        else {
            ch = socket.channel(topic);
            channelRegistry.current[topic] = { channel: ch, subscribers: 1 };
            ch.join()
                .receive('ok', (message) => onJoinRef.current?.(ch, message))
                .receive('error', () => {
                onSocketError?.();
            });
        }
        setChannel(ch);
        const currentRegistry = channelRegistry.current;
        return () => {
            if (currentRegistry[topic]) {
                currentRegistry[topic].subscribers > 0 && currentRegistry[topic].subscribers--;
                if (currentRegistry[topic].subscribers === 0) {
                    ch.leave();
                    delete currentRegistry[topic];
                }
            }
            setChannel(undefined);
        };
    }, [socket, topic, params, isDisabled, onSocketError, channelRegistry]);
    return channel;
}
