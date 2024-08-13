import type { SubscriberError } from "@mercury-pubsub/subscriber";
import type { Channels } from "@mercury-pubsub/types";
import { useCallback, useEffect, useMemo } from "react";
import { useSubscriber } from "./context/hook";

/**
 * @public
 */
export type PublishFunctions<ChannelId extends keyof Channels> = {
	publish: (body: Channels[ChannelId]) => void;
	publishAsync: (body: Channels[ChannelId]) => Promise<void>;
};

/**
 * @public
 */
export function usePublish<ChannelId extends keyof Channels>(
	channelId: ChannelId,
): PublishFunctions<ChannelId> {
	const subscriber = useSubscriber();

	const publish = useCallback(
		(body: Channels[ChannelId]) => {
			subscriber.publish(channelId, body);
		},
		[channelId, subscriber.publish],
	);

	const publishAsync = useCallback(
		async (body: Channels[ChannelId]) => {
			await subscriber.publish(channelId, body);
		},
		[channelId, subscriber.publish],
	);

	return useMemo(() => ({ publish, publishAsync }), [publish, publishAsync]);
}

/**
 * @public
 */
export type UseSubscribeOptions<ChannelId extends keyof Channels> = {
	onMessage: (body: Channels[ChannelId]) => void;
	onError?: (error: SubscriberError) => void;
};

/**
 * @public
 */
export function useSubscribe<ChannelId extends keyof Channels>(
	channelId: ChannelId,
	{ onMessage, onError }: UseSubscribeOptions<ChannelId>,
): void {
	const subscriber = useSubscriber();

	useEffect(() => {
		const close = subscriber.subscribe(channelId, onMessage, onError);
		return () => {
			close.then((close) => {
				close();
			});
		};
	});
}
