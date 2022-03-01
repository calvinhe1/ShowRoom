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
    description: 'A vampire hunter fights to save a besieged city from an army of otherworldly creatures controlled by Dracula.'}];

export const userList = [{userId: 0, 
                 userName: 'admin', 
                 password: 'admin',
                 profilePicture: '/images/profile-picture.jpg',
                 isAdmin: true},
                {userId: 1,
                 userName: 'user',
                 password: 'user',
                 profilePicture: '/images/profile-picture-2.jpg',
                 isAdmin: false}];

export const commentList = [
  {showId: 0, userId: 0, text: 'Love this show', date: new Date().toDateString(), commentId: 0},
  {showId: 0, userId: 1, text: 'Me too!', date: new Date().toDateString(), commentId: 1},
  {showId: 1, userId: 0, text: 'Hate this show', date: new Date().toDateString(), commentId: 2},
  {showId: 1, userId: 1, text: 'It\'s not that bad', date: new Date().toDateString(), commentId: 3}
];