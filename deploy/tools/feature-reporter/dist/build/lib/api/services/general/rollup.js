"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GENERAL_API_ROLLUP_RESOURCES = void 0;
exports.GENERAL_API_ROLLUP_RESOURCES = {
    // OPTIMISTIC
    optimistic_l2_deposits: {
        path: '/api/v2/optimism/deposits',
        filterFields: [],
        paginated: true,
    },
    optimistic_l2_deposits_count: {
        path: '/api/v2/optimism/deposits/count',
    },
    optimistic_l2_withdrawals: {
        path: '/api/v2/optimism/withdrawals',
        filterFields: [],
        paginated: true,
    },
    optimistic_l2_withdrawals_count: {
        path: '/api/v2/optimism/withdrawals/count',
    },
    optimistic_l2_output_roots: {
        path: '/api/v2/optimism/output-roots',
        filterFields: [],
        paginated: true,
    },
    optimistic_l2_output_roots_count: {
        path: '/api/v2/optimism/output-roots/count',
    },
    optimistic_l2_txn_batches: {
        path: '/api/v2/optimism/batches',
        filterFields: [],
        paginated: true,
    },
    optimistic_l2_txn_batches_count: {
        path: '/api/v2/optimism/batches/count',
    },
    optimistic_l2_txn_batch: {
        path: '/api/v2/optimism/batches/:number',
        pathParams: ['number'],
    },
    optimistic_l2_txn_batch_celestia: {
        path: '/api/v2/optimism/batches/da/celestia/:height/:commitment',
        pathParams: ['height', 'commitment'],
    },
    optimistic_l2_txn_batch_txs: {
        path: '/api/v2/transactions/optimism-batch/:number',
        pathParams: ['number'],
        filterFields: [],
        paginated: true,
    },
    optimistic_l2_txn_batch_blocks: {
        path: '/api/v2/blocks/optimism-batch/:number',
        pathParams: ['number'],
        filterFields: [],
        paginated: true,
    },
    optimistic_l2_dispute_games: {
        path: '/api/v2/optimism/games',
        filterFields: [],
        paginated: true,
    },
    optimistic_l2_dispute_games_count: {
        path: '/api/v2/optimism/games/count',
    },
    // OPTIMISTIC INTEROP
    optimistic_l2_interop_messages: {
        path: '/api/v2/optimism/interop/messages',
        filterFields: [],
        paginated: true,
    },
    optimistic_l2_interop_messages_count: {
        path: '/api/v2/optimism/interop/messages/count',
    },
    // MUD
    mud_worlds: {
        path: '/api/v2/mud/worlds',
        filterFields: [],
        paginated: true,
    },
    mud_tables: {
        path: '/api/v2/mud/worlds/:hash/tables',
        pathParams: ['hash'],
        filterFields: ['q'],
        paginated: true,
    },
    mud_tables_count: {
        path: '/api/v2/mud/worlds/:hash/tables/count',
        pathParams: ['hash'],
    },
    mud_records: {
        path: '/api/v2/mud/worlds/:hash/tables/:table_id/records',
        pathParams: ['hash', 'table_id'],
        filterFields: ['filter_key0', 'filter_key1'],
        paginated: true,
    },
    mud_record: {
        path: '/api/v2/mud/worlds/:hash/tables/:table_id/records/:record_id',
        pathParams: ['hash', 'table_id', 'record_id'],
    },
    mud_systems: {
        path: '/api/v2/mud/worlds/:hash/systems',
        pathParams: ['hash'],
    },
    mud_system_info: {
        path: '/api/v2/mud/worlds/:hash/systems/:system_address',
        pathParams: ['hash', 'system_address'],
    },
    // ARBITRUM
    arbitrum_l2_messages: {
        path: '/api/v2/arbitrum/messages/:direction',
        pathParams: ['direction'],
        filterFields: [],
        paginated: true,
    },
    arbitrum_l2_messages_count: {
        path: '/api/v2/arbitrum/messages/:direction/count',
        pathParams: ['direction'],
    },
    arbitrum_l2_txn_batches: {
        path: '/api/v2/arbitrum/batches',
        filterFields: [],
        paginated: true,
    },
    arbitrum_l2_txn_batches_count: {
        path: '/api/v2/arbitrum/batches/count',
    },
    arbitrum_l2_txn_batch: {
        path: '/api/v2/arbitrum/batches/:number',
        pathParams: ['number'],
    },
    arbitrum_l2_txn_batch_celestia: {
        path: '/api/v2/arbitrum/batches/da/celestia/:height/:commitment',
        pathParams: ['height', 'commitment'],
    },
    arbitrum_l2_txn_batch_txs: {
        path: '/api/v2/transactions/arbitrum-batch/:number',
        pathParams: ['number'],
        filterFields: [],
        paginated: true,
    },
    arbitrum_l2_txn_batch_blocks: {
        path: '/api/v2/blocks/arbitrum-batch/:number',
        pathParams: ['number'],
        filterFields: [],
        paginated: true,
    },
    arbitrum_l2_txn_withdrawals: {
        path: '/api/v2/arbitrum/messages/withdrawals/:hash',
        pathParams: ['hash'],
        filterFields: [],
    },
    arbitrum_l2_message_claim: {
        path: '/api/v2/arbitrum/messages/claim/:id',
        pathParams: ['id'],
        filterFields: [],
    },
    // zkSync
    zksync_l2_txn_batches: {
        path: '/api/v2/zksync/batches',
        filterFields: [],
        paginated: true,
    },
    zksync_l2_txn_batches_count: {
        path: '/api/v2/zksync/batches/count',
    },
    zksync_l2_txn_batch: {
        path: '/api/v2/zksync/batches/:number',
        pathParams: ['number'],
    },
    zksync_l2_txn_batch_txs: {
        path: '/api/v2/transactions/zksync-batch/:number',
        pathParams: ['number'],
        filterFields: [],
        paginated: true,
    },
    // zkEvm
    zkevm_l2_deposits: {
        path: '/api/v2/zkevm/deposits',
        filterFields: [],
        paginated: true,
    },
    zkevm_l2_deposits_count: {
        path: '/api/v2/zkevm/deposits/count',
    },
    zkevm_l2_withdrawals: {
        path: '/api/v2/zkevm/withdrawals',
        filterFields: [],
        paginated: true,
    },
    zkevm_l2_withdrawals_count: {
        path: '/api/v2/zkevm/withdrawals/count',
    },
    zkevm_l2_txn_batches: {
        path: '/api/v2/zkevm/batches',
        filterFields: [],
        paginated: true,
    },
    zkevm_l2_txn_batches_count: {
        path: '/api/v2/zkevm/batches/count',
    },
    zkevm_l2_txn_batch: {
        path: '/api/v2/zkevm/batches/:number',
        pathParams: ['number'],
    },
    zkevm_l2_txn_batch_txs: {
        path: '/api/v2/transactions/zkevm-batch/:number',
        pathParams: ['number'],
        filterFields: [],
        paginated: true,
    },
    // SHIBARIUM
    shibarium_deposits: {
        path: '/api/v2/shibarium/deposits',
        filterFields: [],
        paginated: true,
    },
    shibarium_deposits_count: {
        path: '/api/v2/shibarium/deposits/count',
    },
    shibarium_withdrawals: {
        path: '/api/v2/shibarium/withdrawals',
        filterFields: [],
        paginated: true,
    },
    shibarium_withdrawals_count: {
        path: '/api/v2/shibarium/withdrawals/count',
    },
    // SCROLL
    scroll_l2_deposits: {
        path: '/api/v2/scroll/deposits',
        filterFields: [],
        paginated: true,
    },
    scroll_l2_deposits_count: {
        path: '/api/v2/scroll/deposits/count',
    },
    scroll_l2_withdrawals: {
        path: '/api/v2/scroll/withdrawals',
        filterFields: [],
        paginated: true,
    },
    scroll_l2_withdrawals_count: {
        path: '/api/v2/scroll/withdrawals/count',
    },
    scroll_l2_txn_batches: {
        path: '/api/v2/scroll/batches',
        filterFields: [],
        paginated: true,
    },
    scroll_l2_txn_batches_count: {
        path: '/api/v2/scroll/batches/count',
    },
    scroll_l2_txn_batch: {
        path: '/api/v2/scroll/batches/:number',
        pathParams: ['number'],
    },
    scroll_l2_txn_batch_txs: {
        path: '/api/v2/transactions/scroll-batch/:number',
        pathParams: ['number'],
        filterFields: [],
        paginated: true,
    },
    scroll_l2_txn_batch_blocks: {
        path: '/api/v2/blocks/scroll-batch/:number',
        pathParams: ['number'],
        filterFields: [],
        paginated: true,
    },
};
/* eslint-enable @stylistic/indent */
