import React from 'react';
import ContentLoader, { Rect } from 'react-content-loader/native';
import { Dimensions } from 'react-native';

import { COLOURS } from '../../constants';

const defaultProps = {
  isActive: true,
  type: 'grid',
};

type Props = {
  isActive?: boolean;
  type?:
  | 'list'
  | 'grid'
  | 'post'
  | 'job';
} & typeof defaultProps;
const foregroundColor = COLOURS.white;
const backgroundColor = COLOURS.grey;

const MyContentLoader = ({ isActive, type }: Props) => {
  if (!isActive) {
    return null;
  }

  if (type === 'grid') {
    return (
      <ContentLoader
        viewBox="0 0 500 420"
        height={420}
        width={200}
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
      >
        <Rect x="16" y="17" rx="0" ry="0" width="300" height="200" />
        <Rect x="16" y="229" rx="2" ry="2" width="275" height="15" />
        <Rect x="16" y="253" rx="2" ry="2" width="140" height="15" />
      </ContentLoader>
    );
  }

  if (type === 'post') {
    return (
      <ContentLoader
        height={500}
        width={500}
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
      >
        <Rect x="16" y="17" rx="0" ry="0" width="350" height="80" />
        <Rect x="16" y="129" rx="2" ry="2" width="350" height="80" />
        <Rect x="16" y="241" rx="2" ry="2" width="350" height="80" />
        <Rect x="16" y="353" rx="2" ry="2" width="350" height="80" />
      </ContentLoader>
    );
  };

  if (type === 'job') {
    return (
      <ContentLoader
        height={600}
        width={500}
        foregroundColor={foregroundColor}
        backgroundColor={backgroundColor}
      >
        <Rect x="16" y="17" rx="0" ry="0" width="350" height="100" />
        <Rect x="16" y="129" rx="2" ry="2" width="350" height="100" />
        <Rect x="16" y="241" rx="2" ry="2" width="350" height="100" />
      </ContentLoader>
    );
  };

  // else "list"
  return (
    <ContentLoader
      height={500}
      width={500}
      foregroundColor={foregroundColor}
      backgroundColor={backgroundColor}
    >
      <Rect x="16" y="17" rx="0" ry="0" width="350" height="70" />
      <Rect x="16" y="129" rx="2" ry="2" width="350" height="70" />
      <Rect x="16" y="241" rx="2" ry="2" width="350" height="70" />
      <Rect x="16" y="353" rx="2" ry="2" width="350" height="70" />
    </ContentLoader>
  );
};

MyContentLoader.defaultProps = defaultProps;

export default MyContentLoader;
