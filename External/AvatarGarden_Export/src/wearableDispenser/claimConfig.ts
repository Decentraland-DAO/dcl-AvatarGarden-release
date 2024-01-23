import { WearableEnumConstructorArg } from "./claimWearable.schema"


export class WearableEnumInst {
  name?: string
  address?: string
  urn?: string
  itemId?: string

  constructor(args: WearableEnumConstructorArg) {
    if (args && args.name) this.name = args.name
    if (args && args.address) this.address = args.address
    if (args && args.itemId) this.itemId = args.itemId
    if (args && args.urn) this.urn = args.urn
    if (this.address && this.itemId && this.urn) {

      if (!this.urn.includes(this.address + ":" + this.itemId)) {
        console.log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        console.log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        console.log("WARNING address + itemId vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
      }
    } else if (this.address && this.urn) {
      if (!this.urn.includes(this.address)) {
        console.log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        console.log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
        console.log("WARNING address  vs urn missmatch!!", this.urn, "vs", this.address, this.itemId, "for", this.name)
      }
    }
  }
}

//AVATARS NAME
enum AVATAR_NAME {
  AV_1 = "Crimsom",
  AV_2 = "Cool Alien",
  AV_3 = "Jimmy",
  AV_4 = "Old Moustache",
  AV_5 = "Skull",
  AV_6 = "Cappy",
  AV_7 = "Observer",
  AV_8 = "Hugo",
  AV_9 = "Cactus Boy",
  AV_10 = "Froggy",
  AV_11 = "Teddy",
  AV_12 = "Chill",
  AV_13 = "Mint",
  AV_14 = "Anchor",
  AV_15 = "Nightmare",
  AV_16 = "Pumpkin",
  AV_17 = "Robothead",
  AV_18 = "Retroman",
  AV_19 = "Wizzir",
  AV_20 = "Wambo",
  AV_21 = "Polydancer",
  AV_22 = "Wire Friend",
  AV_23 = "Carrot Kid",
  AV_24 = "Cool Banana",
  AV_25 = "Mushy",
  AV_26 = "Udom",
  AV_27 = "Astrodisco",
  AV_28 = "Bullidan",
  AV_29 = "Skelly",
  AV_30 = "Bloody",
  AV_31 = "Devil",
  AV_32 = "Clown",
  AV_33 = "Franky",
  AV_34 = "Ghost",
  AV_35 = "Wolfman",
  AV_36 = "Mummy",
  AV_37 = "Eyelids",
  AV_38 = "Kate",
  AV_39 = "Witch",
  AV_40 = "Sticker",
  AV_41 = "Horror Nurse",
  AV_42 = "Scarecrow",
  AV_43 = "Dracula",
  AV_44 = "Zombie",
  AV_45 = "DinoKid",
  AV_46 = "Mafiossini",
  AV_47 = "David",
  AV_48 = "Atronaut",
  AV_49 = "Captain Lobster",
  AV_50 = "Samuela",
  AV_51 = "PolyBot",
  AV_52 = "Jennifer",
  AV_53 = "Erika",
  AV_54 = "Lydia",
  AV_55 = "Fungus",
  AV_56 = "Olivia",
  AV_57 = "Rose",
  AV_58 = "Shiro",
  AV_59 = "Rabbit",
  AV_60 = "Angry",
  AV_61 = "Amazonas",
  AV_62 = "Aesthetica",
  AV_63 = "Cubiq",
  AV_64 = "Confirmed",
  AV_65 = "Disturbing Eyes",
  AV_66 = "Bacondude",
  AV_67 = "Ferk",
  AV_68 = "Always Watching",
  AV_69 = "Kyle",
  AV_70 = "Robert",
  AV_71 = "Lil Bro",
  AV_72 = "Mikel",
  AV_73 = "Pepo",
  AV_74 = "Baldman",
  AV_75 = "Expol",
  AV_76 = "Muscary",
  AV_77 = "Weird Flex but Ok",
  AV_78 = "Pipe",
  AV_79 = "Chad",
  AV_80 = "Coffee",
  AV_81 = "Toothpaste",
  AV_82 = "Good Tomato",
  AV_83 = "Butter",
  AV_84 = "Milk",
  AV_85 = "Cucumber",
  AV_86 = "Toilet Paper",
  AV_87 = "Hotdog",
  AV_88 = "Avocado",
  AV_89 = "Watermelon",
  AV_90 = "Eggplant",
  AV_91 = "BigBro",
  AV_92 = "Chilli",
  AV_93 = "Ice Cream",
  AV_94 = "Cool Choco",
  AV_95 = "Candy Cane",
  AV_96 = "Xmas tree",
  AV_97 = "Snowy",
  AV_98 = "Cookieman",
  AV_99 = "Present",
  AV_100 = "Saint Claus",
}

//AVATARS KEY Dispenser
enum KEY_AVATAR_DISPENSER {
  key_av_1 = "fjg9fbNcSO+R9hn57RiXM8iIc9C2XUtIvQ1DTZRJ4Fs=.w1rItMmAZPh486pOe5bFOjp3jIxgksu/NfRp/M9AWm0=",
  key_av_2 = "uAJXBsSkSdaWpBMll2ErDciIc9C2XUtIvQ1DTZRJ4Fs=./GAAeGUW8FX7Njbc+d1m92nO8/xqrneMnj2B4MpvVDQ=",
  key_av_3 = "R03b+v/IR/CBIQbsll9Hg8iIc9C2XUtIvQ1DTZRJ4Fs=.7jp1+FSBA0ByevPXuYhHTtpsxO4v9Z2TuYpjPj/FsXg=",
  key_av_4 = "ubHaQNZ5RfKRun0nUNnbbMiIc9C2XUtIvQ1DTZRJ4Fs=.aVok2ovtP6s0Es7jD8poIgLgBaJprV5zndZM1rYogjI=",
  key_av_5 = "z6Zn7C2zRqO7AfPPmNspr8iIc9C2XUtIvQ1DTZRJ4Fs=.Pc8g2Fu/wjddreiAwOgzZ+uYJlcDJjj6oz5qglFPOGo=",
  key_av_6 = "s2WaaWnpSzKc0aac8GB34MiIc9C2XUtIvQ1DTZRJ4Fs=.6VYccNMEdtE3wOMU+fDe4mp7nvKLO3mSgPqDLM38544=",
  key_av_7 = "ivX1TPozQ+GaR3Bb543/hMiIc9C2XUtIvQ1DTZRJ4Fs=.JkM/PNbN8rFYnVvl0P1jWGnYJdRcePD7uPgh9MKWbbE=",
  key_av_8 = "3CcdTPOHTWmsCjnemKgr/MiIc9C2XUtIvQ1DTZRJ4Fs=./W4qC7loJExxNALvhOKPv2bBgovSFQdCjoP/AohMOm4=",
  key_av_9 = "ibHyq4sUQ2qLq4j15gle3ciIc9C2XUtIvQ1DTZRJ4Fs=.c0noV1hOiTsfct48gVb+pgfnUc6muS+u1VRT9bzV+0g=",
  key_av_10 = "F32BzpUCRBSYSNR/E4/OhMiIc9C2XUtIvQ1DTZRJ4Fs=.UHcMPVZ8C4XssXCtGEOi+TeVM3Tc4jQc3kUlMjewPZU=",
  key_av_11 = "6m7v/KwKSnGzeKQCttxgLsiIc9C2XUtIvQ1DTZRJ4Fs=.7ISo3/lcNQo74IUW8VO8VV2VuRSu+n+oDEAJivt2sAI=",
  key_av_12 = "nVThVEFGTcqvldxUF+VrGciIc9C2XUtIvQ1DTZRJ4Fs=.wqn4QqOgH+KQj7Dbe5UULWJckfAgec0ecuwk9teayIw=",
  key_av_13 = "1KAI4Pr8SUGd4MuKbJd38MiIc9C2XUtIvQ1DTZRJ4Fs=.6SkpTJKrHPfFoXkqlI2wHCMttPklvBqlhTSMns32Tm4=",
  key_av_14 = "hAiuTjZgR5muvNYRBOQGF8iIc9C2XUtIvQ1DTZRJ4Fs=.u0lUKWMJOr0upqhRK1+MVOOgw7TCQDCkAzmabzt4hAI=",
  key_av_15 = "vRKOd35WQrOyi4ERi0p1EMiIc9C2XUtIvQ1DTZRJ4Fs=.614gpPFj1yRhoGXprMMsLGA0FD5f2mxky8MNElu9aGQ=",
  key_av_16 = "5d4o5PLGQTaCW+VLJykTj8iIc9C2XUtIvQ1DTZRJ4Fs=.o+XQpnJ00yUu4nI9TJHqZMuUvcA0EdoaTBSpGIyoqpc=",
  key_av_17 = "iihKRq0xT3Sd2m/qyj/euMiIc9C2XUtIvQ1DTZRJ4Fs=.o7XnD1MxK0nyEN6WvW5kjCexn8S3TT8jW5aJ7CdQ3KY=",
  key_av_18 = "kncfXvy6Qh+admOOOcakDsiIc9C2XUtIvQ1DTZRJ4Fs=.mCbM03r1V37J2QC8yFYl1kV3htrGZkvNFbAEL3hupDM=",
  key_av_19 = "9YVvjmDiTaqLqXnnZ2NLlciIc9C2XUtIvQ1DTZRJ4Fs=.guQS7WoP6tk6pnka5MrXoeji+ckV6bC+oR4K49H+Xn8=",
  key_av_20 = "bSslNWTVRs2xVjfZ4pSKesiIc9C2XUtIvQ1DTZRJ4Fs=.B2HrYPtHEUA5YBfkvRNibZ0FQWUKXnOgSqo9CC8pgxg=",
  key_av_21 = "37vt/5ciRBeEpJKoVpEs7MiIc9C2XUtIvQ1DTZRJ4Fs=.F0gjSQFRBDeD47SMVOYK80uFykVZF9NohhRAGPgNx6A=",
  key_av_22 = "QfWhb++DRpu/2PKsemf7FciIc9C2XUtIvQ1DTZRJ4Fs=.r3XWxx/kXb6WC4aUemRoH7w8ekwKDa1JIN7m5o3oqEc=",
  key_av_23 = "ip2+USGMSH+Sm/vQhDonXMiIc9C2XUtIvQ1DTZRJ4Fs=.T6qQvdSpZcY3m6u9TFpL3rlhpwvDAjApZsDstjvujJU=",
  key_av_24 = "5ao2CYt8SbaspeEhG7aR4siIc9C2XUtIvQ1DTZRJ4Fs=.2V2ISHSOwTJ0PRB6P6zjjbko22Y3u7Czz0a7DKdxios=",
  key_av_25 = "zADGti9eQaCFShfVzBzSuMiIc9C2XUtIvQ1DTZRJ4Fs=.MiqBtLms0MWr7A1E4a7fwutzbDa5vZNU0B+Geepc4sU=",
  key_av_26 = "z0XsIRIHTo2Y6fRwH8zg/siIc9C2XUtIvQ1DTZRJ4Fs=.M3o3ldKvZ6xkoaNDuz2zK6l5XSFsJq/Lf3xzPf3JjBk=",
  key_av_27 = "VAGbKN4lS4iOi+h/MRX0asiIc9C2XUtIvQ1DTZRJ4Fs=.h7VT46++PF49KDRlnQN/TvfchmjXgQZ8eTU835uS9OE=",
  key_av_28 = "nCpS7CrkQMKd/3PFQeRlzMiIc9C2XUtIvQ1DTZRJ4Fs=.kEbw9xmVhxseE2Bpiaaup8ctSyfAkyfAeUiVID935PE=",
  key_av_29 = "DzqYoYCqRKaJRgwHMfSJaMiIc9C2XUtIvQ1DTZRJ4Fs=.B1tQNNZbVjOfKRBjgqH1keQvl+c822LayZao1SqLOhc=",
  key_av_30 = "Ky2bX8DCTKep2eSV6UcQY8iIc9C2XUtIvQ1DTZRJ4Fs=.aNgCBV9L7iNpSjwQzsknISgygWgnY3zqnXCDhIg5vM0=",
  key_av_31 = "aqISnU14SxaM4JMPwwVqCciIc9C2XUtIvQ1DTZRJ4Fs=.CU8fagLg9LgK3y10JDWRf4W/8DQBelZYkee7shOr/CY=",
  key_av_32 = "PZ53AQXLQlWwAqTg2sF1aMiIc9C2XUtIvQ1DTZRJ4Fs=.OHA91aLCMKLZWx2VsdHI34u+OS9yssC8uCzmld3aYcI=",
  key_av_33 = "mGiJl+eNT3qJcDC0KI/UTciIc9C2XUtIvQ1DTZRJ4Fs=.2Wbk88UAcRCmwlzurCAiW9QStt/urelIrJOFKjAJoW8=",
  key_av_34 = "u2gLdYfZQyKCnMX2ANIlvsiIc9C2XUtIvQ1DTZRJ4Fs=.K2tu4Fm9GhXR0jSkIXXzrIPsHjudNBCdY0cGMgBwSbc=",
  key_av_35 = "UsbT3gXeSfqOy/356XKhy8iIc9C2XUtIvQ1DTZRJ4Fs=.9ysBL7j3m6zayMozfeiw9uXQvRao8moTsz4DNLlw4QA=",
  key_av_36 = "lTWlhVzWTXWqpajO0LerMMiIc9C2XUtIvQ1DTZRJ4Fs=.All3UgM12BeP87+jvxMcuMau+/zkCeq2Y2rJ1RCzyD4=",
  key_av_37 = "DuNk6kffSYWxIDYlZhCqRciIc9C2XUtIvQ1DTZRJ4Fs=.TdBngPoIvjpiLutbL0C1rMwlv+fcPmCIisuy3t/6TmA=",
  key_av_38 = "iYj8JGfRQKCZofpvmR8SmsiIc9C2XUtIvQ1DTZRJ4Fs=.nFOl/kL7YnMyZlbiFtF2OqeV4hsdvpxrp53MxZ+eCis=",
  key_av_39 = "6NTwLROPSnWXdDpX464UXsiIc9C2XUtIvQ1DTZRJ4Fs=.gqOr6dyy+/fZzWaRZtJlb0SrRJJxCYuPzwWNOMPtSIY=",
  key_av_40 = "TqNsVRG5QeKeGy+OD52eOMiIc9C2XUtIvQ1DTZRJ4Fs=.VtoC7TtfNCW0vQizNzSG5lU9u5WYl6E8dLLfcY6GDHs=",
  key_av_41 = "2ztaVek4RV+CkvGpbmp8esiIc9C2XUtIvQ1DTZRJ4Fs=.AAKM0mZTRQY2qU4SBndaVoxMIkagljNoH0w4o36pjsk=",
  key_av_42 = "AZpnsihxT3aVufRVyEBIO8iIc9C2XUtIvQ1DTZRJ4Fs=.Y9aTNR2RQN579IDST5Ktz/6REis5R9bfeaAzK+XOHIw=",
  key_av_43 = "VU46gqfuQqK8gEbjnneYxsiIc9C2XUtIvQ1DTZRJ4Fs=.f8o5Hfs6eI5rOdO7GgGyxiQMFijBPpoeSDhxkHcvyS0=",
  key_av_44 = "ttrE6Bv7Rf64szZRzKLdusiIc9C2XUtIvQ1DTZRJ4Fs=.i4NGWd1U8NGBkafComa2dfmQjYlrA8bnWv7/vok4dAg=",
  key_av_45 = "TKVv8Xs2RFSYB14L99e+/siIc9C2XUtIvQ1DTZRJ4Fs=.9VRHH/TFT2iBmWMvXoClWLpqoOdhT7LIf8W9abvD87c=",
  key_av_46 = "+gVGH8MFQyqBdt3oV8/dJMiIc9C2XUtIvQ1DTZRJ4Fs=.3cnBu/8Ry0REZJLmxneNPsukdQ4mayEM9yWo0HhMLd8=",
  key_av_47 = "g9QedpaZQDCX6lzcD8S/XciIc9C2XUtIvQ1DTZRJ4Fs=.T3okAAhYfyEM9fOYXVGndXIruNkiGdnbt7/Sw7u41tk=",
  key_av_48 = "uHSnxZ9oRECherpQ1/Y2X8iIc9C2XUtIvQ1DTZRJ4Fs=.3elHGfPMa1IQTdcSLf7KOmDmxwWiJ+TAx4G8eRP3gQ0=",
  key_av_49 = "uynIVrd/RhCRxgeulrR5QciIc9C2XUtIvQ1DTZRJ4Fs=.uYWEeyWSX8fk7DR7iT8qGuyEHJfk/5t8M1cJ+G8jjek=",
  key_av_50 = "EL+gUTvpQ22/SaS1lc37lciIc9C2XUtIvQ1DTZRJ4Fs=.9J+kHkKN1ilYQiBb3ci0oG82YGZNZOgB+sNy57hrNF8=",
  key_av_51 = "Rl8iCBJ4Qi+UJ+Ve4Zrv7MiIc9C2XUtIvQ1DTZRJ4Fs=.QhNflHzYzpUtIX8D8vOXY2rtI4vLC3FuJpZ6nLtTisA=",
  key_av_52 = "rQ0dU088TpaLZs3HgMUq2MiIc9C2XUtIvQ1DTZRJ4Fs=.P3hLak3mDORtK7YPmVMCiz98DZMwng0HaVp8HJcyxSM=",
  key_av_53 = "FjRqdfSfSpOXCqOI//LX68iIc9C2XUtIvQ1DTZRJ4Fs=.JhkOjs+UlclV4WF4NLUf4dQ5rzMtKAF+GsMm8r/VK+o=",
  key_av_54 = "PmAINhS0TV2xyCbS82FzbciIc9C2XUtIvQ1DTZRJ4Fs=.cEMqPATTZ/5CuLSzQlfmWRvtgwN+FLrNCgy/EQ/N8mU=",
  key_av_55 = "+dMGXa00TOuiTHRCcXjLhMiIc9C2XUtIvQ1DTZRJ4Fs=.Q8hbVhWE352kotZsjlmVd2UtotdGtYuDnA5AF8kar24=",
  key_av_56 = "iGFI5R8jSZadpfbm+NEuHMiIc9C2XUtIvQ1DTZRJ4Fs=.Dw034vS7dU2F1h3jdtMmPE1lzbn/jPl03aC4yHUAhYc=",
  key_av_57 = "TddznaMiRLiFClZGr7ab/8iIc9C2XUtIvQ1DTZRJ4Fs=.7Xfyw2US/zELPBfADqGLlTU/xPxCArS8UIiFi3KcaiQ=",
  key_av_58 = "bpqE2+bPTZ6VklfLnKiwF8iIc9C2XUtIvQ1DTZRJ4Fs=.1BcCvB1IT9C+4sUrsSNtZePgvXcIeKnUhda7izkX1kY=",
  key_av_59 = "qOwfNza/S0SNuX2wRFOqS8iIc9C2XUtIvQ1DTZRJ4Fs=.nys8jQaeWf6ri4hrkg4eht0283hlSFp99rbmD4Pt6gQ=",
  key_av_60 = "cfUdHjTSQ3CHjGiaX3+z4siIc9C2XUtIvQ1DTZRJ4Fs=.YDC/O0udEf8MrjgkOxNQLdXo2dQr41BMdIju+Bfm9Ms=",
  key_av_61 = "LY76m7zgSEG0J/Guc5IQAsiIc9C2XUtIvQ1DTZRJ4Fs=.gC1A5zPNg3LruBUXTiCyCIiKgs2FuFDh48NEpFT6bfI=",
  key_av_62 = "mJso+s9YRga4ZWBC0oaZzciIc9C2XUtIvQ1DTZRJ4Fs=.m34tdAR4leDZEXA6iOtx3QeH33CDmP6DfB8xcsRQZ0A=",
  key_av_63 = "wsb5CbaSSSiUHQ347kgRG8iIc9C2XUtIvQ1DTZRJ4Fs=.jGKblzKjB6MjIu+0MrhxkRom2bfS18vBp8t4NZ4cFeU=",
  key_av_64 = "PbqswHApQ4qLIQkZfEhNpciIc9C2XUtIvQ1DTZRJ4Fs=.13qxxuVp1kj3YgQdIXsStgeLRQYtsz0sgl9dEFb0heI=",
  key_av_65 = "h50vaDU+S/eiat6a9GGTyciIc9C2XUtIvQ1DTZRJ4Fs=.5o5/18f1vsI2f+ocxpOZ48/cxQa2l399+D8JZ6jmSNA=",
  key_av_66 = "fqGP5upeQ8OfcdLl87REN8iIc9C2XUtIvQ1DTZRJ4Fs=.lCAGJQ/2/9cK0Ljyt3Q2kyeuVXas0wJyhxY1InmMyWc=",
  key_av_67 = "6sQL0kguRFmMjQQ3eJf81ciIc9C2XUtIvQ1DTZRJ4Fs=.hTgMwSQ9Ufy9hL1XuNMICUWrpJaST4zyL1m9SFArt3I=",
  key_av_68 = "NGjH9sfYTtWYDCH3penJmMiIc9C2XUtIvQ1DTZRJ4Fs=.jXfeQ1tpLx0ola2qoMgRGDKSIn/kY14pjAevSg1aLsI=",
  key_av_69 = "y7BGckuCTAWFs744hwfeW8iIc9C2XUtIvQ1DTZRJ4Fs=.ipb/dUfWvQRH4ctJRYdAmtRVJ0l5PoYKrJ4tgPOXdsg=",
  key_av_70 = "u4o9NUYlQBmB7n13fsL5g8iIc9C2XUtIvQ1DTZRJ4Fs=.Y/gSN1U8iETZxkV5bNY7HNCPgRFTXgxN15zJhakXaTA=",
  key_av_71 = "SPAB5x8FT4aVPg2orq/lU8iIc9C2XUtIvQ1DTZRJ4Fs=.K7OsHn8bkvyeGmhZUxFDSu5ZK8E2ErZXTyiiJ2E1VsQ=",
  key_av_72 = "uQSY39UqRrOahP3LHqRlX8iIc9C2XUtIvQ1DTZRJ4Fs=.U+WqCOsOU9PsoMfmZuW+PTESqVh1qp5PM1z4QORAPM0=",
  key_av_73 = "DvEtVZOcQHiKWUY3Iz8hbsiIc9C2XUtIvQ1DTZRJ4Fs=./9tuNM5Vp7qS35kCSoAZ4fbLyfr1Q+E8S4XGblHt0VI=",
  key_av_74 = "adyaxGqDRQqdFrjZppeU1ciIc9C2XUtIvQ1DTZRJ4Fs=.qdUP9MPt7a1K/D9PPfn9g8yibOI5Ca29fFRrmVbORqE=",
  key_av_75 = "frmpd3NbRgyZKBW0vs+6LsiIc9C2XUtIvQ1DTZRJ4Fs=.kBest9M+W0L0lmGCtCel3/rc6CV3Ahaa0iN+FOn0GsY=",
  key_av_76 = "jY+TeRiDRdaTz5vvOBkFIsiIc9C2XUtIvQ1DTZRJ4Fs=.eK8qgCH7N8J2tl0m1N+uPKsKeAZy6xp4MYuC3MChz6c=",
  key_av_77 = "J7vor95nSVKsaHnvmjJWx8iIc9C2XUtIvQ1DTZRJ4Fs=.Z9vw9eUcPO9alBN1bVZ5SWEZrz0lKwY+Lh0T4EEImsQ=",
  key_av_78 = "MAHgVToWSqS4U34QDygWd8iIc9C2XUtIvQ1DTZRJ4Fs=.8Nicli3XZWpao1W7YgCCOyeVclqnVFHeNzV2NBKVLws=",
  key_av_79 = "8VQ177JtTcq46COuWe1+x8iIc9C2XUtIvQ1DTZRJ4Fs=.ygGRiqR8ToZ8KNFbJZIF6r+agzs1m97yvfW2CM/RAxY=",
  key_av_80 = "jVzmSghhS8qSJ8xCO6otiMiIc9C2XUtIvQ1DTZRJ4Fs=.omzhmKySnsVq2T7NOHH8DNDkop1dARVhhunFum7VL54=",
  key_av_81 = "pgRciToYStKXVuLfgEG/yMiIc9C2XUtIvQ1DTZRJ4Fs=.Obpb1niP6rgvUz7sOceVqXfjGZZ9wHRBZVvCjEROU4o=",
  key_av_82 = "2SPupyjJSEiRlpiWVqOhssiIc9C2XUtIvQ1DTZRJ4Fs=.Qkj1cv0Ul2Sb6M9Tp6QN6ZIrhSpAXyGKkea/ZXC6VaU=",
  key_av_83 = "RCIB40tXTmioxW1v9H79EsiIc9C2XUtIvQ1DTZRJ4Fs=.PvqkNIC2niVdYOs/jv/UiWvNgqSY1Hst8m2ui4gt4EE=",
  key_av_84 = "sv4ioqiHSQOXHvzhVdJLqciIc9C2XUtIvQ1DTZRJ4Fs=.FgiiKPCTAsXul7DXWlER9X5Ya33KPaCVJ5XVjCcE0hc=",
  key_av_85 = "JJ+XZQ2TQMKmE6sq/51T7siIc9C2XUtIvQ1DTZRJ4Fs=.hC1D9Re3Lj/sLP6FoJscr7dr7T5c3WzHQHt8TJECFRo=",
  key_av_86 = "/nJlXkvRTTm8x7B5RUf59ciIc9C2XUtIvQ1DTZRJ4Fs=.nKwHeHPzwdjRzfRcYxcXdX71n+aLLqqaf8CuSqieTqE=",
  key_av_87 = "4IRbyevqTWaZ8yNj5Clbk8iIc9C2XUtIvQ1DTZRJ4Fs=.+VXNZ4s9CB2QYIZ9Xy27d97T8yc1UhcbxPu2CiZet5k=",
  key_av_88 = "APpolTgLTgKmGGc4gbD+lciIc9C2XUtIvQ1DTZRJ4Fs=.9nG2n4xQlJOyKN0tvPZc1qbMEE9KZkFpIozUfBp84nM=",
  key_av_89 = "uKAb1rcISsSiHk+Z78fVdciIc9C2XUtIvQ1DTZRJ4Fs=.Fij9LXhNv7X80cb3wbHx5KnzxtSQSZ5UrM6AnyY9R9g=",
  key_av_90 = "y68lZq9kTz2yA0cP7Y1SwciIc9C2XUtIvQ1DTZRJ4Fs=.PH0+f/8jnnhd2GZlYrKxfcTw4l/uTeeYmYHFw0txWTM=",
  key_av_91 = "VW8hYL7KR2i5PbdCBAkxEciIc9C2XUtIvQ1DTZRJ4Fs=.Zoqm+65FdRFMcdIIW4OQh1kdV1iLK6zz6VjQ8CfAkV0=",
  key_av_92 = "K77KyBvoTRKpIby5WCaElMiIc9C2XUtIvQ1DTZRJ4Fs=.Mc2aDCP9jE2pJcXIjFK9sN1EdOYqtgh87TVIkWIJad0=",
  key_av_93 = "11sn4odmTH204eyp6urd0siIc9C2XUtIvQ1DTZRJ4Fs=.4TSmHJcjh+ak8EC82Dv7pdNrbr6HeoXXF3B+i+Wu6vs=",
  key_av_94 = "1pyF7h4UStOTcWpq/DfSssiIc9C2XUtIvQ1DTZRJ4Fs=.MbRj7xGnO+A4hgZ6aUDOdjcv43jegwiXXZf1oDu/0kA=",
  key_av_95 = "8C5AYNxtSK+ieTN/qUedgMiIc9C2XUtIvQ1DTZRJ4Fs=.UoXfKEnskAmj0/nMlUzxuyNYY8VjkRkNLkJKJbO9MfA=",
  key_av_96 = "S6fv8I2XSz2txO3S0UzZT8iIc9C2XUtIvQ1DTZRJ4Fs=.1eTxN8FQoq00mnPW9UUjKUtm91FQpbfkqQLaywycaXw=",
  key_av_97 = "HQ4oOMeFSC24jECeHbU5kMiIc9C2XUtIvQ1DTZRJ4Fs=.lSBG0WvkWU/ZrXVaZYb9a8gpHoyyeKDFTIvGVUcXYSg=",
  key_av_98 = "Rm1qqdllTDuu13ZdWDu868iIc9C2XUtIvQ1DTZRJ4Fs=.K/aaMh07w8+gUarDwC5/LTj6kzFMAkvUAyEDPlsuvk4=",
  key_av_99 = "AfgLvfzNTqK8bp1aRq0H38iIc9C2XUtIvQ1DTZRJ4Fs=.YdSNI+Z9318H803J10EiGMfyBIg49IHT5OqmgsT3aDk=",
  key_av_100 = "Sd8cAA9uTZKfO9ovqPs3ZsiIc9C2XUtIvQ1DTZRJ4Fs=.cv6JI6m4Vww3421BRqs3BOsyFygIe7eujUuMzvzjvw0=",
}

export class WearableEnum {
  static AVATARS: WearableEnumInst[] = []

