import type { SubscriberOptions } from "@mercury-pubsub/subscriber";
import { Subscriber } from "@mercury-pubsub/subscriber";
import type { ReactNode } from "react";
import { useState } from "react";
import { subscriberContext } from ".";

/**
 * @public
 */
export type Props = SubscriberOptions & {
	children: ReactNode;
};

/**
 * @public
 */
export function SubscriberProvider({ children, ...subscriberOptions }: Props) {
	const [subscriber] = useState(new Subscriber(subscriberOptions));

	return <subscriberContext.Provider value={subscriber}>{children}</subscriberContext.Provider>;
}
