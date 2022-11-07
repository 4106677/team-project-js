import watchedFilms from './js/watchedFilms';
import queueFilms from './js/queueFilms';
import { writeInDataBase, readFromDataBase } from './js/dataBaseApi';

const target = 'watched'; //watched , queue
const uid = 'E7bAOKLi5uVo2RVCvy4tGxdEo7T2';
const filmID = '888888';
const title = 'Men if black 1';
const genres = ['Action', 'Fantasy', 'Science', 'Fiction'];
const imageUrl = '';
const vote_average = '7.9';
const release_date = '2020';

// console.log(localStorage.getItem('userEmail'));
// writeInDataBase(
//   target,
//   uid,
//   filmID,
//   title,
//   genres,
//   imageUrl,
//   vote_average,
//   release_date
// );

readFromDataBase(uid, target).then(console.log);
// console.log();