  constructor() {
    var i = 0;
    var addressContract = ""
    for (const key in AVATAR_NAME) {
      if (i < 50) {
        //Collection1 - 1 to 50
        addressContract = "0xd05723401566e9d9b7a728bd4dbe07584cf8ac76"
      } else {
        //Collection2 - 51 to 100
        addressContract = "0x48832c67f3ef9f1c3690572532ef34ebdecb2aa0"
      }
      const itemId = i.toString();
      const urn = `urn:decentraland:matic:collections-v2:${addressContract}:${itemId}`;
      WearableEnum.AVATARS.push(new WearableEnumInst({
        name: AVATAR_NAME[key],
        address: addressContract,
        itemId,
        urn,
      }));
      i++;
    }
    //console.log("AVATARS INFO -> ", WearableEnum.AVATARS)
  }

  static getAvatarByIndex(index: number): WearableEnumInst | undefined {
    return WearableEnum.AVATARS[index];
  }
}
new WearableEnum()





export const ClaimConfig = {
  rewardsServer: 'https://rewards.decentraland.org',
  campaign: generateCampaigns(100),
}

function generateCampaigns(numCampaigns: number) {
  const campaigns: { [key: string]: any } = {}
  for (let i = 1; i <= numCampaigns; i++) {
    const campaignKey = `av_${i}`
    campaigns[campaignKey] = {
      campaign: "c88873d0-b65d-4b48-bd0d-434d9449e05b",
      campaignKeys: {
        mapTShirt: KEY_AVATAR_DISPENSER[('key_av_' + i)],
      },
      wearableUrnsToCheck: toStringURLArray([
        WearableEnum.getAvatarByIndex(i - 1)
      ])
    }
  }
  return campaigns
}

function toStringURLArray(wearableInstArr: WearableEnumInst[]): string[] {
  const urnArr: string[] = []
  for (const p in wearableInstArr) {
    const urn = wearableInstArr[p].urn
    if (urn !== undefined) {
      urnArr.push(urn)
    }
  }
  return urnArr
}

// OLD WearableEnum and ClaimConfig
// export class WearableEnum {
//     static ROCKET_PACK = new WearableEnumInst({ name: "Rocket Pack", address: "0x94f128b1f2bd7fdc786b005652569267cd9268fa", itemId: "0", urn: 'urn:decentraland:matic:collections-v2:0x94f128b1f2bd7fdc786b005652569267cd9268fa:0' })
// }

// export const ClaimConfig = {
//   rewardsServer: 'https://rewards.decentraland.org',
//   campaign: {
//     blk_roket:{
//       //https://rewards.decentraland.org/campaign/?id=00453f70-d663-42bb-9c41-65f0c9c6ed37
//       campaign:"49ef210f-0060-40cd-8770-c84e476763dc",
//       campaignKeys: {
//         mapTShirt: "eyJpZCI6IjczZmI5ZTUzLWMwMDktNGMwOS1iM2I1LTcxMWZjN2FhNGI5ZSIsImNhbXBhaWduX2lkIjoiNDllZjIxMGYtMDA2MC00MGNkLTg3NzAtYzg0ZTQ3Njc2M2RjIn0=.2HR2XoqyROz5oMKMEFN04MWVj3l1LRn5lz/6KJ52cgA=",
//       },
//       wearableUrnsToCheck: toStringURLArray([
//         WearableEnum.ROCKET_PACK
//       ])
//     },
//   },
// }