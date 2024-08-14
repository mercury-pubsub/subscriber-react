import type { SubscriberOptions } from "@mercury-pubsub/subscriber";
import { Subscriber } from "@mercury-pubsub/subscriber";
import type { ReactNode } from "react";
import { useState } from "react";
import { subscriberContext } from ".";

/**
 * @public
 */
export type Props = SubscriberOptions & {
	projectId: string;
	children: ReactNode;
};

/**
 * @public
 */
export function SubscriberProvider({ projectId, children, ...subscriberOptions }: Props) {
	const [subscriber] = useState(new Subscriber(projectId, subscriberOptions));

	return <subscriberContext.Provider value={subscriber}>{children}</subscriberContext.Provider>;
}
