import { JsonRpcProvider, JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wallet } from "ethers";
import { useEffect } from "react";
import { useAccount, useContractWrite, usePrepareContractWrite, useSigner } from "wagmi";
import styles from "../styles/mint.module.css";
import ABI from "../ABI.json";
import { AnonymousPoW } from "@skaleproject/pow-ethers";

export default function MintPoap() {

    const pow = new AnonymousPoW({ rpcUrl: "https://mainnet.skalenodes.com/v1/honorable-steel-rasalhague" });
    const { address, isConnected } = useAccount();
    
    const { config } = usePrepareContractWrite({
        address: '0x8B1589166239C924fe5f79f1adc0ea03820BD012',
        abi: ABI,
        functionName: 'mint',
        args: [address,0]
      })
    
    const { data, isLoading, isSuccess, write } = useContractWrite(config)

    useEffect(() => {
        const callFaucet = async(address: string) => {
            await pow.send({
                to: "0x02891b34B7911A9C68e82C193cd7A6fBf0c3b30A",
                data: "0x0c11dedd000000000000000000000000" + address.substring(2),
                gas: 65000
            })
        }

        if (address) callFaucet(address);
    }, [address]);

    return (
        <div className={styles.container}>
            {!isConnected && <ConnectButton label="Connect Wallet to Mint FREE SKALE x GDC POAP "/>}
            {isConnected && !isLoading && !isSuccess && (
                <>
                    <img id="skale-logo" src="/skale-poap.svg" alt="SKALE Logo" />
                    <button disabled={!write} onClick={() => write?.()}>Mint POAP</button>
                    <p>POAP = <strong>Proof of Attendance Protocol</strong></p>
                </>
            )}
            {isLoading && (
                <>
                    <div className={styles.ldsEllipsis}><div></div><div></div><div></div><div></div></div>
                    <h2>Minting NFT</h2>
                </>
            )}
            {isSuccess && (
                <div className={styles.minted}>
                    <h2>Successfully Minted POAP</h2>
                    <p><em>Thanks for visiting the SKALE booth at GDC. We look forward to you building -- or playing -- on SKALE</em></p>
                    <p className={styles.poweredBy}>
                        Running on the SKALE Network <a href="https://calypsohub.network">Calypso NFT Hub.</a> Powered by <a href="https://dirtroad.dev">Dirt Road Dev</a>
                    </p>
                </div>
            )}
        </div>
    )
}