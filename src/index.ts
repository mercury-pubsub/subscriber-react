import type { SubscriberError } from "@mercury-pubsub/subscriber";
import type { Channels } from "@mercury-pubsub/types";
import { useCallback, useEffect, useMemo } from "react";
import { useSubscriber } from "./context/hook";

/**
 * @public
 */
export type PublishFunctions<ChannelName extends keyof Channels> = {
	publish: (body: Channels[ChannelName]) => void;
	publishAsync: (body: Channels[ChannelName]) => Promise<void>;
};

/**
 * @public
 */
export function usePublish<ChannelName extends keyof Channels>(
	channelName: ChannelName,
): PublishFunctions<ChannelName> {
	const subscriber = useSubscriber();

	const publish = useCallback(
		(body: Channels[ChannelName]) => {
			subscriber.publish(channelName, body);
		},
		[channelName, subscriber.publish],
	);

	const publishAsync = useCallback(
		async (body: Channels[ChannelName]) => {
			await subscriber.publish(channelName, body);
		},
		[channelName, subscriber.publish],
	);

	return useMemo(() => ({ publish, publishAsync }), [publish, publishAsync]);
}

/**
 * @public
 */
export type UseSubscribeOptions<ChannelName extends keyof Channels> = {
	onMessage: (body: Channels[ChannelName]) => void;
	onError?: (error: SubscriberError) => void;
};

/**
 * @public
 */
export function useSubscribe<ChannelName extends keyof Channels>(
	channelName: ChannelName,
	{ onMessage, onError }: UseSubscribeOptions<ChannelName>,
): void {
	const subscriber = useSubscriber();

	useEffect(() => {
		const close = subscriber.subscribe(channelName, onMessage, onError);
		return () => {
			close.then((close) => {
				close();
			});
		};
	});
}
