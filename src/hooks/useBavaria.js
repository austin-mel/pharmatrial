import { createVendiaClient } from '@vendia/client'

const client = createVendiaClient({
  apiUrl: `https://mmzt049z8b.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://pwl3kvdxp7.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `3cmpc4bTN9FaBSZAuTQvej82DoFsPPnQpAD3hiNhiXS6`,
})

const { entities } = client;

const useBavaria = () => {
    return { entities };
};

export default useBavaria;