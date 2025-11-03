"use strict";
'use client';
Object.defineProperty(exports, "__esModule", { value: true });
exports.Toaster = exports.toaster = void 0;
const react_1 = require("@chakra-ui/react");
const consts_1 = require("../utils/consts");
const close_button_1 = require("./close-button");
exports.toaster = (0, react_1.createToaster)({
    placement: 'top-end',
    pauseOnPageIdle: true,
    duration: 10 * consts_1.SECOND,
    offsets: {
        top: '12px',
        right: '12px',
        bottom: '12px',
        left: '12px',
    },
});
const Toaster = () => {
    return (<react_1.Portal>
      <react_1.Toaster toaster={exports.toaster} insetInline={{ mdDown: '4' }}>
        {(toast) => {
            const closable = toast.meta?.closable !== undefined ? toast.meta.closable : true;
            return (<react_1.Toast.Root width={{ md: 'sm' }}>
              {toast.type === 'loading' ? (<react_1.Spinner size="sm" color="blue.solid" my={1}/>) : null}
              <react_1.Stack gap="0" flex="1" maxWidth="100%">
                {toast.title && <react_1.Toast.Title>{toast.title}</react_1.Toast.Title>}
                {(toast.meta?.renderDescription || toast.description) && (<react_1.Toast.Description>
                    {toast.meta?.renderDescription?.() || toast.description}
                  </react_1.Toast.Description>)}
              </react_1.Stack>
              {toast.action && (<react_1.Toast.ActionTrigger>{toast.action.label}</react_1.Toast.ActionTrigger>)}
              {closable && (<react_1.Toast.CloseTrigger asChild>
                  <close_button_1.CloseButton />
                </react_1.Toast.CloseTrigger>)}
            </react_1.Toast.Root>);
        }}
      </react_1.Toaster>
    </react_1.Portal>);
};
exports.Toaster = Toaster;
