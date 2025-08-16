# GitHub Resume Builder

Turn your GitHub profile into a beautiful, shareable, and downloadable resume!

## Features

- 🔍 **Search** for any GitHub username and generate a professional resume
- 🎨 **Choose between Classic and Modern resume designs**
- 📱 **Fully responsive**: Works great on mobile and desktop
- 📋 **Share**: Copy a public link to your generated resume
- 📄 **Download**: Export your resume as a PDF via browser print
- 🛡️ **Error handling**: Friendly messages for invalid usernames or API errors

## Demo

![Demo Screenshot](demo.png) <!-- Add a screenshot here if desired -->

---

## Getting Started

### Prerequisites
- Node.js (v18 or newer recommended)
- Python 3.9+

### Backend Setup (Django)
1. Navigate to the `resume/` directory:
   ```sh
   cd resume
   ```
2. Install Python dependencies:
   ```sh
   pip install -r requirements.txt
   ```
3. Run migrations:
   ```sh
   python manage.py migrate
   ```
4. Start the backend server:
   ```sh
   python manage.py runserver
   ```

### Frontend Setup (Next.js)
1. Navigate to the `dev-resume-frontend/` directory:
   ```sh
   cd dev-resume-frontend
   ```
2. Install Node dependencies:
   ```sh
   npm install
   ```
3. Start the frontend server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000/profile](http://localhost:3000/profile) in your browser.

---

## Usage
- Enter a GitHub username in the search bar.
- Choose your preferred resume design.
- View, share, or download your generated resume.

## Project Structure
```
resume/                # Django backend (API)
  github_service/      # GitHub data fetching services & views
  resume/              # Django project files
  db.sqlite3           # Local database
  manage.py            # Django management script

dev-resume-frontend/   # Next.js frontend
  app/                 # Main app pages & profile UI
  components/          # UI and resume design components
  lib/                 # API helpers
  public/              # Static assets
```

## API Endpoints
- `GET /api/github/user/<username>/resume/` — Fetches all profile data for a user
- `GET /api/github/user/<username>/projects/` — Fetches repositories for a user

## Contributing
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a pull request

## License
[MIT](LICENSE)

---

## Credits
- Built with [Next.js](https://nextjs.org/) and [Django](https://www.djangoproject.com/)
- GitHub API & GraphQL for data
- UI powered by [Tailwind CSS](https://tailwindcss.com/)

---

## Contact
For support or questions, open an issue or contact the maintainer.
