# AI-Assisted Development Features

This template includes comprehensive AI development features designed to work with multiple AI coding assistants including **Claude Code**, **Cline**, **Cursor**, and **GitHub Copilot**.

## What's Included

This `.ai/` directory provides everything AI assistants need to understand your project and help you work more efficiently:

### 1. Context Files (Pre-filled Technical Knowledge)

Located in [`.ai/context/`](./context/), these files contain detailed technical documentation about the template:

- **[project-overview.md](./context/project-overview.md)** - What this template is, its features, and placeholder sections for your project details
- **[architecture.md](./context/architecture.md)** - Complete technical stack, directory structure, build process, and constraints
- **[patterns.md](./context/patterns.md)** - HTML, SCSS, JavaScript, and accessibility coding patterns with real examples
- **[customization-guide.md](./context/customization-guide.md)** - Step-by-step guides for common customizations

These files are **pre-filled** with accurate information about the template's architecture and patterns. User-specific sections have clear placeholder markers for you to fill in.

### 2. Skills (Executable Workflows)

Located in [`.ai/skills/`](./skills/), these are step-by-step workflow guides for common tasks. Each skill includes real code examples, validation checklists, and troubleshooting guidance:

**Project Setup:**
- [setup-fresh-project.md](./skills/setup-fresh-project.md) - Initial project setup (start here!)

**Language Management:**
- [add-new-language.md](./skills/add-new-language.md) - Add support for a new language
- [remove-language.md](./skills/remove-language.md) - Remove an existing language
- [replace-language.md](./skills/replace-language.md) - Swap one language for another

**Content & Sections:**
- [create-page-section.md](./skills/create-page-section.md) - Add homepage sections
- [add-blog-post.md](./skills/add-blog-post.md) - Create blog posts

**Design & Theme:**
- [customize-theme.md](./skills/customize-theme.md) - Change colors, fonts, spacing

**Infrastructure:**
- [setup-analytics.md](./skills/setup-analytics.md) - Configure GA4, Plausible, or Fathom
- [optimize-images.md](./skills/optimize-images.md) - Optimize images for performance
- [deploy-site.md](./skills/deploy-site.md) - Deploy to Netlify, Vercel, or GitHub Pages

See [skills/README.md](./skills/README.md) for detailed usage instructions.

### 3. Example Templates

Located in [`.ai/examples/`](./examples/), these provide templates for your personal development files:

- **session-context-template.md** - Template for tracking your current work session
- **progress-tracking-template.md** - Template for tracking overall project progress

These templates help you maintain context across AI assistant sessions.

## How to Use with Different AI Tools

### Claude Code

Claude Code automatically reads `.clinerules` at the project root, which references all context files in this directory.

**Usage:**
1. Open your project in Claude Code
2. The AI will automatically have access to all context
3. Reference skills by saying "use the add-new-language skill" or similar
4. Context files are always available for the AI to reference

### Cline (VS Code Extension)

Cline also reads `.clinerules` automatically.

**Usage:**
1. Open project in VS Code with Cline extension
2. Cline reads `.clinerules` on project open
3. You can explicitly reference context files: "@.ai/context/patterns.md"
4. Skills can be copied and pasted into chat for execution

### Cursor

Cursor can be configured to use the context files.

**Usage:**
1. Add `.clinerules` to your Cursor rules
2. Reference context files in chat: "@.ai/context/architecture.md"
3. Copy relevant patterns from context files when needed
4. Use skills as step-by-step guides

### GitHub Copilot

Copilot doesn't read `.clinerules` directly but benefits from having documentation in your workspace.

**Usage:**
1. Open context files while coding for better inline suggestions
2. Copy code patterns from [patterns.md](./context/patterns.md) as reference
3. Use skills as manual checklists
4. Context improves Copilot's suggestions through workspace analysis

## Cross-Tool Compatibility

All files in this directory are written in standard Markdown and follow conventions that work across tools:

- Plain Markdown (no tool-specific syntax)
- Clear section headers for easy navigation
- Code examples in fenced code blocks
- Relative links that work in any editor
- No proprietary formats

## Getting Started

### Step 1: Customize Project Context

Open [`.ai/context/project-overview.md`](./context/project-overview.md) and fill in the placeholder sections:

