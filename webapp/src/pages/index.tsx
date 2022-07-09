// src/pages/index.tsx
import { useState, useEffect } from "react";
import type { NextPage } from "next";
import { ethers } from "ethers";
import Head from "next/head";
import NextLink from "next/link";
import { VStack, Heading, Box, LinkOverlay, LinkBox } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/react";
import { Text, Button } from "@chakra-ui/react";
import ReadERC20 from "../components/ReadERC20";
import MintToken from "../components/MintToken";
import CheckToken from "../components/CheckToken";

declare let window: any;

const Home: NextPage = () => {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainname, setChainName] = useState<string | undefined>();
  const [selectedToken, setSelectedToken] = useState("Not Selected");

  useEffect(() => {
    console.log(selectedToken);
    if (!currentAccount || !ethers.utils.isAddress(currentAccount)) return;
    //client side code
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const provider = new ethers.providers.InfuraProvider(
    //   "rinkeby",
    //   "2f2122659ad94cadb2abe7a93725b13c"
    // );

    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.utils.formatEther(result));
    });
    provider.getNetwork().then((result) => {
      setChainId(result.chainId);
      setChainName(result.name);
    });
  }, [currentAccount]);

  const onClickConnect = () => {
    //client side code
    if (!window.ethereum) {
      console.log("please install MetaMask");
      return;
    }
    /*
    //change from window.ethereum.enable() which is deprecated
    //see docs: https://docs.metamask.io/guide/ethereum-provider.html#legacy-methods
    window.ethereum.request({ method: 'eth_requestAccounts' })
    .then((accounts:any)=>{
      if(accounts.length>0) setCurrentAccount(accounts[0])
    })
    .catch('error',console.error)
    */

    //we can do it using ethers.js
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    provider
      .send("eth_requestAccounts", [])
      .then((accounts) => {
        if (accounts.length > 0) setCurrentAccount(accounts[0]);
      })
      .catch((e) => console.log(e));
  };

  const onClickDisconnect = () => {
    console.log("onClickDisConnect");
    setBalance(undefined);
    setCurrentAccount(undefined);
  };

  const selectedTokenChange = (e: any) => {
    setSelectedToken(e.target.value);
  };

  return (
    <>
      <Head>
        <title>My DAPP</title>
      </Head>

      <Heading as="h3" my={4}>
        Test Task for check Balance of Token
      </Heading>
      <VStack>
        <Box w="100%" my={4}>
          {currentAccount ? (
            <Button type="button" w="100%" onClick={onClickDisconnect}>
              Account:{currentAccount}
            </Button>
          ) : (
            <Button type="button" w="100%" onClick={onClickConnect}>
              Connect MetaMask
            </Button>
          )}
        </Box>
        {currentAccount ? (
          <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
            <Heading my={4} fontSize="xl">
              Account info
            </Heading>
            <Text>ETH Balance of current account: {balance}</Text>
            <Text>
              Chain Info: ChainId {chainId} name {chainname}
            </Text>
          </Box>
        ) : (
          <></>
        )}

        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Select Token
          </Heading>
          <Select placeholder="Select Token" onChange={selectedTokenChange}>
            <option value="0x62B06830671c96023e06C436007aCC92175a9996">
              Token 1
            </option>
            <option value="0xEFaAa5D265712801a2AA0627911637B323b3B9D0">
              Token 2
            </option>
            <option value="0x1C3323322eaD6D309f6cf4cc812C15f8ac0c801B">
              Token 3
            </option>
          </Select>
        </Box>

        {selectedToken === "Not Selected" ? (
          ""
        ) : (
          <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
            <Heading my={4} fontSize="xl">
              Read Token Info
            </Heading>
            <ReadERC20
              addressContract={selectedToken}
              currentAccount={currentAccount}
            />
          </Box>
        )}
        {selectedToken === "Not Selected" ? (
          ""
        ) : (
          <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
            <Heading my={4} fontSize="xl">
              Mint Token
            </Heading>
            <MintToken addressContract={selectedToken} />
          </Box>
        )}

        <Box mb={0} p={4} w="100%" borderWidth="1px" borderRadius="lg">
          <Heading my={4} fontSize="xl">
            Check Token Balance
          </Heading>
          <CheckToken />
        </Box>
      </VStack>
    </>
  );
};

export default Home;
