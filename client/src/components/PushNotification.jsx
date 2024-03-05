import React, { useEffect } from "react";

import NotificationsIcon from "@mui/icons-material/Notifications";
import { createClient } from "graphql-ws";
import { GRAPHQL_SUBSCRIPTION_ENDPOINT } from "../utils/constants";
// import { Query } from "mongoose";
const client = createClient({
  url: GRAPHQL_SUBSCRIPTION_ENDPOINT,
});

export default function PushNotification() {
  useEffect(() => {
    // query
    (async () => {
      const query = client.iterate({
        query: "{ hello }",
      });

      const { value } = await query.next();
      expect(value).toEqual({ hello: "world" });
    })();

    // subscription
    (async () => {
      const subscription = client.iterate({
        query: "subscription { greetings }",
      });

      for await (const event of subscription) {
        expect(event).toEqual({ greetings: "Hi" });

        // complete a running subscription by breaking the iterator loop
        break;
      }
    })();
  }, []);
  return <NotificationsIcon />;
}
