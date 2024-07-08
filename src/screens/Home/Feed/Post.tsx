import React, { useCallback } from "react";
import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import { IconButton, Text } from 'react-native-paper';
import Animated, { useSharedValue, withTiming, useAnimatedStyle } from 'react-native-reanimated';

import { PostData } from "../../../types";
import { COLOURS } from "../../../constants";

type UserTypes = {
    profileImage: string;
    userName: string;
}

interface PostProps {
    post: PostData;
}

const UserProfile = ({ profileImage, userName }: UserTypes) => (
    <View style={styles.userContainer}>
      {profileImage && <Image source={{ uri: profileImage }} style={styles.userImage} />}
      <Text style={styles.userName}>{userName}</Text>
    </View>
);

const MyIcon = ({amount, icon}: {amount: number, icon: string}) => (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLOURS.secondary,
        borderRadius: 50,
        height: 40,
        width: 40,
    }}>
        <Text>{amount}</Text>
        <IconButton
            icon={icon}
            size={18}
            style={{ margin: 0 }}
            onPress={() => console.log('Pressed')}
        />
    </View>
);

const Post = ({ post }: PostProps) => {

    const [viewComments, setViewComments] = React.useState(false);
    const opacity = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
          opacity: opacity.value,
        };
    });

    const toggleComments = useCallback(() => {
        setViewComments(!viewComments);
        opacity.value = withTiming(viewComments ? 0 : 1);
    }, [viewComments, opacity]);

    return (
        <View style={styles.postContainer}>
            <UserProfile profileImage={post.user.profile_image ?? null} userName={post.user.name} />
            <Text style={styles.postTitle}>{post.post.title}</Text>
            <Text style={styles.postMessage}>{post.post.message}</Text>
            {post.post.type === 'image' && <Image source={{ uri: post.post.image }} style={styles.postImage} />}
           
            <TouchableOpacity onPress={() => toggleComments()}>
                <Text variant="labelMedium">{post.comments.length} comment</Text>
            </TouchableOpacity>

            {viewComments &&
                <Animated.View style={[styles.viewComments, animatedStyle]}>
                    {post.comments.map((comment, index) => (
                        <View style={styles.commentContainer} key={comment.comment_id}>
                            <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                                <View>
                                    {comment.user.profile_image ? <Image source={{ uri: comment.user.profile_image }} style={styles.commentUserImage} /> : null} 
                                </View>
                                <View>
                                    <Text variant="bodyLarge" style={styles.commentUser}>{comment.user.name}</Text>
                                    <Text>{comment.message}</Text>
                                </View>
                            </View>
                        </View>
                    ))}
                </Animated.View>
            }

            {/* <View style={styles.reactionsContainer}>
                <MyIcon 
                    icon="thumbs-up-down-outline"
                    amount={post.reactions.likes}
                />
                <MyIcon 
                    icon="thumbs-up-down-outline"
                    amount={post.reactions.haha}
                />
                <MyIcon 
                    icon="heart-outline"
                    amount={post.reactions.loves}
                />
            </View> */}
        </View>
    )
};

export default Post;

const styles = StyleSheet.create({
    postContainer: {
        marginBottom: 40,
        padding: 10,
        backgroundColor: COLOURS.white,
        borderRadius: 10,
        shadowColor: COLOURS.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 2,
        width: '100%',
        alignSelf: 'center',
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    userName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    postTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    postMessage: {
        fontSize: 14,
        marginBottom: 10,
    },
    postImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    reactionsContainer: {
        flexDirection: 'row',
        gap: 10,
        position: 'absolute',
        bottom: -20,
    },
    userImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    viewComments: {
        marginTop: 10,
    },
    commentContainer: {
        marginBottom: 10,
        backgroundColor: COLOURS.grey,
        padding: 10,
        borderRadius: 5,
    },
    commentUser: {
        marginBottom: 5,
    },
    commentUserImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
});