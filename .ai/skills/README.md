# Skills - Executable Workflow Guides

This directory contains step-by-step workflow guides for common tasks when working with the Multilingual One-Page Starter template. Each skill provides detailed instructions, real code examples, validation checklists, and troubleshooting guidance.

## What Are Skills?

**Skills** are executable workflows - think of them as "recipes" for accomplishing specific tasks with the template. Unlike the context files in [`.ai/context/`](../context/) which provide background knowledge (the "manual"), skills give you exact steps to follow.

Each skill includes:
- **Purpose & prerequisites** - What it does and what you need before starting
- **Step-by-step instructions** - Real file paths and code examples from this codebase
- **Validation checklists** - How to verify everything works (build, visual, functional, accessibility)
- **Troubleshooting** - Common issues and how to fix them
- **Related skills & references** - What to do next

## How to Use Skills

### With Claude Code

Claude Code can execute skills automatically or guide you through them interactively:

```bash
# In Claude Code chat
"Follow the add-new-language skill to add French"
"Use the customize-theme skill to change colors to blue"
```

Claude Code reads the skill file and executes each step, validating as it goes.

### With Cline (VS Code Extension)

Reference skills directly in your Cline chat:

```bash
# In Cline chat
"@.ai/skills/create-page-section.md - add a pricing section"
"Follow @.ai/skills/setup-analytics.md for Plausible"
```

Cline will read the skill and guide you through implementation.

### With Cursor

Copy skill content into your chat or reference it directly:

```bash
# In Cursor chat
"@.ai/skills/deploy-site.md - help me deploy to Netlify"
```

Cursor will use the skill as context for helping you complete the task.

### Manual Execution

All skills can be followed manually as step-by-step checklists:

1. Open the skill file in your editor
2. Follow each numbered step
3. Check off validation items as you complete them
4. Reference troubleshooting section if needed

This works even without AI assistance.

## Available Skills

### Project Setup

| Skill | Description | Complexity |
|-------|-------------|------------|
| [setup-fresh-project.md](./setup-fresh-project.md) | Initial setup for a brand new project - the starting point | Medium |

### Language Management

| Skill | Description | Complexity |
|-------|-------------|------------|
| [add-new-language.md](./add-new-language.md) | Add support for a new language (e.g., French, Arabic) | Complex |
| [remove-language.md](./remove-language.md) | Remove an existing language from the site | Medium |
| [replace-language.md](./replace-language.md) | Swap one language for another (e.g., Spanish → French) | Medium |

### Content & Sections

| Skill | Description | Complexity |
|-------|-------------|------------|
| [create-page-section.md](./create-page-section.md) | Add a new section to the homepage | Medium |
| [add-blog-post.md](./add-blog-post.md) | Create a new blog post in any language | Easy |

### Design & Theme

| Skill | Description | Complexity |
|-------|-------------|------------|
| [customize-theme.md](./customize-theme.md) | Change colors, fonts, spacing, or branding | Easy |

### Infrastructure

| Skill | Description | Complexity |
|-------|-------------|------------|
| [setup-analytics.md](./setup-analytics.md) | Configure Google Analytics 4, Plausible, or Fathom | Easy |
| [optimize-images.md](./optimize-images.md) | Optimize images for web performance | Easy |
| [deploy-site.md](./deploy-site.md) | Deploy to Netlify, Vercel, GitHub Pages, or traditional hosting | Medium |

## The 4 Config Locations for Language Changes

⚠️ **Critical for language management skills:** When adding, removing, or replacing languages, you MUST update all 4 locations:

1. **`src/assets/js/translations/[code].js`** - Translation strings file
2. **`src/assets/js/translations/index.js`** - Translation registry (import + export)
3. **`src/_data/site.js`** - `multilingual.languages` array
4. **`src/assets/js/language.js`** - `CONFIG.languages` array (lines 12-24)

Missing any of these will cause language switching to break. The language skills include detailed checklists for all 4 locations.

## Skill Structure

All skills follow a consistent format:

```markdown
# Skill: [Name]
> One-sentence summary

## Purpose
What this skill accomplishes and why you'd use it

## Prerequisites
- [ ] Checkbox list of what you need before starting

## Input
| Parameter | Example | Required |
|-----------|---------|----------|
| Language code | fr | Yes |
| ... | ... | ... |

## Steps

### Step 1: [Action]
**File:** `src/path/to/file.ext`

Explanation...

**Code:**
```language
actual code from this codebase
```

### Step 2: [Next action]
...

## Validation Checklist

### Build & Lint
- [ ] `npm run build` succeeds
- [ ] `npm run check` shows no errors

### Visual Testing
- [ ] Light mode displays correctly
- [ ] Dark mode displays correctly
- [ ] Mobile (375px) works
- [ ] Tablet (768px) works
- [ ] Desktop (1200px+) works

### Functional Testing
- [ ] Skill-specific checks

### Accessibility
- [ ] Keyboard navigation works
- [ ] Screen reader announcements correct
- [ ] Focus indicators visible
- [ ] ARIA labels present

### RTL (if applicable)
- [ ] RTL language displays correctly
- [ ] Layout mirrors properly

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|--------------|-----|
| Issue description | Why it happens | How to fix it |

## Related Skills
- Link to related workflow
- Link to follow-up task

## Reference
- Link to relevant context file section
- Link to external docs if needed
```

