import React, { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import Link from "next/link"
import { ethers } from 'ethers'

export default function ProposalDetails() {
    const router = useRouter();
    const { id } = router.query;

    const [blockData, setBlockData] = useState(null);
    const [blockId, setBlockId] = useState("");

    useEffect(() => {
        getBlockData(id);
    }, [id])

    const getBlockData = async (id) => {
        const provider = new ethers.providers.EtherscanProvider();
        setBlockData(await provider.getBlock(Number(id)));
    }

    return (blockData !== null &&
        <div className="d-flex p-3 flex-column gap-3">
            <div className="d-flex flex-row gap-2 justify-content-end">
                <Link href={`/block/${blockId}`}>
                    <button>Get Block</button>
                </Link>
                <input value={blockId} onChange={(e) => setBlockId(e.target.value)}></input>
            </div>
            <div className="d-flex flex-column p-3" style={{ background: "#FFF", borderRadius: "10px" }}>
                <div className="d-grid gap-2" style={{ gridTemplateColumns: "25% 75%" }}>
                    <label>Block Height:</label>
                    <label>{Number(blockData.number)}</label>
                    <label>Block Hash:</label>
                    <label>{blockData.hash}</label>
                    <label>Timestamp:</label>
                    <label>{new Date(blockData.timestamp * 1000).toLocaleString()} </label>
                    <label>Transactions:</label>
                    <label>{blockData.transactions.length} Transactions</label>
                    <label>Mined by:</label>
                    <label>{blockData.miner}</label>
                    <label>Difficulty:</label>
                    <label>{blockData.difficulty}</label>
                    <label>Gas Used:</label>
                    <label>{Number(blockData.gasUsed._hex)}</label>
                    <label>Gas Limit:</label>
                    <label>{Number(blockData.gasLimit._hex)}</label>
                    <label>Extra Data:</label>
                    <label>Hex: {blockData.extraData}</label>
                    <label>Nonce:</label>
                    <label>{blockData.nonce}</label>
                </div>
            </div>
        </div >
    )
}
