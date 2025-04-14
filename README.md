# Q-Sports

**Q-Sports** is a responsive, full-featured sports management platform built with React. It offers seamless event and club management for players, club admins, and super admins — with booking, approval flows, and smart UI/UX integrations.

## 🔧 Tech Stack

- **React** (v18+)
- **React Redux** & **Redux Thunk**
- **React Router DOM**
- **Framer Motion**
- **Swiper JS**
- **React Player**, **React Image Lightbox**
- **Reactstrap** for UI components
- **Axios** for API requests
- **SCSS** for styling
- **Remix Icons**, **React Icons**

## 🌐 API Proxy

The project uses a proxy for backend API requests:

https://api.rncmediahub.com


## Features

Club & player registration and login

Role-based dashboards (Super Admin, Club Admin, Player)

Event listing, creation, booking & approval workflows

Mobile responsive UI

Video content via ReactPlayer

Lightbox gallery for images

Dynamic filtering, sorting, and search

SEO-ready component architecture


## Installation & Setup

1. Clone the Repository

https://github.com/sinan-rnc/QSports
cd q-sports

2. Install dependencies

npm install

3. Start the development server

npm start

This runs the app on http://localhost:3011.

zip -r Q-Sports-React-Website.zip Q-Sports-React-Website
## Folder Structure

