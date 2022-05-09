import React from 'react';
import PostType from '../../../interface/IPost';
import MediaType from '../../../interface/IMedia';
import Feed, { FeedLoading } from './Feed';
import Post from './Post';
import Story from './Story';

type Props = {
  className: string;
};

export default function Main({ className }: Props) {
  const newsFeed: Array<PostType> = [
    {
      name: 'Phuoc Long',
      content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum deserunt minima magni repudiandae illum, libero fuga maxime necessitatibus labore quaerat incidunt tempore numquam fugit ut voluptatum sint vitae quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum deserunt minima magni repudiandae illum, libero fuga maxime necessitatibus labore quaerat incidunt tempore numquam fugit ut voluptatum sint vitae quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum deserunt minima magni repudiandae illum, libero fuga maxime necessitatibus labore quaerat incidunt tempore numquam fugit ut voluptatum sint vitae quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum deserunt minima magni repudiandae illum, libero fuga maxime necessitatibus labore quaerat incidunt tempore numquam fugit ut voluptatum sint vitae quae.',
      imgUrl:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      time: new Date(2022, 3, 10, 5, 32, 40, 30),
      media: [
        {
          type: MediaType.IMAGE,
          url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
        },
      ],
      reaction: {},
      comment: [
        '!23',
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum deserunt minima magni repudiandae illum, libero fuga maxime necessitatibus labore quaerat incidunt tempore numquam fugit ut voluptatum sint vitae quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum deserunt minima magni repudiandae illum, libero fuga maxime necessitatibus labore quaerat incidunt tempore numquam fugit utLorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum deserunt minima magni repudiandae illum, libero fuga maxime necessitatibus labore quaerat incidunt tempore numquam fugit ut voluptatum sint vitae quae.Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa earum deserunt minima magni repudiandae illum, libero fuga maxime necessitatibus labore quaerat incidunt tempore numquam fugit ut',
      ],
      share: ['!23'],
    },
    {
      name: 'Phuoc Long',
      content: 'Long dep trai.',
      imgUrl:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      time: new Date(2022, 3, 10, 5, 32, 40, 30),
      media: [
        {
          type: MediaType.IMAGE,
          url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
        },
        {
          type: MediaType.IMAGE,
          url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
        },
      ],
      reaction: {
        like: ['!23', '456', '789'],
        sad: ['!23', '456', '789', '123'],
      },
      comment: ['123', '5234', '234'],
      share: ['@313', '1231', '!2332'],
    },
    {
      name: 'Phuoc Long',
      content: 'Long dep trai.',
      imgUrl:
        'https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
      time: new Date(2022, 3, 10, 5, 32, 40, 30),
      media: [
        {
          type: MediaType.IMAGE,
          url: 'https://picsum.photos/120',
        },
        {
          type: MediaType.IMAGE,
          url: 'https://images.unsplash.com/photo-1454496522488-7a8e488e8606?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1476&q=80',
        },
        {
          type: MediaType.IMAGE,
          url: 'https://picsum.photos/120',
        },
      ],
      reaction: {},
      comment: ['123', '456', '789'],
    },
  ];
  const [isLoading, setIsLoading] = React.useState(true);
  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);
  return (
    <div className={`${className} w-3/5 mx-auto`}>
      <Story />
      <Post />
      {isLoading
        ? Array(Math.round(Math.random() * 4))
            .fill(0)
            .map((item, index) => <FeedLoading key={index} />)
        : newsFeed.map((feed, index) => <Feed key={index} {...feed} />)}
    </div>
  );
}
