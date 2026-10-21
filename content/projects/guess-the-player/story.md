You think of a football player. The AI asks up to 20 yes/no questions and tries to name them before you collect 850 points. The longer you hold out, the more you score.

**How it was built.** The guessing engine is a language model with a tight contract: ask one question at a time, keep a running belief about the player, and commit to a guess when confident. The front end is a mobile-first Next.js app in Arabic.

**What I learned.** Constraining the model to short, answerable questions mattered more than the prompt's cleverness. Scoring turned a demo into a game people replay.
