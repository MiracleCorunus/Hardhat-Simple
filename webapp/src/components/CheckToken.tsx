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
import { TestABI as abi } from "abi/TestABI";
import { Contract } from "ethers";
import {
  TransactionResponse,
  TransactionReceipt,
} from "@ethersproject/abstract-provider";

declare let window: any;

export default function CheckToken() {
  const [amount, setAmount] = useState<string>("100");
  const [userAddress, setUserAddress] = useState<string>("");
  const [addressToken, setAddressToken] = useState<string>("");
  const [result, setResult] = useState<string>("Not Confirmed");

  async function check(event: React.FormEvent) {
    event.preventDefault();
    if (!window.ethereum) return;
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const testContract: Contract = new ethers.Contract(
      "0xa626ad08e94e46b90357A3d8d0642e592D2F1A2B",
      abi,
      signer
    );

    const result = await testContract.check(
      userAddress,
      addressToken,
      parseEther(amount)
    );

    if (result) setResult("User is holding that amount of Token!");
    else setResult("Insufficient Balance");
    console.log(result);
  }

  const handleChange = (value: string) => setAmount(value);

  return (
    <form onSubmit={check}>
      <FormControl>
        <FormLabel htmlFor="useraddress">User Address: </FormLabel>
        <Input
          id="useraddress"
          type="text"
          required
          onChange={(e: any) => setUserAddress(e.target.value)}
          my={3}
        />

        <FormLabel htmlFor="tokenaddress">Token Address: </FormLabel>
        <Input
          id="tokenaddress"
          type="text"
          required
          onChange={(e: any) => setAddressToken(e.target.value)}
          my={3}
        />

        <FormLabel htmlFor="amount">Amount: </FormLabel>
        <NumberInput
          defaultValue={amount}
          min={10}
          max={1000}
          onChange={handleChange}
        >
          <NumberInputField />
        </NumberInput>
        <Button type="submit" isDisabled={!userAddress || !addressToken}>
          Check
        </Button>

        {result === "Not Confirmed" ? (
          ""
        ) : (
          <FormLabel>Result: {result}</FormLabel>
        )}
      </FormControl>
    </form>
  );
}
