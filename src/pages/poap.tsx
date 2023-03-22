import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { Account } from "../components";

export default function MintPoap() {

    const { isConnected } = useAccount();

    return (
        <div>
            <h1>wagmi + RainbowKit + Next.js</h1>

            <ConnectButton />
            {isConnected && <Account />}
        </div>
    )
}