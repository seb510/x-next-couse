export interface IProfile {
    username: string;
    displayName: string;
    bio: string;
    location: string;
    website: string;
    joinedDate: string;
    following: number;
    followers: number;
}

export const PROFILES: Record<string, IProfile> = {
    sebistian: {
        username: "sebistian",
        displayName: "Seb",
        bio: "Building things on the web. Always learning. Shipping code, one commit at a time.",
        location: "Berlin, Germany",
        website: "github.com/sebistian",
        joinedDate: "January 2020",
        following: 142,
        followers: 1800,
    },
    elonmusk: {
        username: "elonmusk",
        displayName: "Elon Musk",
        bio: "Technoking of Tesla, Imperator of Mars. Also, I run some rockets.",
        location: "Austin, TX",
        website: "tesla.com",
        joinedDate: "June 2009",
        following: 642,
        followers: 180000000,
    },
    naval: {
        username: "naval",
        displayName: "Naval",
        bio: "Co-founder of AngelList. Investor. Reading, writing, and thinking about wealth and happiness.",
        location: "San Francisco, CA",
        website: "nav.al",
        joinedDate: "March 2009",
        following: 1200,
        followers: 2500000,
    },
    paulg: {
        username: "paulg",
        displayName: "Paul Graham",
        bio: "Co-founder of Y Combinator. Essayist. Lisp programmer. Building the future one startup at a time.",
        location: "Cambridge, MA",
        website: "paulgraham.com",
        joinedDate: "November 2008",
        following: 320,
        followers: 1600000,
    },
    sama: {
        username: "sama",
        displayName: "Sam Altman",
        bio: "CEO at OpenAI. Interested in AI, startups, and the future of humanity.",
        location: "San Francisco, CA",
        website: "blog.samaltman.com",
        joinedDate: "February 2010",
        following: 890,
        followers: 2100000,
    },
    dhh: {
        username: "dhh",
        displayName: "DHH",
        bio: "Creator of Ruby on Rails. Founder at 37signals. Racing driver. Challenging the status quo in tech.",
        location: "Malibu, CA",
        website: "37signals.com",
        joinedDate: "July 2007",
        following: 410,
        followers: 520000,
    },
    kentcdodds: {
        username: "kentcdodds",
        displayName: "Kent C. Dodds",
        bio: "Teacher. Open source maintainer. Helping people make the world better through quality software.",
        location: "Utah, USA",
        website: "kentcdodds.com",
        joinedDate: "May 2012",
        following: 680,
        followers: 380000,
    },
    dan_abramov: {
        username: "dan_abramov",
        displayName: "Dan Abramov",
        bio: "Co-creator of Redux. Working on React at Meta. Thinking about component design.",
        location: "London, UK",
        website: "overreacted.io",
        joinedDate: "October 2011",
        following: 560,
        followers: 710000,
    },
};
