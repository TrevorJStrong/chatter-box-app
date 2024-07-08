import React, { useEffect } from 'react';
import { FlatList, Text, StyleSheet, RefreshControl, Alert } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Button } from 'react-native-paper';
import Animated, {
    useAnimatedStyle,
    useAnimatedRef,
    useScrollViewOffset,
    withTiming
} from 'react-native-reanimated';

import Post from './Post';
import { PostData } from '../../../types';
import { COLOURS } from '../../../constants';

type PostProps = {
    fetchPosts: () => Promise<PostData[]>
    searchData?: Array<PostData>
    searchError?: Error
};

const Feed = ({fetchPosts, searchData, searchError}: PostProps) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const scrollRef = useAnimatedRef<Animated.FlatList>();
    const scrollHandler = useScrollViewOffset(scrollRef);

    const buttonStyle = useAnimatedStyle(() => {
        return {
            opacity: scrollHandler.value > 600 ? withTiming(1) : withTiming(0),
        };
    });

    const { data, error, refetch } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts,
    });

    useEffect(() => {
        if(error) {
            Alert.alert('Error', error.message);
        }
    }, [error])

    useEffect(() => {
        if(searchError) {
            Alert.alert('Error', searchError.message);
        }
    }, [searchError])

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetch()
            .finally(() => setRefreshing(false));
    }, [refetch]);

    const scrollToTop = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollToOffset({ offset: 0, animated: true });
        }
    };

    const isSearch = searchData && searchData.length > 0;

    return (
        <>
            <FlatList
                data={isSearch ? searchData : data}
                ref={scrollRef}
                renderItem={({ item }) => <Post post={item} />}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 80, paddingTop: 10 }}
                ListEmptyComponent={<Text style={styles.emptyState}>No posts available</Text>}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                contentInsetAdjustmentBehavior='automatic'
                keyboardDismissMode='on-drag'
            />

            <Animated.View style={[buttonStyle, { position: 'absolute', bottom: 100, right: 20 }]}>
                <Button 
                    icon="chevron-up" 
                    mode="contained" 
                    style={{ backgroundColor: COLOURS.secondary }}
                    onPress={scrollToTop}
                >
                    Back to top
                </Button>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    emptyState: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: 18,
    },
});

export default Feed;
