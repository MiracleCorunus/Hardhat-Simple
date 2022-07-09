import React, { useState } from "react";
import {
  Button,
  Input,
  NumberInput,
  NumberInputField,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { parseEther } from "ethers/lib/utils";
import { TokenABI as abi } from "abi/TokenABI";
import { Contract } from "ethers";
import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/abstract-provider";

interface Props {
  addressContract: string;
}

declare let window: any;

export default function MintToken(props: Props) {
  const addressContract = props.addressContract;
  const [amount, setAmount] = useState<string>("100");
  const [toAddress, setToAddress] = useState<string>("");

  async function mint(event: React.FormEvent) {
    event.preventDefault();
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const erc20: Contract = new ethers.Contract(addressContract, abi, signer);

    erc20
      .mint(toAddress, parseEther(amount))
      .then((tr: TransactionResponse) => {
        console.log(`TransactionResponse TX hash: ${tr.hash}`);
        tr.wait().then((receipt: TransactionReceipt) => {
          console.log("transfer receipt", receipt);
        });
      })
      .catch((e: Error) => console.log(e));
  }

  const handleChange = (value: string) => setAmount(value);

  return (
    <form onSubmit={mint}>
      <FormControl>
        <FormLabel htmlFor="amount">Amount: </FormLabel>
        <NumberInput
          defaultValue={amount}
          min={10}
          max={1000}
          onChange={handleChange}
        >
          <NumberInputField />
        </NumberInput>
        <FormLabel htmlFor="toaddress">To address: </FormLabel>
        <Input
          id="toaddress"
          type="text"
          required
          onChange={(e: any) => setToAddress(e.target.value)}
          my={3}
        />
        <Button type="submit" isDisabled={!toAddress}>
          Mint
        </Button>
      </FormControl>
    </form>
  );
}
