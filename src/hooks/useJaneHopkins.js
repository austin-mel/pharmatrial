import { createVendiaClient } from '@vendia/client'

const client = createVendiaClient({
  apiUrl: `https://uylm47v5ej.execute-api.us-west-2.amazonaws.com/graphql/`,
  websocketUrl: `wss://760xahtok6.execute-api.us-west-2.amazonaws.com/graphql`,
  apiKey: `Dq4vfR99Dzgn1yAbZsQ9ZUz26jW2hP9dsuo2VAEeaxFb`,
})

const { entities } = client;

const useJaneHopkins = () => {
    return { entities };
};

export default useJaneHopkins;