Q-Sports-React-Website/
├── public/            # Static assets
├── src/               # App logic, components, pages, redux, styles
│   └── Actions/
│       └── clubApprovalActions.js
│       └── clubsAndBarsActions.js
│       └── eventsActions.js
│       └── profileActions.js
│       └── quotesAction.js
│       └── usersAction.js
│   └── Apis/
│       └── api.js
│   └── Assets/
│       └── Banner/
│       └── Common/
│       └── Highlights/
│       └── Logo/
│   └── Components/
│       └── AboutUs/
│           └── AboutUsHero/
│               └── AboutUsHero.jsx
│               └── AboutUsHero.scss
│           └── Testimonials/
│               └── Testimonials.jsx
│               └── Testimonials.scss
│       └── Account/
│           └── Admin/
│               └── AdminDashboardHome/
│                   └── AdminDashboardHome.jsx
│                   └── AdminDashboardHome.scss
│               └── AdminDashboardMenu/
│                   └── AdminBarDashboard/
│                       └── AdminBarDashboard.jsx
│                       └── AdminBarDashboard.scss
│                   └── AdminClubBarApprovalDashboard/
│                       └── AdminClubBarApprovalDashboard.jsx
│                       └── AdminClubBarApprovalDashboard.scss
│                   └── AdminClubDashboard/
│                       └── AdminClubDashboard.jsx
│                       └── AdminClubDashboard.scss
│                   └── AdminEventDashboard/
│                       └── AdminEventDashboard.jsx
│                       └── AdminEventDashboard.scss
│                   └── AdminQuotesDashboard/
│                       └── AdminQuotesDashboard.jsx
│                       └── AdminQuotesDashboard.scss
│                   └── AdminUserDashboard/
│                       └── AdminUserDashboard.jsx
│                       └── AdminUserDashboard.scss
│           └── ClubBar/
│               └── ClubBarDashboard/
│                   └── ClubBarDashboard.jsx
│                   └── ClubBarDashboard.scss
│               └── ClubBarProfile/
│                   └── ClubBarProfile.jsx
│                   └── ClubBarProfile.scss
│               └── ClubBarRegsiter/
│                   └── ClubBarRegsiter.jsx
│                   └── ClubBarRegsiter.scss
│               └── ClubEventDashboard/
│                   └── ClubEventDashboard.jsx
│                   └── ClubEventDashboard.scss
│           └── DashboardHome/
│               └── DashboardHome.jsx
│               └── DashboardHome.scss
│           └── Login/
│               └── Login.jsx
│               └── Login.scss
│           └── Password/
│               └── Password.jsx
│               └── Password.scss
│           └── User/
│               └── UserDashboard/
│                   └── UserDashboard.jsx
│                   └── UserDashboard.scss
│               └── UserEventDashboard/
│                   └── UserEventDashboard.jsx
│                   └── UserEventDashboard.scss
│               └── UserProfile/
│                   └── UserProfile.jsx
│                   └── UserProfile.scss
│               └── UserRegsiter/
│                   └── UserRegsiter.jsx
│                   └── UserRegsiter.scss
│       └── Common/
│           └── Bars/
│               └── Bars.jsx
│               └── Bars.scss
│           └── Clubs/
│               └── Clubs.jsx
│               └── Clubs.scss
│           └── ContactUs/
│               └── ContactUs.jsx
│               └── ContactUs.scss
│           └── DailyQuotes/
│               └── DailyQuotes.jsx
│               └── DailyQuotes.scss
│           └── DetailPages/
│               └── ClubBarDetailPage/
│                   └── ClubBarDetailPage.jsx
│                   └── ClubBarDetailPage.scss
│               └── EventDetailPage/
│                   └── EventDetailPage.jsx
│                   └── EventDetailPage.scss
│           └── Event/
│               └── Event.jsx
│               └── Event.scss
│           └── FeaturedClubsBars/
│               └── FeaturedClubsBars.jsx
│               └── FeaturedClubsBars.scss
│           └── FeaturedEvents/
│               └── FeaturedEvents.jsx
│               └── FeaturedEvents.scss
│           └── Footer/
│               └── Footer.jsx
│               └── Footer.scss
│           └── Header/
│               └── Header.jsx
│               └── Header.scss
│           └── Helmet/
│               └── Helmet.jsx
│               └── Helmet.scss
│           └── Highlights/
│               └── Highlights.jsx
│               └── Highlights.scss
│           └── PageNotFound/
│               └── PageNotFound.jsx
│               └── PageNotFound.scss
│           └── RecentBars/
│               └── RecentBars.jsx
│               └── RecentBars.scss
│           └── RecentClubs/
│               └── RecentClubs.jsx
│               └── RecentClubs.scss
│           └── Stats/
│               └── Stats.jsx
│               └── Stats.scss
│           └── UnAuthorized/
│               └── UnAuthorized.jsx
│               └── UnAuthorized.scss
│           └── UpcomingEvents/
│               └── UpcomingEvents.jsx
│               └── UpcomingEvents.scss
│       └── Home/
│           └── About/
│               └── About.jsx
│               └── About.scss
│           └── HomeHero/
│               └── HomeHero.jsx
│               └── HomeHero.scss
│   └── Context/
│       └── AuthContext.js
│   └── DataSet/
│       └── barClubTournaments.js
│       └── barsAndClubs.js
│       └── dubaiCities.js
│       └── tournaments.js
│   └── General/
│       └── PrivateRoutes.js
│   └── Pages/
│       └── AboutUsPage.jsx
│       └── AccountPage.jsx
│       └── AdminAccountPage.jsx
│       └── BarsPage.jsx
│       └── ClubsPage.jsx
│       └── ContactUsPage.jsx
│       └── EventsPage.jsx
│       └── HomePage.jsx
│   └── Reducers/
│       └── clubApprovalListReducers.js
│       └── clubsAndBarsReducers.js
│       └── eventReducers.js
│       └── profileReducers.js
│       └── quotesReducers.js
│       └── userReducers.js
│   └── Store/
│       └── configureStore.js
│   └── App.js
│   └── index.js
│   └── index.scss
├── .gitignore
├── package-lock.json
├── package.json
├── README.md


## Scripts

Script             Description

npm start	       Start the development server
npm run build	   Create optimized production build
npm test	       Run test suite


## Responsive

Fully responsive across all modern devices — built with mobile-first principles and optimized SCSS layouting.


## Contact
For inquiries or collaboration:

Rabbit and Carrot LLC
info@rabbitandcarrot.com
+971 542226464


Built with ❤️ by Mohamed Sinan | Rabbit and Carrot LLC