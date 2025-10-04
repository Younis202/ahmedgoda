# Font Setup Instructions

This portfolio uses custom Arabic fonts to create a unique, premium identity. To complete the setup, you need to add the font files to the project.

## Required Font Files

Place the following font files in the `/public/fonts/` directory:

1. **alfont_com_Palestine-Regular.ttf** - Used for main headings (Hero Title, Section Headers)
2. **alfont_com_TheYearofTheCamel-Bold.ttf** - Used for subheadings and captions
3. **alfont_com_TIDO-Bold.ttf** - Used for body text (About, Services, Portfolio descriptions)
4. **alfont_com_ArabicPoetry-Medium.ttf** - Used for quotes, highlights, and testimonials

## Where to Place the Fonts

```
/public
  /fonts
    - alfont_com_Palestine-Regular.ttf
    - alfont_com_TheYearofTheCamel-Bold.ttf
    - alfont_com_TIDO-Bold.ttf
    - alfont_com_ArabicPoetry-Medium.ttf
```

## Font Sources

These fonts can be obtained from:
- [AlfontRoboto](https://www.alfontrabic.com/)
- Or other Arabic font repositories

## After Adding Fonts

Once you've added the font files:
1. The fonts will automatically load via the font-face declarations in `app/[locale]/layout.tsx`
2. They are applied throughout the site using CSS custom properties:
   - `--font-palestine` for headings
   - `--font-camel` for subheadings
   - `--font-tido` for body text
   - `--font-poetry` for quotes

## Fallback Fonts

If the font files are not present, the site will fall back to system fonts:
- Palestine → serif
- Camel → sans-serif
- TIDO → sans-serif
- ArabicPoetry → serif
