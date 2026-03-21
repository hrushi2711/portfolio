# Software Engineer Portfolio Website 💻🚀

An industry-standard, high-performance personal portfolio specifically designed for Software Engineers and Full Stack Developers. This pristine template embraces modern aesthetics heavily featuring **glassmorphism** panels, rigorous **CSS-grid-powered layout synchronization**, and completely dynamic content rendering driven entirely by a declarative `data.json` architecture.

![Portfolio Design](https://img.shields.io/badge/Design-Glassmorphism-blue?style=for-the-badge) ![Theme Engine](https://img.shields.io/badge/Theme-Dark%2FLight_Mode-000000?style=for-the-badge&logo=moon)

> **💡 Pro Tip:** To add a live preview banner of your actual deployment, drop a screenshot named `preview.png` into this folder and use `![Portfolio Preview Showcase](preview.png)` here!

## ✨ Key Features

- **JSON-Driven Core Logic**: No need to endlessly modify raw HTML or JavaScript snippets to fix a typo on your resume! Your professional timeline, skills arrays, and project achievements are deeply integrated safely from a single `data.json` file.
- **Symmetric Grid Architecture**: Complex 2-pane visual column layouts are strictly synchronized using advanced CSS Grid matrices (`.pane-row` / `.pane-col` stacking). You're guaranteed perfect alignment across nested sections regardless of item density.
- **Glassmorphic UI & Dark Theme Dominance**: Utilizing heavily frosted-glass overlays floating atop dynamic, ambient orbital backgrounds, engineered natively in Vanilla CSS.
- **Dark/Light Theme Engine**: A highly integrated mode engine managed via LocalStorage—your visitors' theme preference persists globally across sessions.
- **Interactive Micro-Animations**: Visual skill-loading progress bars, timeline emphasis nodes, and collapsible native UI accordions on specific timeline items.
- **Zero Heavy Dependencies**: Completely framework-free. Built securely with HTML5, CSS3, and standard ES6 Vanilla JavaScript.

## 🚀 Quick Setup & Local Testing

Because this application relies on JavaScript `fetch()` to ingest your profile parameters, it must be run across a proper server environment (not directly executing `file://`).

Fortunately, if you have Python installed, you can launch it instantly:

```bash
# Clone the repository
git clone https://github.com/hrushi2711/portfolio.git
cd portfolio

# Run a local Python test server
python -m http.server 8000
```
Then simply head over to [http://localhost:8000](http://localhost:8000) in your browser!

## ⚙️ How to Update Your Profile

All data variables, contact endpoints, achievements, and educational histories are deeply centralized. Open `data.json` in your favorite IDE and replace the default properties:

1. **`settings`**: Governs universal application triggers (e.g., toggling your circular profile photo URL on or off).
2. **`personal`**: Update your core bio, LinkedIn profile endpoints, GitHub repositories, and specify the file name for your direct PDF resume download.
3. **`experience` & `education`**: Professional progression mapping. Fill in your responsibilities iteratively.
4. **`skills`**: Arrays containing nested technical subsets. Assign an integer value to the `level` parameter (e.g., `85`) and the UI will automatically build the corresponding graphical progress bar dynamically at runtime!

> ⚡ **Live Reload:** You don't need to rebuild, compile, or bundle the project after tweaking your JSON files. Just hit save and refresh your browser!

## 📐 Technology Stack Highlights

- **HTML5**: Heavily semantic node architecture prioritizing high accessibility standards and programmatic DOM-injection loop efficiencies.
- **Vanilla CSS3**: Extensive custom architecture utilizing Global CSS Color Variables, Keyframes, Transitions, and complex flex-stretching breakpoints. Fully Mobile & Tablet responsive right out of the box.
- **Vanilla JavaScript**: Pure Document Object Model manipulation using asynchronous data-fetching (`app.js`) behaving as an ultra-lightweight rendering engine.

---

### *Authored & Maintained by Hrushikesh Tiwari*
