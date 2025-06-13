# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Japanese Call of Cthulhu (CoC) 6th edition character sheet web application. The site allows users to create and display character sheets for tabletop RPG sessions.

## Architecture

### File Structure
- **index.html**: Character creation form with input fields for stats, skills, and character details
- **character.html**: Character sheet display template showing completed character data
- **character_bk.html**: Backup/alternative version of character display
- **base/parts-coc-seet.html**: Reusable character sheet component template
- **assets/css/**: Main stylesheets (SCSS source and compiled CSS)
- **base/**: Base templates and component-specific styles

### Key Components

**Character Input Form (index.html)**:
- Form-based character creation with ability scores (STR, CON, POW, DEX, etc.)
- Dynamic calculation system using `updateTotal()` JavaScript functions
- Dropdown selects for base ability scores (3-18 range)
- Age modifiers and other stat adjustments
- Submit functionality to generate character sheet

**Character Display (character.html)**:
- Read-only display of completed character data
- Uses span elements with IDs to show calculated values
- Responsive layout for different screen sizes
- Accordion-style sections for organizing character information

**Styling System**:
- SCSS-based styling with separate files for main site and base components
- Responsive design with breakpoints at 768px and 1030px
- Japanese-friendly fonts (Kosugi, Varela Round)
- Character sheet styling optimized for RPG data display

### PHP Integration
- Some templates contain PHP code for dynamic content (`<?php the_field('txt-color'); ?>`)
- Appears to integrate with a CMS or custom PHP backend

## Development Commands

### CSS Compilation
Since this project uses SCSS, compile stylesheets with:
```bash
# For main styles
sass assets/css/style.scss assets/css/style.css

# For base component styles  
sass base/style.scss base/style.css
```

### Local Development
Open HTML files directly in browser or serve with a local server:
```bash
# Simple HTTP server
python -m http.server 8000
# or
npx http-server
```

## Technical Notes

- No build system or package.json detected - this is a traditional HTML/CSS/JS project
- Uses Font Awesome 5.12.1 for icons
- Character data calculations handled via inline JavaScript
- Mobile-first responsive design with `.sp-only` and `.pc-only` utility classes
- Japanese language content throughout

## Common Tasks

- **Adding new ability scores**: Update both input form selects and display spans with consistent naming
- **Modifying calculations**: Look for `updateTotal()` functions in HTML script tags
- **Styling changes**: Edit SCSS files and recompile to CSS
- **Character sheet layout**: Modify `.chara-seet` component classes in stylesheets