/** Mock data for the purposes of Phase 1, this will all come from the server */

 export const showList = [{showId: 0,
    picture: '/images/aot.jpg',
    title: 'Attack on Titan',
    genre: ['action', 'dark fantasy'],
    startDate: '2009-09-09',
    endDate: '2001-04-09',
    description: 'Eren Yeager is determined to help save humanity when titans re-appear and being to feast on human flesh.'},
    
    {showId: 1,
    picture: '/images/death-note.jpg',
    title: 'Death Note',
    genre: ['Mystery', 'Supernatural thriller'],
    startDate: '2003-12-01',
    endDate: '2006-05-15',
    description: 'A normal, undistinguished college student discovers an odd notebook lying on the ground. He soon discovers that the notebook has magic powers: If someone\'s name is written on it while the writer imagines that person\'s face, he or she will die.'}, 
    
    {showId: 2,
    picture: '/images/castlevania.jpg',
    title: 'Castlevania',
    genre: ['Action', 'Horror', 'Adventure'],
    startDate: '2017-07-17',
    endDate: '2021-05-13', 
    description: 'A vampire hunter fights to save a besieged city from an army of otherworldly creatures controlled by Dracula.'}, 
    
    {showId: 3,
    picture: '/images/onepiece.jpg',
    title: 'One Piece',
    genre: ['Pirates', 'Action', 'Adventure', 'Fantasy'],
    startDate: '1999-10-20',
    endDate: '',
    description: 'Luffy, a young man made of rubber, whom, inspired by his childhood idol, the powerful pirate "Red Haired" Shanks, sets off on a journey from the East Blue Sea to find the mythical treasure, the One Piece, and proclaim himself the King of the Pirates.'},
  
    {showId: 4,
    picture: '/images/demonslayer.jpg',
    title: 'Demon Slayer: Kimetsu no Yaiba',
    genre: ['Adventure', 'Fantasy'],
    startDate: '2016-02-15',
    endDate: '2020-05-18',
    description: 'A boy raised by boars, who wears a boar\'s head, boards the Infinity Train on a new mission with the Flame Pillar along with another boy who reveals his true power when he sleeps. Their mission is to defeat a demon who has been tormenting people and killing the demon slayers who oppose it.'},
  
    {showId: 5,
    picture: '/images/aceattorney.jpg',
    title: 'Ace Attorney',
    genre: ['Drama'],
    startDate: '2016-04-02',
    endDate: '2019-03-30',
    description: 'Follow rookie defense attorney Phoenix Wright as he stands in court to defend clients accused of murder, aided by his spirit medium assistant, Maya Fey.'}
  ];



export const userList = [{userId: 0, 
                 username: 'admin', 
                 password: 'admin',
                 profilePicture: '/images/profile-picture.jpg',
                 isAdmin: true},
                {userId: 1,
                 username: 'user',
                 password: 'user',
                 profilePicture: '/images/profile-picture-2.jpg',
                 isAdmin: false}];

export const commentList = [
  {showId: 0, userId: 0, text: 'Love this show', date: new Date().toDateString(), commentId: 0},
  {showId: 0, userId: 1, text: 'Me too!', date: new Date().toDateString(), commentId: 1},
  {showId: 1, userId: 0, text: 'Hate this show', date: new Date().toDateString(), commentId: 2},
  {showId: 1, userId: 1, text: 'It\'s not that bad', date: new Date().toDateString(), commentId: 3}
];

export const episodeList = [
  {showId: 0, episode: 1},
  {showId: 1, episode: 1},
  {showId: 2, episode: 1},
  {showId: 3, episode: 1},
  {showId: 3, episode: 2}
];

export const ratingList = {
  0: {
    rating: 5.0,
    ratingCount: 1,
    ratings: {0: 5.0}, //UserId: rating 
  },
  1: {
      rating: 4.0,
      ratingCount: 1,
      ratings: {0: 5.0}, 
    },
  2: {
      rating: 3.0,
      ratingCount: 1,
      ratings: {0: 5.0}, 
    },
  3: {
    rating: 2.0,
    ratingCount: 1,
    ratings: {0: 5.0}, 
  },
  4: {
    rating: 1.0,
    ratingCount: 1,
    ratings: {0: 5.0}, 
  },
  5: {
    rating: 0.0,
    ratingCount: 0,
    ratings: {}
  }
}