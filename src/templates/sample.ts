export const SampleVoiceActor =
{
	id: '1',
	name: 'Voice Actor 1',
	image: {
		uri: 'https://picsum.photos/200/300',
		filename: 'voiceActor.jpg',
	},
}

export const SampleTrack = {
	id: '샘플 트랙',
	title: '선택된 트랙이 없습니다.',
	filename: '',
	artist: '',
	url: 'https://picsum.photos/200/300',
};

export const SamplePicks = [{
	id: '1',
	track: SampleTrack,
	timestamp: 12,
	memo: '정말 좋네요',
	voiceActors: [{
		id: '1',
		name: 'Voice Actor 1',
		image: {
			uri: 'https://picsum.photos/200/300',
			filename: 'voiceActor.jpg',
		},
	},]
}, {
	id: '2',
	track: SampleTrack,
	timestamp: 12,
	memo: '그동안 쌓인 실마리가 드디어 풀리는 부분!!',
},
]

export const SampleTrackList =
{
	id: '1',
	tracks: [
		SampleTrack,
		SampleTrack,
		SampleTrack,
	],
	title: 'Track List 1',
	description: 'Track List 1 description',
	artwork: {
		uri: 'https://picsum.photos/200/300',
		filename: 'trackList.jpg',
	},
	voiceActors: [
		SampleVoiceActor,
		SampleVoiceActor
	],
}