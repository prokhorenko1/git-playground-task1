# Lesson 1 — let Claude read your repo

## My prediction

Added getOne(id) method

## Claude's summary

Everything is uncommitted. `feat/claude-diff` has no commits beyond `main` yet. You've changed three things.

**`lib/store.js`**
- **New `getOne(id)` function:** it loads the store and returns the note with a matching `id`.
- **Variable rename:** `data` is now `info` everywhere, in `save`, `add` and `remove`. It doesn't change behaviour, but it makes up most of the diff.

**`lib/config.js`**
- **New setting `MAX_NOTE_LENGTH: 1000`.**

**`notes.md`** (new, untracked)
- It contains one line, "Added getOne(id) method", with no newline at the end.

**What looks unintended**

1. **`getOne` can't be used yet.** It isn't exported: `lib/store.js:44` still reads `module.exports = { all, add, remove };`. Nothing calls it, and `notes.js` has no command that would use it.
2. **`MAX_NOTE_LENGTH` isn't applied anywhere.** Nothing reads it, and `store.add` and the `add` command in `notes.js` still accept text of any length.
3. **The `data` → `info` rename is unrelated to the new feature.** It makes the diff look much bigger than the actual change.
4. **`notes.md` looks like a scratch file.** It isn't ignored by git, so a `git add .` could commit it by accident.

**One thing to watch:** `getOne` uses strict `===` to compare IDs, and the IDs stored in the file are numbers. Whatever calls it later needs to convert the ID with `Number(...)` first, the way the `delete` command does in `notes.js:31`.

## Did it catch the stray change?

Yes. My prediction only mentioned `getOne`, but Claude also found the `MAX_NOTE_LENGTH` setting in `lib/config.js` and the `data` → `info` rename in `lib/store.js`, and pointed out that the new setting isn't used anywhere.
