//! connecting to NEAR network & its smart contract
import environment from "./config";
import { connect, Contract, keyStores, WalletConnection } from "near-api-js";
import { formatNearAmount } from "near-api-js/lib/utils/format";

const nearEnv = environment("testnet");

// to init contract
export async function initializeContract() {
    const near = await connect(
        Object.assign(
            // keystore holds the wallet info
            { deps: { keyStore: new keyStores.BrowserLocalStorageKeyStore() } },
            nearEnv
        )
    );
    // WalletConnection to interact with the wallet
    window.walletConnection = new WalletConnection(near);
    window.accountId = window.walletConnection.getAccountId();
    // to interact with the smart contract
    window.contract = new Contract(
        window.walletConnection.account(),
        nearEnv.contractName,
        {
            viewMethods: ["getProduct", "getProducts"],
            changeMethods: ["buyProduct", "setProduct"],
        }
    );
}

// funcs to interact with the wallet
export async function accountBalance() {
    return formatNearAmount(
        (await window.walletConnection.account().getAccountBalance()).total,
        2
    );
}

export async function getAccountId() {
    return window.walletConnection.getAccountId();
}

export function login() {
    window.walletConnection.requestSignIn(nearEnv.contractName);
}

export function logout() {
    window.walletConnection.signOut();
    window.location.reload();
}