/* @flow */

import type { ExpressRequest } from '../../types';

import { ROOT_TRANSACTION_NAME } from './constants';

type SetRootTransactionOptions = {|
    userIDToken : ?string,
    clientAccessToken : ?string,
    rootTxnData : $Shape<{|
        client_id : string,
        sdk_version : string,
        spb_version : string,
        response_time : number,
        buyer_country : string,
        env : string
    |}>
|};

export function setRootTransaction(req : ExpressRequest, { userIDToken, clientAccessToken, rootTxnData } : SetRootTransactionOptions) {
    req.model = req.model || {};
    req.model.rootTxn = req.model.rootTxn || {
        name: '',
        data: {}
    };

    const rootTxn = req.model.rootTxn;
    const existingData = req.model.rootTxn.data;

    if (userIDToken) {
        rootTxn.name = ROOT_TRANSACTION_NAME.SMART_BUTTONS_WALLET;
    } else if (clientAccessToken) {
        rootTxn.name = ROOT_TRANSACTION_NAME.SMART_BUTTONS_VAULT;
    } else {
        rootTxn.name = ROOT_TRANSACTION_NAME.SMART_BUTTONS;
    }


    req.model.rootTxn.data = {
        ...existingData,
        ...rootTxnData
    };
}
