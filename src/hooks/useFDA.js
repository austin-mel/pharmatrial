import { createVendiaClient } from '@vendia/client'

const client = createVendiaClient({
  apiUrl: `https://9m4gldmvc2.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://o1mneegwz5.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `DjEAZXitL3LP611Yeufcv3LG2mHRP5n5bvFeaY4efrJH`,
})

const { entities } = client;

const useFDA = () => {
    return { entities };
};

export default useFDA;