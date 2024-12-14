// import { CATEGORY } from "@/data";
// import { ICollection, IBid, IProvenance, NFT, User } from "@/types";
// import { faker } from "@faker-js/faker";
// import { formatDistanceToNow, parseISO } from "date-fns";

// faker.seed(5);
// const categories = [
//   CATEGORY.ART,
//   CATEGORY.AUDIO,
//   CATEGORY.DESIGN,
//   CATEGORY.EBOOK,
//   CATEGORY.PHOTOGRAPHY,
//   CATEGORY.THREE_D,
//   CATEGORY.TICKET,
//   CATEGORY.VIDEO,
// ];
// const generateDummyAssets = () => {
//   const dummyData = [];
//   for (let i = 0; i < 20; i++) {
//     const category = categories[Math.floor(Math.random() * categories.length)];
//     const data: NFT = {
//       tokenId: i + 1,
//       name: faker.word.noun(),
//       description: faker.lorem.sentence(),
//       image: !(category === CATEGORY.VIDEO)
//         ? faker.image.urlPicsumPhotos()
//         : undefined,
//       audio:
//         category === CATEGORY.AUDIO
//           ? "https://bafkreicmqfsldedmrvjsmsc57oy6r7ojugnswjj3wwcgmctp2hyiqgzkp4.ipfs.nftstorage.link/"
//           : undefined,
//       video:
//         category === CATEGORY.VIDEO
//           ? "https://bafybeibfb7hbpkzgm7cguy3eidp4hm7cmmiqpm5cuoucjqpzu7xkr6t2ba.ipfs.nftstorage.link/"
//           : undefined,
//       likes: faker.number.int({ min: 0, max: 100 }),
//       liked: faker.datatype.boolean(Math.random()),
//       category: category,
//       price:
//         i % 3 === 0
//           ? faker.number
//               .float({ min: 0.00001, max: 1, fractionDigits: 4 })
//               .toString()
//           : undefined,
//       royalty: faker.number.int({ min: 1, max: 10 }),
//       collection: {
//         id: faker.number.int(),
//         avatar: faker.image.avatar(),
//         name: faker.word.noun(),
//       },
//       creator: {
//         userName: faker.internet.userName(),
//         avatar: faker.image.avatar(),
//         address: `0x${faker.finance.bitcoinAddress()}`,
//       },
//       owner: {
//         userName: faker.internet.userName(),
//         avatar: faker.image.avatar(),
//         address: `0x${faker.finance.bitcoinAddress()}`,
//       },
//       auction:
//         i % 3 === 0
//           ? undefined
//           : {
//               auctionId: faker.number.int(),
//               auctionEnd: new Date(faker.date.future()).getTime(),
//               highestBid: faker.number
//                 .float({ min: 0.00001, max: 1, fractionDigits: 4 })
//                 .toString(),
//             },
//       transactionHash: `0x${faker.finance.litecoinAddress()}`,
//     };
//     dummyData.push(data);
//   }
//   return dummyData;
// };

// export const assets = generateDummyAssets();

// const generateDummyCollections = () => {
//   const dummyData = [];
//   for (let i = 0; i < 10; i++) {
//     const data: ICollection = {
//       id: (i + 1),
//       name: faker.word.noun(),
//       description: faker.lorem.sentence(),
//       avatar: faker.image.url(),
//       creator: {
//         userName: faker.internet.userName(),
//         avatar: faker.image.avatar(),
//         address: `0x${faker.finance.bitcoinAddress()}`,
//       },
//       volume: faker.number
//         .float({ min: 1, max: 20, fractionDigits: 4 })
//         .toString(),
//       items: faker.number.int({ min: 5, max: 50 }),
//       floorPrice: faker.number
//         .float({ min: 1, max: 20, fractionDigits: 4 })
//         .toString(),
//       latestPrice: faker.number
//         .float({ min: 1, max: 20, fractionDigits: 4 })
//         .toString(),
//       images: [
//         faker.image.urlPicsumPhotos(),
//         faker.image.urlPicsumPhotos(),
//         faker.image.urlPicsumPhotos(),
//         faker.image.urlPicsumPhotos(),
//       ],
//     };
//     dummyData.push(data);
//   }
//   return dummyData;
// };

// export const collections = generateDummyCollections();

// const generateDummyUsers = () => {
//   const dummyData = [];
//   for (let i = 0; i < 10; i++) {
//     const data: User = {
//       userName: faker.internet.userName(),
//       avatar: faker.image.avatar(),
//       address: `0x${faker.finance.bitcoinAddress()}`,
//       bio: faker.person.bio(),
//       profile_background: faker.image.urlPicsumPhotos(),
//       facebook: faker.internet.url(),
//       twitter: faker.internet.url(),
//       youtube: faker.internet.url(),
//       telegram: faker.internet.url(),
//       sales: faker.number.float({
//         min: 10,
//         max: 30,
//         fractionDigits: 4,
//       }),
//     };
//     dummyData.push(data);
//   }
//   return dummyData;
// };

// export const users = generateDummyUsers();

// const events = ["sale", "tranfer", "mint"];
// const generateDummyProvenance = () => {
//   const dummyData = [];
//   for (let i = 0; i < 10; i++) {
//     const data: IProvenance = {
//       event: events[Math.floor(Math.random() * events.length)],
//       from: {
//         userName: faker.internet.userName(),
//         avatar: faker.image.avatar(),
//         address: `0x${faker.finance.bitcoinAddress()}`,
//       },
//       to: {
//         userName: faker.internet.userName(),
//         avatar: faker.image.avatar(),
//         address: `0x${faker.finance.bitcoinAddress()}`,
//       },
//       price: faker.number
//         .float({ min: 1, max: 20, fractionDigits: 4 })
//         .toString(),
//       transactionHash: `0x${faker.finance.litecoinAddress()}`,
//       date: new Date(faker.date.future()).getTime(),
//     };
//     dummyData.push(data);
//   }
//   return dummyData;
// };

// export const provenances = generateDummyProvenance();

// const generateDummyBids = () => {
//   const dummyData = [];
//   for (let i = 0; i < 10; i++) {
//     const data: IBid = {
//       from: {
//         userName: faker.internet.userName(),
//         avatar: faker.image.avatar(),
//         address: `0x${faker.finance.bitcoinAddress()}`,
//       },
//       bid: faker.number
//         .float({ min: 1, max: 20, fractionDigits: 4 })
//         .toString(),
//       hash: `0x${faker.finance.litecoinAddress()}`,
//       date: new Date(faker.date.future()).getTime(),
//     };
//     dummyData.push(data);
//   }
//   return dummyData;
// };

// export const bids = generateDummyBids();

// export const timeAgo = (date: Date | string): string => {
//   if (typeof date === "string") {
//     date = parseISO(date);
//   }
//   return formatDistanceToNow(date, { addSuffix: true });
// };
