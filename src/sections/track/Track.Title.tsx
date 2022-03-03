import React from 'react';
import { Dimensions } from 'react-native';
import { ITrack } from '../../types';
import { Text, Box, Heading, Flex } from 'native-base';

interface TitleProp {
    track: ITrack;
}

function Title({ track }: TitleProp) {
    return (
        <Box alignItems='center' my='4'>
            <Heading fontSize='xl'>
                {track?.title
                    ? track.title
                    : track?.filename}</Heading>
            <Flex direction="row" m='1'>
                {track?.season
                    ? track?.episode
                        ? <>
                            <Text fontSize='xs'>{track.season} </Text>
                            <Text fontSize='xs'>{track.episode}</Text>
                        </>
                        : <Text fontSize='xs'>{track.season}</Text>
                    : <Text fontSize='xs'>시즌 정보가 없습니다.</Text>
                }
            </Flex>
            <Flex direction="row" mx="1">
                {track?.voiceActors
                    ? track.voiceActors.map((actor, index) =>
                        <>
                            {index - 1 === track?.voiceActors?.length
                                ? <Text key={index} fontSize='xs'>{actor.name}</Text>
                                : <Text key={index} fontSize='xs'>{actor.name}, </Text>
                            }
                        </>)
                    : track?.artist
                        ? <Text fontSize='xs'>{track.artist}</Text>
                        : <Text fontSize='xs'>성우 정보가 없습니다.</Text>
                }
            </Flex>
        </Box>
    );
}

const { width, height } = Dimensions.get('window');

export default Title;