## Creating Custom Skills

You can create your own skills for project-specific workflows:

### 1. Copy the Template

Create a new file in `.ai/skills/` with a descriptive kebab-case name:

```bash
touch .ai/skills/my-custom-workflow.md
```

### 2. Use the Structure Above

Follow the consistent format:
- Start with purpose and prerequisites
- Provide real file paths and code examples
- Include comprehensive validation checklist
- Add troubleshooting for common issues
- Link to related skills and references

### 3. Test Your Skill

Execute it manually first to verify:
- Steps are clear and complete
- Code examples are accurate
- Validation catches issues
- Troubleshooting covers common problems

### 4. Share (Optional)

If your skill would benefit other template users, consider contributing it back to the project.

## Best Practices

### For Skill Users:

✅ **Do:**
- Read the entire skill before starting
- Check prerequisites first
- Follow steps in order
- Complete full validation checklist
- Reference troubleshooting if stuck

❌ **Don't:**
- Skip validation steps
- Modify code without understanding it
- Ignore build errors
- Skip accessibility testing
- Forget to test RTL if adding content

### For Skill Creators:

✅ **Do:**
- Use real examples from the actual codebase
- Include file paths for every code change
- Provide comprehensive validation
- Document known issues
- Link to related skills

❌ **Don't:**
- Use generic placeholder code
- Skip troubleshooting section
- Forget cross-references
- Assume prior knowledge
- Skip testing the skill yourself

## Skill Dependencies

Some skills reference or build on others:

```
setup-fresh-project
├─→ add-new-language (if adding beyond default 3)
├─→ customize-theme
└─→ setup-analytics

create-page-section
├─→ customize-theme (for styling)
└─→ add-new-language (for translations)

deploy-site
├─→ optimize-images (recommended first)
└─→ setup-analytics (should be configured)

replace-language
├─→ remove-language (similar process)
└─→ add-new-language (similar process)
```

## Quick Reference: Common Tasks

| I want to... | Use this skill | Then... |
|--------------|----------------|---------|
| Start a new project | setup-fresh-project | Customize theme, add content |
| Add a new language | add-new-language | Add blog posts in that language |
| Change brand colors | customize-theme | Test in light/dark mode |
| Add homepage section | create-page-section | Add translations, test responsive |
| Write a blog post | add-blog-post | Test in all languages |
| Track visitors | setup-analytics | Verify in provider dashboard |
| Go live | deploy-site | Monitor analytics, Lighthouse |

## Validation Standards

All skills enforce these quality standards:

### Build Requirements
- ✅ `npm run build` must succeed
- ✅ `npm run check` (Biome) must pass
- ✅ No console errors in browser

### Visual Requirements
- ✅ Light mode functional
- ✅ Dark mode functional
- ✅ Responsive (mobile, tablet, desktop)

### Accessibility Requirements
- ✅ Keyboard navigation works
- ✅ Screen reader compatible
- ✅ WCAG 2.1 AA contrast ratios
- ✅ Focus indicators visible
- ✅ ARIA labels present where needed

### RTL Requirements (when applicable)
- ✅ RTL languages display correctly
- ✅ Layout mirrors appropriately
- ✅ Text alignment correct

These standards ensure professional quality across all customizations.

## Getting Help

### Skill Execution Issues

If a skill doesn't work as expected:

1. **Check prerequisites** - Did you complete all required steps first?
2. **Review troubleshooting** - Is your issue listed?
3. **Validate your starting point** - Run build/check before starting
4. **Check file paths** - Are they correct for your project structure?
5. **Review related context** - Read the referenced context files

### Understanding the Template

Skills focus on "how to do X." For deeper understanding:

- **Architecture:** Read [`.ai/context/architecture.md`](../context/architecture.md)
- **Patterns:** Read [`.ai/context/patterns.md`](../context/patterns.md)
- **Customization:** Read [`.ai/context/customization-guide.md`](../context/customization-guide.md)
- **Project overview:** Read [`.ai/context/project-overview.md`](../context/project-overview.md)

### AI Assistant Issues

If your AI assistant isn't following skills correctly:

- **Explicitly reference:** "@.ai/skills/add-new-language.md"
- **Copy content:** Paste the skill content directly into chat
- **Execute manually:** Follow the skill as a checklist yourself
- **Check AI tool docs:** Learn how your tool handles context files

## Next Steps

1. **If starting fresh:** Begin with [setup-fresh-project.md](./setup-fresh-project.md)
2. **If customizing:** Start with [customize-theme.md](./customize-theme.md)
3. **If adding content:** Use [create-page-section.md](./create-page-section.md) or [add-blog-post.md](./add-blog-post.md)
4. **If deploying:** Follow [deploy-site.md](./deploy-site.md)

Browse the skills list above to find what you need, or ask your AI assistant to recommend a skill for your task.

---

**Template Version:** 1.0.0
**Skills Version:** 1.0.0
**Last Updated:** 2026-01-30
