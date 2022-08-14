import { Select } from 'antd';
import React, { FC, useContext } from 'react';
const { Option } = Select;

const tokenList: String[] = ["WETH", "BTC", "USDC"]

interface ITokenSelector {
  token: string,
  setToken: (arg0: string) => void,
  [x: string]: any
}

const TokenSelector: FC<ITokenSelector> = ({ token, setToken, ...rest }) => {
  return (
    <Select
      {...rest}
      value={token}
      showSearch
      style={{
        width: 200,
      }}
      placeholder="Search Token"
      optionFilterProp="children"
      onChange={setToken}
    >
      {tokenList.map((token, idx) =>
        <Option key={idx} value={token}>{token}</Option>
      )}
    </Select>
  )
};

export default TokenSelector;