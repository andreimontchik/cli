import fs from "fs";
import path from "path";

import * as dotenv from 'dotenv';
import pino from 'pino';
import { Keypair, Connection } from '@solana/web3.js';
import { createJupiterApiClient } from '@jup-ag/api';

import { PublicKey } from '@solana/web3.js';

type TokenMap = Record<string, PublicKey>;

export const logger = pino({
    level: process.env.LOG_LEVEL || 'info',
    transport: {
        target: 'pino-pretty',
        options: {
            colorize: true,
            levelFirst: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss.l',
            ignore: 'pid,hostname'
        },
    },
});

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

export const jupApiClient = createJupiterApiClient({
    apiKey: jupApiKey,
    basePath: jupApiUrl,
} as any);

