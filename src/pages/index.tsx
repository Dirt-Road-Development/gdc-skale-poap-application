import Image from "next/image";
import styles from "../styles/index.module.css";

function Page() {
  
  return (
    <div className={styles.container}>
      <div className="asset">
        <img id="skale-logo" src="/skale-poap.svg" alt="SKALE Logo" />
      </div>
      <div className="qr-code">
        <Image src="/skale-gdc-poap.png" alt="SKALE POAP" height={250} width={250} />
      </div>
    </div>
  )
}

export default Page