```markdown
- **Project Name:** [Your Project Name] ← Fill this in
- **Description:** [Your site description] ← Fill this in
- **Target Audience:** [Who is this for?] ← Fill this in
```

Do the same for any placeholder sections in [`architecture.md`](./context/architecture.md) (deployment target, integrations, etc.).

### Step 2: Create Session Files (Optional)

Copy the example templates to create personal tracking files:

```bash
cp .ai/examples/session-context-template.md activeContext.md
cp .ai/examples/progress-tracking-template.md progress.md
```

These files are already in `.gitignore` and won't be committed. They're for your personal use.

### Step 3: Start Using AI Assistance

Your AI assistant now has comprehensive context about:
- The template's architecture and tech stack
- Coding patterns and conventions to follow
- How to customize and extend the template
- What not to break (RTL, dark mode, accessibility)

Ask your AI assistant to reference specific context files or follow specific skills as needed.

## File Organization

```
.ai/
├── README.md (this file)
├── context/
│   ├── project-overview.md      # Template features + your project details
│   ├── architecture.md          # Technical documentation (pre-filled)
│   ├── patterns.md              # Code patterns (pre-filled with examples)
│   └── customization-guide.md   # How-to guides (pre-filled)
├── skills/
│   └── [10 workflow skills]     # Created in Phase 7
└── examples/
    ├── session-context-template.md
    └── progress-tracking-template.md
```

## Context Files are Pre-Filled

**Important:** The context files in this template are NOT placeholders. They contain accurate, detailed technical documentation about the template's actual code, extracted directly from the codebase.

- **What's pre-filled:** Architecture, tech stack, patterns, conventions, examples
- **What you fill in:** Your project name, description, custom requirements, deployment details

This means your AI assistant has deep knowledge of the template from day one.

## Skills vs. Context Files

**Context Files:** Background knowledge, technical documentation, always-available reference

**Skills:** Step-by-step executable workflows for specific tasks (like "add a new language" or "customize colors")

Think of context files as the "manual" and skills as "recipes."

## Best Practices

### Do:
- ✅ Keep context files updated when you make architectural changes
- ✅ Fill in placeholder sections with your project details
- ✅ Reference specific context files when asking AI for help
- ✅ Use skills as checklists even if running manually
- ✅ Create personal session/progress files for complex projects

### Don't:
- ❌ Delete the pre-filled technical documentation
- ❌ Assume AI tools automatically read all files (explicitly reference when needed)
- ❌ Commit your personal activeContext.md or progress.md files (they're gitignored)
- ❌ Skip filling in project-specific placeholder sections

## Maintaining Context Accuracy

When you make significant changes to your project:

1. **Update [`architecture.md`](./context/architecture.md)** if you:
   - Add new build tools or dependencies
   - Change directory structure
   - Add third-party integrations
   - Change deployment targets

2. **Update [`patterns.md`](./context/patterns.md)** if you:
   - Establish new coding conventions
   - Change component patterns
   - Add new accessibility requirements
   - Modify the build pipeline

3. **Update [`customization-guide.md`](./context/customization-guide.md)** if you:
   - Add new customization options
   - Change how theming works
   - Simplify or complicate common tasks

Accurate context = better AI assistance.

## Privacy & Security

All files in `.ai/` are:
- Stored locally in your project
- Under your control
- NOT sent to any external services (unless you explicitly share)
- Safe to commit to your repository (they contain no secrets)

Your `activeContext.md` and `progress.md` files (if created) are gitignored by default to keep your personal notes private.

## Questions or Issues?

If AI assistants aren't using the context files effectively:

1. **Explicitly reference them:** "@.ai/context/patterns.md, show me the button pattern"
2. **Check your AI tool's documentation** for how it handles context files
3. **Copy relevant sections** directly into your conversation
4. **Use skills as manual checklists** if automated execution isn't working

## Next Steps

1. Read through the [context files](./context/) to understand what's documented
2. Fill in placeholder sections in [`project-overview.md`](./context/project-overview.md)
3. Create personal session files from [examples](./examples/) if desired
4. Start building with AI assistance!

---

**Template Version:** 1.0.0
**AI Features Version:** 1.0.0
**Last Updated:** 2026-01-28
