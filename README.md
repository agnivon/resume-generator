# Resume Generator

An AI-powered, professional resume builder built with Next.js, TypeScript, and Tailwind CSS. Create ATS-optimized resumes in minutes with automated summaries and professional templates.

## 🚀 Features

- **AI-Powered Summaries**: Generate professional, metric-driven resume summaries using GPT-3.5 with a single click.
- **Professional Templates**: Choose from multiple expert-designed, field-tested templates that adhere to industry standards.
- **ATS Optimization**: Resume formats and designs are optimized to be easily parsed by Applicant Tracking Systems.
- **Interactive Builder**: A seamless, section-by-section builder with drag-and-drop support for reordering experiences, projects, and more.
- **Live Preview**: Real-time preview of your resume with customizable fonts, paper sizes, and colors.
- **Markdown Support**: Use Markdown in your professional summary and descriptions for rich formatting.
- **Save as PDF**: High-quality PDF export functionality for your finished resume.
- **Secure Authentication**: Robust authentication system supporting Google, GitHub, and Facebook logins.
- **Personalized Tagging**: Organize your resumes with a flexible tagging system.

## 🛠️ Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), [Flowbite](https://flowbite.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) with [Prisma ORM](https://www.prisma.io/)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **AI**: [OpenAI GPT-3.5 Turbo](https://openai.com/)
- **State Management**: [Redux Toolkit](https://redux-toolkit.js.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **PDF Generation**: [jsPDF](https://github.com/parallax/jsPDF), [Kendo Drawing](https://www.telerik.com/kendo-react-ui/components/drawing/)
- **Forms**: [Formik](https://formik.org/) & [Yup](https://github.com/jquense/yup)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or later)
- Yarn or NPM
- A MongoDB instance (local or Atlas)
- OpenAI API Key (for AI features)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/agnivon/resume-generator.git
   cd resume-generator
   ```

2. **Install dependencies:**
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file in the root directory and add the following:
   ```env
   DATABASE_URL="mongodb+srv://..."
   NEXTAUTH_SECRET="your-secret"
   NEXTAUTH_URL="http://localhost:3000"

   GOOGLE_ID="your-google-client-id"
   GOOGLE_SECRET="your-google-client-secret"

   GITHUB_ID="your-github-client-id"
   GITHUB_SECRET="your-github-client-secret"

   FACEBOOK_ID="your-facebook-client-id"
   FACEBOOK_SECRET="your-facebook-client-secret"

   OPENAI_API_KEY="your-openai-api-key"
   ```

4. **Initialize the database:**
   ```bash
   yarn db-push
   yarn db-generate
   ```

### Running the Project

```bash
yarn dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📁 Project Structure

- `src/app`: Next.js App Router pages and API routes.
- `src/components`: Reusable UI components (Global and Feature-specific).
- `src/redux`: Redux slices and store configuration.
- `src/hooks`: Custom React hooks for business logic and UI state.
- `src/utils`: Helper functions and utility classes.
- `src/constants`: Configuration constants, prompts, and static data.
- `src/types`: TypeScript interfaces and types.
- `prisma/`: Prisma schema and database configuration.
- `public/`: Static assets including fonts and images.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
Built with ❤️ by Agnivo Neogi
