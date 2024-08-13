import type { Subscriber } from "@mercury-pubsub/subscriber";
import { useContext } from "react";
import { subscriberContext } from ".";

/**
 * @public
 */
export function useSubscriber(): Subscriber {
	return useContext(subscriberContext);
}
