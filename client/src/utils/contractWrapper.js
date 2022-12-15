import { ethers } from 'ethers';

import contAbi from "../config/contAbi.json"
import contAdd from "../config/contAdd.json"

/**
 *
 * @returns null if provider or wallet absent else the provider
 */
export const connect = async () => {
	const { ethereum } = window;
	if (!ethereum) {
		console.log('Error, wallet absent');
		alert('Install a wallet');
		return null;
	}

	const provider = await new ethers.providers.Web3Provider(window.ethereum);

	return provider;
};

/**
 *
 * @returns connected and selected user address
 */
export const getUserAddress = async () => {
	const provider = connect();

	if (!provider) {
		console.log('provider is null');
		return null;
	}
    console.log(await provider)
	const signer = provider.getSigner();

	return signer === '' ? null : signer;
};

/**
 *
 * @returns Contract object
 */
export const getContract = async () => {

    const { ethereum } = window;
	if (!ethereum) {
		console.log('Error, wallet absent');
		alert('Install a wallet');
		return null;
	}

	const provider = new ethers.providers.Web3Provider(window.ethereum);

    // const provider = new ethers.providers.JsonRpcProvider("https://eth-rinkeby.alchemyapi.io/v2/S9Ye13e4IUj-Pbgok9NjgsWg9MFpnXBw")


	// const contAdd = '0xbe70A0caE416cCDA5723a263bDd26a1caE88ca10';

    // const contAbi = contAbi

	// const provider = connect();

	if (!provider) {
		console.log('provider is null');
		return null;
	}

	const signer = await provider.getSigner();
	const contract = new ethers.Contract(contAdd.address, contAbi, signer);

	return contract;
};