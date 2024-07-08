import Reactotron, { networking } from "reactotron-react-native";
import {
  QueryClientManager,
  reactotronReactQuery,
} from 'reactotron-react-query';

import { queryClient } from './queryClient';

const queryClientManager = new QueryClientManager({
  // @ts-ignore
  queryClient,
});

Reactotron.use(reactotronReactQuery(queryClientManager))
  .configure({
    onDisconnect: () => {
      queryClientManager.unsubscribe();
    },
  })
  .useReactNative()
  .use(networking()) // connect to the networking plugin
  .connect();