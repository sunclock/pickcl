import React, { ReactNode } from 'react';
import { Dimensions } from 'react-native';
import { ITrack } from '../../types';
import { HStack, Text, Box, Heading, Flex, Divider } from 'native-base';

interface HeaderProps {
    track: ITrack,
    // children: ReactNode[] | ReactNode;
}

function Header({ track }: HeaderProps) {
    return (
        <Box alignItems='center'>
            <Heading fontSize='xl'>
                {track.title
                    ? track.title
                    : track.filename}</Heading>
            <Flex direction="row" mx="1">
                {track.season
                    ? track.episode
                        ? <>
                            <Text fontSize='xs'>{track.season} </Text>
                            {/* <Divider mx="1" bg="emerald.500" thickness="2" orientation="vertical" /> */}
                            <Text fontSize='xs'>{track.episode}</Text>
                        </>
                        : <Text fontSize='xs'>{track.season}</Text>
                    : <Text fontSize='xs'>시즌 정보가 없습니다.</Text>
                }
            </Flex>
            <Flex direction="row" mx="1">
                {track.voiceActors
                    ? track.voiceActors.map((actor, index) =>
                        <>
                            <Text key={index} fontSize='xs'>{actor.name} </Text>
                            {/* {index !== track.voiceActors.length - 1 &&
                                <Divider mx="1" bg="indigo.500" thickness="2" orientation="vertical" />
                            } */}
                        </>)
                    : track.artist
                        ? <Text fontSize='xs'>{track.artist}</Text>
                        : <Text fontSize='xs'>성우 정보가 없습니다.</Text>
                }
            </Flex>
        </Box>
    );
}

const { width, height } = Dimensions.get('window');

export default Header;