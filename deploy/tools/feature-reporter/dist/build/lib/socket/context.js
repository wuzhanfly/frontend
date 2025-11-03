"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.SocketProvider = SocketProvider;
exports.useSocket = useSocket;
const phoenix_1 = require("phoenix");
const react_1 = __importStar(require("react"));
const socketContexts = new Map();
function getSocketContext(name) {
    if (!socketContexts.has(name)) {
        socketContexts.set(name, react_1.default.createContext(null));
    }
    return socketContexts.get(name);
}
function SocketProvider({ children, options, url, name = 'default' }) {
    const [socket, setSocket] = (0, react_1.useState)(null);
    const channelRegistry = react_1.default.useRef({});
    (0, react_1.useEffect)(() => {
        if (!url) {
            return;
        }
        const socketInstance = new phoenix_1.Socket(url, options);
        socketInstance.connect();
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
            setSocket(null);
        };
    }, [options, url]);
    const value = react_1.default.useMemo(() => ({
        socket,
        channelRegistry,
    }), [socket, channelRegistry]);
    const SocketContext = getSocketContext(name);
    return (<SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>);
}
// Hook to use a specific named socket
function useSocket(name = 'default') {
    const SocketContext = getSocketContext(name);
    const context = react_1.default.useContext(SocketContext);
    if (context === undefined) {
        throw new Error(`useSocket must be used within a SocketProvider with name "${name}"`);
    }
    return context;
}
