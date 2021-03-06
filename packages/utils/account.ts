import * as bip39 from "bip39";
import * as bs58 from "bs58";
import * as SOL from "@solana/web3.js";
import * as ETH from "ethers";
import { derivePath } from "ed25519-hd-key";
import { Blockchain, CryptoKeypair, EthNetwork, SolNetwork } from "types";

export const ethProvider = (network: EthNetwork, apiKey?: string) => {
  const supportedNetwork = (network: EthNetwork) => {
    switch (network) {
      case "mainnet":
        return "homestead";
      default:
        return network;
    }
  };
  if (network === "localhost") {
    return new ETH.providers.JsonRpcProvider();
  } else {
    return new ETH.providers.InfuraProvider(supportedNetwork(network), apiKey);
  }
};

export const solProvider = (network: SolNetwork) => {
  let networkUrl = null;
  switch (network) {
    case "localhost":
      networkUrl = "http://127.0.0.1:8899";
      break;
    default:
      networkUrl = SOL.clusterApiUrl(network);
      break;
  }
  const connection = new SOL.Connection(networkUrl, "confirmed");
  return connection;
};

export const getEthBalance = async (
  address: string,
  network: EthNetwork,
  apiKey: string
) => {
  const provider = ethProvider(network, apiKey);
  const balance = await provider.getBalance(address);
  const formattedEther = ETH.utils.formatEther(balance);
  return parseFloat(formattedEther);
};

export const getSolBalance = async (address: string, network: SolNetwork) => {
  const connection = solProvider(network);
  const pubKey = new SOL.PublicKey(address);
  const balance = await connection.getBalance(pubKey, "confirmed");
  return balance;
};

/**
 * Returns chain name used in app accordingly to chain type.
 *
 * @param blockchain - A blockchain type.
 * @returns an official chain name used in app.
 */
export const ChainName = (blockchain: Blockchain) => {
  switch (blockchain) {
    case "eth":
      return "Ethereum";
    case "sol":
      return "Solana";
  }
};

/**
 * Generates 12-words long mnemonic words.
 */
export const generateMnemonic = bip39.generateMnemonic;

/**
 * Check if the given mnemonic string is valid.
 */
export const isMnemonicValid = bip39.validateMnemonic;

/**
 * Creates range array from start to end index
 *
 * @param start - Start index of the range
 * @param end - End index of the range
 * @returns (end - start) length range array
 */
const range = (start: number, end: number) =>
  Array(end - start)
    .fill(0)
    .map((_, idx) => start + idx);

/**
 * Generate a single keypair
 *
 * @param mnemonic - Mnemonic words to derive keypair.
 * @param blockchain - Type of blockchain. Currently supports `eth` and `sol`.
 * @returns A crypto keypair derived from given parameters.
 */
export const generateKeypair = (
  mnemonic: string,
  blockchain: Blockchain
): CryptoKeypair => deriveCryptoKeypair(mnemonic, blockchain, 0);

/**
 * Restores deterministic keypairs for given blockchain type.
 *
 * @param mnemonic - Mnemonic words to derive keypair.
 * @param blockchain - Type of blockchain. Currently supports `eth` and `sol`.
 * @param start - Start index of the derivation path.
 * @param end - End index of the derivation path.
 * @returns A list of crypto keypair derived from given parameters.
 */
export const restoreKeypairs = (
  mnemonic: string,
  blockchain: Blockchain,
  start: number,
  end: number
): CryptoKeypair[] =>
  range(start, end).map((index) =>
    deriveCryptoKeypair(mnemonic, blockchain, index)
  );

/**
 * Derives crypto keypair from mnemonic words and path index with Bip44 standard.
 *
 * @param mnemonic - Mnemonic words, should be 12-words long
 * @param blockchain - Type of blockchain. Currently supports `eth` and `sol`
 * @param pathIndex - Index of the derivation path to derive deterministic address.
 * @returns Crypto keypair that contains `publicKey`, `privateKey` and `derivPath`.
 */
export const deriveCryptoKeypair = (
  mnemonic: string,
  blockchain: Blockchain,
  pathIndex: number
): CryptoKeypair => {
  switch (blockchain) {
    case "eth":
      const ethDerivPath = `m/44'/60'/${pathIndex}'/0'`;
      const wallet = ETH.Wallet.fromMnemonic(mnemonic, ethDerivPath);
      return {
        pathIndex,
        publicKey: wallet.publicKey,
        privateKey: wallet.privateKey,
      };
    case "sol":
      const seed = bip39.mnemonicToSeedSync(mnemonic, "");
      const solDerivPath = `m/44'/501'/${pathIndex}'/0'`;
      const { publicKey, secretKey } = SOL.Keypair.fromSeed(
        derivePath(solDerivPath, seed.toString("hex")).key
      );
      return {
        pathIndex,
        publicKey: publicKey.toBase58(),
        privateKey: bs58.encode(secretKey),
      };
  }
};

/**
 * Abbreviate public key into `[first 4 chars]...[last 4chars]`
 *
 * @param publicKey - Public key string to be abbreviated
 * @returns - Shortened public key
 */
export const abbrevPublicKey = (publicKey: string, size: number = 4) =>
  `${publicKey.slice(0, size)}...${publicKey.slice(0 - size)}`;
