import { Dimensions } from 'react-native';

export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_SCALE = Dimensions.get('window').scale;

export const DEFAULT_WINDOW_MULTIPLIER = 0.50;
export const DEFAULT_NAVBAR_HEIGHT = 65;

export const USER = {
  name: 'Katy Friedson',
  title: 'Engineering Manager',
  image: require('H:/projectNew/client/assets/RQ1iLOs.jpg'),
};

export const FACEBOOK_LIST = [
  {
    title: '个人信息',
    icon: 'person'
  },
  {
    title: '家庭关系',
    icon: 'link'
  },
  {
    title: '我的历史',
    icon: 'history'
  },
  {
    title: '收到的评价',
    icon: 'comment'
  },
];


export const GENERIC_LIST = [
  {
    title: '手机验证',
    icon: 'smartphone'
  },
  {
    title: '修改密码',
    icon: 'fingerprint'
  },
  {
    title: '设置',
    icon: 'settings'
  },
  {
    title: '帮助',
    icon: 'help'
  },
];
