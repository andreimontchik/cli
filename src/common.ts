import * as dotenv from 'dotenv';
import { Keypair, Connection } from '@solana/web3.js';
import { JupiterApi } from './jup';

dotenv.config();

export const wallet = process.env.WALLET
    ? Keypair.fromSecretKey(Uint8Array.from(JSON.parse(process.env.WALLET)))
    : (() => { throw new Error('Environment variable WALLET is not set.'); })();

export const rpcUrl = process.env.RPC_URL
    ? process.env.RPC_URL
    : (() => { throw new Error('Environment variable RPC_URL is not set.'); })();

export const jupApiUrl = process.env.JUP_API_URL
    ? process.env.JUP_API_URL
    : (() => { throw new Error('Environment variable JUP_API_URL is not set.'); })();

export const jupApiKey = process.env.JUP_API_KEY
    ? process.env.JUP_API_KEY
    : (() => { throw new Error('Environment variable JUP_API_KEY is not set.'); })();

export const SLIPPAGE_BPS = process.env.SLIPPAGE_BPS ? parseInt(process.env.SLIPPAGE_BPS)
    : (() => { throw new Error('Environment variable SLIPPAGE_BPS is not set.'); })();

export const connection = new Connection(rpcUrl, 'confirmed');

export const jupiterApi = new JupiterApi(jupApiUrl, jupApiKey, SLIPPAGE_BPS);