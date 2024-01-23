export class Text {
  text: { en: string }
  comfirmText?: { en: string }
  cancelText?: { en: string }
  vAlign: string
  //portrait: string
  nextTextIndex?: number
  bIsComfirmText?: boolean = false
  comfirmTextIndex?: number
  cancelTextIndex?: number
  comfirmFunction?: Function
  cancelFunction?: Function
  callback?: Function
  bEndDialog?: boolean = false
  image?: string
  title?: string
  fontSize?: number
}

export class Dialog {
  texts: Text[]
}

export const textDialogs: Dialog[] = [
  // INDEX 0 - NPC ENTRANCE
  {
    texts: [
      {
        text: {
          en: "Welcome to Avatar Garden, where the wild \n100 Avatars are.",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "Nice to meet you! I’m Cool Banana and I’m gonna be your \nguide in this experience. Did you know the garden’s \nart style is inspired by Paul Gauguin, French artist \nfrom the 19th century?",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "Here you will be able to collect one unique avatar skin \nevery day you play up to 100 Avatars.",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "You heard it right, 100 AVATARS for free!",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "Go by the plaza to learn more about the games, the \nunlock pass and the team behind this.",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
    ]
  },
  //index 1
  {
    texts: [
      {
        text: {
          en: "Here you can see all the avatars you can unlock, with \ncolours representing which one you have unlocked already, \nwhich one you will unlock and the rest that remain \nlocked until you reach the play day.",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "Avatars are unlocked in order, starting with the \nnumber 1 and getting to number 100 as you \ncome by and play.",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "Every day you come and play you will unlock \na new one. You don’t need to come every day of \nthe week, or come the 100 days straight.",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "Come whenever you want, the prizes will always \nunlock based on your daily progression, ensuring \nyou can get them all. ",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
    ]
  },
  //index 2
  {
    texts: [
      {
        text: {
          en: "This is the playtime area, every day a new game will \nbe picked and revealed to all the players so no one \ngets bored!",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "You can play as much as you want, beat the leader boards \nand be the 1st in all the minigames of the garden.",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "If you reach to the minimum threshold on the minigame the \navatar of the day will be unlocked for you to claim.",
        },
        vAlign: "0%",
      },

      {
        text: {
          en: "Don’t be shy, play and try it out!",
        },
        vAlign: "0%",
      },
      // {
      //   text: {
      //     en: "I will take a rest in here for now! Talk to me \nagain the next day you come to play!",
      //   },
      //   vAlign: "0%",
      //   bEndDialog: true,
      // }
    ]
  },
  //index 3 - OLD USED DIALOGUES
  {
    texts: [
      { // 0
        text: {
          en: "Welcome!! I guess you are back because \ntoday’s Avatar is C-U-T-E.\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 1
        text: {
          en: "Hello again! These games are addictive, right?\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 2
        text: {
          en: "Nice to see you again!! Have you eat well? \nYou need energy to collect them all.\n\nLet’s play!"
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 3
        text: {
          en: "I can’t believe you’re back! Can I have your autograph? \nYou’re becoming a master of this land.\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 4
        text: {
          en: "I missed you! \nI was bored playing on my own, but now you’re here...\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 5
        text: {
          en: "I wish I was the next Avatar in your collection. \nWait, am I?\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 6
        text: {
          en: "As Mariah Carey every Christmas, \nyou came back again. SO COOL!\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 7
        text: {
          en: "You again? Ugh. Well well, let’s do this…\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 8
        text: {
          en: "I’ve never been happier to se a face again! \nI like when we spend the time together. \nIt makes me feel… things\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },
      { // 9
        text: {
          en: "Hi there! I was told potasium is great to play \nthe minigames. But I don’t know where you can find it…\n\nLet’s play!",
        },
        vAlign: "0%",
        bEndDialog: true,
      },

    ]
  },
  //index 4
  {
    texts: [
      {
        text: {
          en: "Oh wow, you unlocked all avatars! \nI’m so proud of you!",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "I'm affraid I don't have anything else \nto give you, I hope you had fun!",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "Of course you can keep playing the minigames \nand try to beat your own score.",
        },
        vAlign: "0%",
        bEndDialog: true,
      }
    ]
  },
  //index 5 - NPC LEADERBOARD
  {
    texts: [
      {
        text: {
          en: "Here you will find your scores and the best players \non each game, beat your scores and reach to the top!",
        },
        vAlign: "0%",
      },
    ]
  },
  //index 6 - NPC DAO
  {
    texts: [
      {
        text: {
          en: "You may know us. We, Polygonal Mind, built this project \n4 years ago and we have been expanding it each \ntime we create a new place of the 100 Avatars project. ",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "But this experience would have not been possible without \nthe help of the Decentraland DAO. ",
        },
        vAlign: "0%",
      },
      {
        text: {
          en: "This project has been proudly funded by the Decentraland \nDAO and built by Polygonal Mind so everyone could \nenjoy and have 100 unique wearables to show off and \nexpress themselves in the Metaverse.",
        },
        vAlign: "0%",
        bEndDialog: true,
      }
    ]
  },
]