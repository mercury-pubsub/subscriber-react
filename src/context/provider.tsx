import type { SubscriberOptions } from "@mercury-pubsub/subscriber";
import { Subscriber } from "@mercury-pubsub/subscriber";
import type { ReactNode } from "react";
import { useState } from "react";
import { subscriberContext } from ".";

/**
 * @public
 */
export type Props = SubscriberOptions & {
	region: ConstructorParameters<typeof Subscriber>[0];
	projectId: ConstructorParameters<typeof Subscriber>[1];
	children: ReactNode;
};

/**
 * @public
 */
export function SubscriberProvider({ region, projectId, children, ...subscriberOptions }: Props) {
	const [subscriber] = useState(new Subscriber(region, projectId, subscriberOptions));

	return <subscriberContext.Provider value={subscriber}>{children}</subscriberContext.Provider>;
}
