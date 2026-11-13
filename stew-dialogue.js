// =============================================================
//  STEW'S BRAIN 🐮💙
//  Everything Stew says lives in this file. Edit freely!
//  index.html loads this file, then asks STEW.answer(question).
// =============================================================

window.STEW = {

  // Shown in the thought bubble while Stew ponders (rotates every ~0.9s).
  // Keep these short (under ~18 characters) so they fit on phones.
  ponders: [
    'hmm…', 'chewing on it…', 'asking the grass…', 'thinking hard…',
    'asking other cows…', 'ruminating…', 'mooditating…', 'checking the barn…',
  ],

  // RULES — checked first, top to bottom. The first rule that matches wins.
  //   when: words/phrases to look for anywhere in the question (case doesn't matter).
  //         Whole words only, so 'hi' matches "hi stew" but not "this".
  //         You can also use a regex, like /\bmoo+\b/i.
  //   say:  Stew picks one of these at random.
  rules: [
    {
      when: ['who are you', 'what are you', 'your name'],
      say:  ['Moo! I am Stew. A cow. Fluffy, blue-spotted, wise.'],
    },
    {
      when: ['love me', 'love you', 'like me', 'like you'],
      say:  ['Moo! Stew loves you very much. 💙', 'Mooo. Of course. Big cow hug.'],
    },
    {
      when: ['hi', 'hello', 'hey', 'howdy'],
      say:  ['Moo! Hello friend!', 'Moooo! Hi hi!'],
    },
    {
      when: ['hungry', 'food', 'eat', 'dinner', 'lunch', 'breakfast', 'snack'],
      say:  ['Moo. Grass. The answer is grass.', 'Moo! Eat something tasty. Stew recommends clover.'],
    },
    {
      when: ['cute', 'adorable', 'fluffy', 'sweet'],
      say:  ['Moo! *blushes in cow*', 'Mooo. Stew knows. 💙'],
    },
    {
      when: ['meaning of life'],
      say:  ['Moo. 42 blades of grass.'],
    },
    {
      when: [/\bmoo+\b/i],   // moo, mooo, moooooo…
      say:  ['MOO! MOOOO MOO.', 'Moo moo moo. (Stew agrees.)'],
    },
  ],

  // YES/NO QUESTIONS — if no rule matched and the question STARTS with one of
  // these words, Stew rolls the dice using the chances below (they should add to 100).
  yesNo: {
    startsWith: ['is', 'are', 'am', 'will', 'would', 'should', 'can', 'could', 'do', 'does',
                 'did', 'have', 'has', 'was', 'were', 'shall', 'may', 'might'],
    chances: { yes: 45, maybe: 30, no: 25 },
    yes: [
      'Moo! Yes. Absolutely yes.',
      'Mooo-hoo! Definitely.',
      'The grass says yes. Moo.',
      'Moo. Without a doubt.',
      'Yes! Stew is certain. Moooo.',
      'All signs point to moo. (That means yes.)',
      'Moo moo! It is udderly certain.',
    ],
    maybe: [
      'Moo? Ask again after snack time.',
      'Hmm. Moo-be.',
      'Stew is not sure. Stew is a cow. Moo.',
      'Too foggy in the field to tell. Moo.',
      'Ask me later. I am chewing. Moo.',
      'Perhaps! Moo-ve forward and see.',
    ],
    no: [
      'Moo… no. Sorry, friend.',
      'Stew says no. Moo.',
      'Mmmoo-nope.',
      'Not a chance. Moo.',
      'The pasture says no. Moo.',
    ],
  },

  // EVERYTHING ELSE — used when nothing above applies.
  general: [
    'Moo. The answer is grass. It is always grass.',
    'Moooo. Take a nap and it will all make sense.',
    'Moo! Be kind, drink water, and eat your greens.',
    'Stew has thought about it. Stew says: moo.',
    'Moo. Follow your heart. And maybe a snack.',
    'Mooo… the answer lies within the barn of your soul.',
    'Moo moo. That is a cow secret.',
    'Moo! You already know the answer, friend.',
    'Moo. Stew believes in you.',
    'Mooooooo. (Stew is very moved by this question.)',
    'Moo. Hugs fix most things.',
    'Moo. Ask a horse. Just kidding. Moo.',
  ],

  // Little words that float up around Stew.
  mooFloaters:  ['moo!', '💙', 'moo', '✨', 'MOO'],   // when Stew answers
  boopFloaters: ['💙', 'boop!'],                    // when you click Stew

  // How long Stew ponders, in milliseconds (random between min and max).
  ponderTime: { min: 1800, max: 3200 },


  // -----------------------------------------------------------
  //  The logic. You normally don't need to touch below here.
  // -----------------------------------------------------------
  pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  },

  matches(question, pattern) {
    if (pattern instanceof RegExp) return pattern.test(question);
    const escaped = pattern.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    return new RegExp('\\b' + escaped + '\\b', 'i').test(question);
  },

  answer(question) {
    const q = question.trim();

    for (const rule of this.rules) {
      if (rule.when.some(p => this.matches(q, p))) return this.pick(rule.say);
    }

    const firstWord = (q.match(/^[a-z']+/i) || [''])[0].toLowerCase();
    if (this.yesNo.startsWith.includes(firstWord)) {
      const { yes, maybe } = this.yesNo.chances;
      const roll = Math.random() * 100;
      if (roll < yes) return this.pick(this.yesNo.yes);
      if (roll < yes + maybe) return this.pick(this.yesNo.maybe);
      return this.pick(this.yesNo.no);
    }

    return this.pick(this.general);
  },
};
