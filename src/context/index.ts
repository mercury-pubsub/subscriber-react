import { Subscriber } from "@mercury-pubsub/subscriber";
import { createContext } from "react";

class MissingSubscriber extends Subscriber {
	override publish(): Promise<void> {
		throw new Error("Missing SubscriberProvider");
	}

	override subscribe(): Promise<() => void> {
		throw new Error("Missing SubscriberProvider");
	}
}

export const subscriberContext = createContext<Subscriber>(new MissingSubscriber());
