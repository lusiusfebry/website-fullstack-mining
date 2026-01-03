# Rencana Arsitektur Frontend - Website Pertambangan

## Ringkasan Eksekutif

Dokumen ini menyajikan rencana arsitektur frontend yang komprehensif untuk website pertambangan full-stack. Rencana ini didasarkan pada analisis mendalam terhadap 10 file referensi UI/UX yang mencakup berbagai halaman website. Fokus utama adalah menciptakan struktur frontend yang modular, scalable, dan siap untuk integrasi dengan PostgreSQL pada tahap backend.

---

## 1. Analisis Referensi UI/UX

### 1.1 Halaman yang Dianalisis

Berikut adalah daftar halaman referensi yang telah dianalisis:

| No | Halaman | Deskripsi |
|---|---------|-----------|
| 1 | `blog_&_artikel_1` | Halaman blog dengan artikel featured dan grid layout |
| 2 | `blog_&_artikel_2` | Halaman blog dengan filter kategori yang lebih kompleks |
| 3 | `detail_artikel_blog` | Halaman detail artikel dengan konten lengkap |
| 4 | `halaman_beranda_1` | Homepage dengan hero section dan statistik |
| 5 | `halaman_beranda_2` | Homepage alternatif dengan testimoni |
| 6 | `halaman_karir` | Halaman karir dengan lowongan pekerjaan |
| 7 | `hubungi_kami` | Halaman kontak dengan form dan informasi |
| 8 | `layanan_kami` | Halaman layanan dengan kartu layanan |
| 9 | `proyek_kami` | Halaman proyek dengan galeri proyek |
| 10 | `tentang_kami` | Halaman tentang kami dengan informasi perusahaan |

### 1.2 Tema Desain dan Palet Warna

**Palet Warna Utama:**
- **Primary Color**: `#1258e2` (Biru) - Digunakan untuk tombol utama, link aktif, dan elemen penting
- **Background Colors**:
  - Light: `#f6f6f8` - Background utama untuk konten
  - White: `#ffffff` - Background untuk kartu dan section
  - Dark: `#101622` - Background untuk footer dan section gelap
- **Text Colors**:
  - Primary: `#101622` - Teks utama
  - Secondary: `#6b7280` - Teks sekunder dan deskripsi
  - White: `#ffffff` - Teks pada background gelap
- **Accent Colors**:
  - Success: `#10b981` - Untuk status dan notifikasi
  - Warning: `#f59e0b` - Untuk peringatan
  - Error: `#ef4444` - Untuk error

**Gradient yang Digunakan:**
- Hero gradient: `linear-gradient(135deg, #1258e2 0%, #0d3d9e 100%)`
- Overlay gradient: `linear-gradient(to bottom, rgba(16, 22, 34, 0.7), rgba(16, 22, 34, 0.9))`

### 1.3 Tipografi

**Font Families:**
- **Primary Font**: `Public Sans` - Untuk semua heading dan teks display
- **Secondary Font**: `Noto Sans` - Untuk body text (pada beberapa halaman)
- **Fallback**: `sans-serif` - Fallback system font

**Typography Scale:**
- H1: 48px / 56px (Desktop), 36px / 44px (Mobile)
- H2: 36px / 44px (Desktop), 28px / 36px (Mobile)
- H3: 28px / 36px (Desktop), 24px / 32px (Mobile)
- H4: 24px / 32px (Desktop), 20px / 28px (Mobile)
- Body: 16px / 24px
- Small: 14px / 20px

### 1.4 Pola Layout yang Konsisten

**Grid System:**
- Container max-width: 1280px
- Grid columns: 12 columns
- Gutter: 24px (Desktop), 16px (Tablet), 12px (Mobile)

**Layout Patterns:**
1. **Hero Section**: Full-width dengan background image dan gradient overlay
2. **Two-Column Layout**: 8 kolom konten utama + 4 kolom sidebar
3. **Three-Column Grid**: Untuk kartu layanan, fitur, dan testimoni
4. **Four-Column Grid**: Untuk statistik, nilai perusahaan, dan manajemen
5. **Masonry Grid**: Untuk galeri proyek dengan ukuran bervariasi

**Spacing System:**
- Section padding: 80px - 120px (Desktop), 40px - 60px (Mobile)
- Element spacing: 16px, 24px, 32px, 48px, 64px
- Card padding: 24px - 32px

### 1.5 Komponen UI yang Ditemukan

**Komponen Navigasi:**
- Sticky header dengan logo dan navigasi
- Menu dropdown untuk navigasi bertingkat
- Search bar dengan icon
- CTA button di header
- Mobile menu dengan hamburger icon

**Komponen Kartu:**
- **Article Card**: Thumbnail, kategori, judul, deskripsi, tanggal, author
- **Service Card**: Icon, judul, deskripsi, link "Selengkapnya"
- **Project Card**: Image, judul, lokasi, status badge, link
- **Job Card**: Posisi, lokasi, tipe, badge, tombol apply
- **Team Card**: Foto, nama, jabatan, deskripsi singkat
- **Testimonial Card**: Foto, nama, jabatan, testimoni, rating

**Komponen Form:**
- Input fields dengan label dan placeholder
- Textarea untuk pesan
- Select dropdown
- Checkbox dan radio button
- Submit button dengan loading state

**Komponen Lainnya:**
- Breadcrumb navigation
- Pagination component
- Filter chips
- Accordion/FAQ section
- Social media buttons
- Newsletter subscription
- Map placeholder
- Statistics counter
- Progress stepper

### 1.6 Interaktivitas dan Animasi

**Hover Effects:**
- Card shadow transition
- Button color change
- Image scale effect
- Link underline animation

**Transitions:**
- Smooth color transitions (0.3s)
- Transform transitions (0.3s)
- Fade-in animations on scroll

**Responsive Behavior:**
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Stacked layout pada mobile
- Grid layout pada desktop

---

## 2. Pilihan Teknologi Frontend

### 2.1 Framework dan Library

**Framework Utama: Next.js 14 (App Router)**

**Justifikasi:**
- ✅ **Server-Side Rendering (SSR)**: Optimal untuk SEO dan performa awal
- ✅ **Static Site Generation (SSG)**: Untuk halaman statis seperti blog dan proyek
- ✅ **API Routes**: Built-in API untuk integrasi dengan backend
- ✅ **File-based Routing**: Sistem routing yang intuitif dan mudah dipahami
- ✅ **Image Optimization**: Komponen Image otomatis mengoptimalkan gambar
- ✅ **Font Optimization**: Komponen Font untuk loading font yang efisien
- ✅ **TypeScript Support**: Type safety untuk kode yang lebih robust
- ✅ **React Server Components**: Mengurangi bundle size dan meningkatkan performa
- ✅ **Modern Architecture**: App Router dengan layout dan nested routes
- ✅ **Community Support**: Ekosistem yang besar dan aktif

**Alternatif yang Dipertimbangkan:**
- React + Vite: Bagus untuk SPA tapi kurang optimal untuk SEO
- Nuxt.js: Bagus tapi ekosistem Vue lebih kecil dari React
- Gatsby: Bagus untuk SSG tapi kurang fleksibel untuk SSR

### 2.2 Styling

**Tailwind CSS v3.4**

**Justifikasi:**
- ✅ **Utility-First**: Development lebih cepat dengan class utility
- ✅ **Consistent Design**: Desain konsisten dengan konfigurasi terpusat
- ✅ **Responsive Built-in**: Breakpoints dan responsive classes sudah tersedia
- ✅ **Dark Mode Ready**: Support dark mode out-of-the-box
- ✅ **Small Bundle Size**: Hanya meng-include CSS yang digunakan
- ✅ **Customization**: Mudah dikustomisasi dengan tailwind.config.js
- ✅ **JIT Mode**: Compile on-demand untuk performa maksimal
- ✅ **Industry Standard**: Digunakan oleh banyak perusahaan besar
- ✅ **Referensi Compatibility**: Semua file referensi menggunakan Tailwind CSS

**Alternatif yang Dipertimbangkan:**
- CSS Modules: Bagus tapi kurang fleksibel untuk rapid development
- Styled Components: Bagus tapi bundle size lebih besar
- Emotion: Mirip dengan Styled Components

### 2.3 UI Component Library

**shadcn/ui**

**Justifikasi:**
- ✅ **Copy-Paste Components**: Komponen bisa di-copy langsung ke project
- ✅ **Fully Customizable**: Full control over styling dan behavior
- ✅ **Radix UI Primitives**: Accessibility yang excellent
- ✅ **Tailwind Based**: Konsisten dengan styling approach
- ✅ **TypeScript Support**: Type safety untuk semua komponen
- ✅ **No Runtime Dependencies**: Komponen ringan dan performant
- ✅ **Modern Design**: Design system yang contemporary dan clean
- ✅ **Active Development**: Update dan improvement yang konsisten

**Komponen yang Akan Digunakan:**
- Button, Card, Input, Textarea, Select
- Dialog, Dropdown Menu, Accordion
- Tabs, Pagination, Breadcrumb
- Form, Label, Checkbox, Radio
- Separator, Skeleton, Toast
- Navigation Menu, Command

### 2.4 State Management

**React Context API + Hooks**

**Justifikasi:**
- ✅ **Built-in**: Tidak perlu dependency tambahan
- ✅ **Sufficient for This Project**: State management yang dibutuhkan tidak terlalu kompleks
- ✅ **TypeScript Support**: Type safety dengan Context API
- ✅ **Performance**: Tidak ada overhead tambahan
- ✅ **Simple**: Mudah dipahami dan maintain

**State yang Akan Dikelola:**
- Theme (light/dark mode)
- User authentication state
- Cart (jika ada fitur e-commerce)
- Form state
- Filter state

**Alternatif untuk Project yang Lebih Besar:**
- Zustand: Untuk state management yang lebih kompleks
- Redux Toolkit: Untuk aplikasi enterprise dengan state yang sangat kompleks

### 2.5 Form Handling

**React Hook Form + Zod**

**Justifikasi:**
- ✅ **Performance**: Re-render yang minimal
- ✅ **TypeScript Support**: Type inference otomatis
- ✅ **Validation**: Zod untuk schema validation yang powerful
- ✅ **Easy Integration**: Mudah diintegrasikan dengan shadcn/ui
- ✅ **Small Bundle**: Library yang ringan

### 2.6 Data Fetching

**Next.js Built-in Fetch + SWR**

**Justifikasi:**
- ✅ **Server Components**: Fetch data di server untuk performa optimal
- ✅ **SWR**: Untuk client-side data fetching dengan caching dan revalidation
- ✅ **TypeScript**: Type safety untuk data fetching
- ✅ **Error Handling**: Built-in error handling dan loading states

### 2.7 Icons

**Lucide React**

**Justifikasi:**
- ✅ **Tree-shakable**: Hanya meng-include icon yang digunakan
- ✅ **Consistent Style**: Style yang konsisten di semua icon
- ✅ **TypeScript**: Type safety untuk icon props
- ✅ **Customizable**: Mudah dikustomisasi dengan Tailwind
- ✅ **Modern**: Design yang contemporary dan clean

**Alternatif yang Dipertimbangkan:**
- Material Symbols: Digunakan di referensi tapi kurang tree-shakable
- Heroicons: Bagus tapi style kurang konsisten

### 2.8 Animation

**Framer Motion**

**Justifikasi:**
- ✅ **Declarative**: API yang intuitive dan mudah digunakan
- ✅ **Performance**: GPU-accelerated animations
- ✅ **Gestures**: Support untuk gestures (drag, hover, tap)
- ✅ **Variants**: Reusable animation variants
- ✅ **TypeScript**: Type safety untuk animation props

**Use Cases:**
- Page transitions
- Scroll animations
- Hover effects
- Modal animations
- List animations

### 2.9 Database Integration (Backend Phase)

**PostgreSQL + Prisma ORM**

**Justifikasi:**
- ✅ **Relational Database**: Cocok untuk data yang kompleks dengan relasi
- ✅ **ACID Compliance**: Transaksi yang reliable
- ✅ **Type Safety**: Prisma Client dengan TypeScript
- ✅ **Migration**: Built-in migration system
- ✅ **Query Builder**: Query yang type-safe dan efficient
- ✅ **Ecosystem**: Ekosistem yang besar dan mature

**Schema yang Akan Dibuat:**
- Users (authentication, profiles)
- Articles (blog posts)
- Categories (article categories)
- Services (company services)
- Projects (company projects)
- Jobs (career opportunities)
- Testimonials (customer reviews)
- Contact (contact form submissions)
- Settings (site configuration)

### 2.10 Development Tools

**ESLint + Prettier**

**Justifikasi:**
- ✅ **Code Quality**: Linting otomatis untuk kode yang clean
- ✅ **Consistency**: Formatting yang konsisten
- ✅ **TypeScript Support**: Linting untuk TypeScript
- ✅ **Pre-commit Hooks**: Git hooks untuk quality assurance

**Vitest + Testing Library**

**Justifikasi:**
- ✅ **Fast**: Test runner yang cepat
- ✅ **TypeScript**: Native TypeScript support
- ✅ **React Testing Library**: Testing komponen React dengan best practices
- ✅ **Coverage**: Built-in coverage reporting

---

## 3. Struktur Project Frontend

### 3.1 Struktur Folder Utama

```
web-pertambangan/
├── frontend/                          # Frontend application
│   ├── .next/                         # Next.js build output
│   ├── node_modules/                  # Dependencies
│   ├── public/                        # Static assets
│   │   ├── images/                    # Images
│   │   │   ├── hero/                  # Hero section images
│   │   │   ├── services/              # Service images
│   │   │   ├── projects/              # Project images
│   │   │   ├── team/                  # Team photos
│   │   │   ├── blog/                  # Blog images
│   │   │   └── icons/                 # Custom icons
│   │   ├── fonts/                     # Custom fonts
│   │   └── favicon.ico                # Favicon
│   ├── src/
│   │   ├── app/                       # Next.js App Router
│   │   │   ├── (auth)/                # Auth group
│   │   │   │   ├── login/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── register/
│   │   │   │       └── page.tsx
│   │   │   ├── (marketing)/           # Marketing group
│   │   │   │   ├── about/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── blog/
│   │   │   │   │   ├── page.tsx       # Blog listing
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx   # Blog detail
│   │   │   │   ├── careers/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── contact/
│   │   │   │   │   └── page.tsx
│   │   │   │   ├── projects/
│   │   │   │   │   ├── page.tsx       # Projects listing
│   │   │   │   │   └── [slug]/
│   │   │   │   │       └── page.tsx   # Project detail
│   │   │   │   ├── services/
│   │   │   │   │   └── page.tsx
│   │   │   │   └── page.tsx           # Homepage
│   │   │   ├── api/                   # API Routes
│   │   │   │   ├── articles/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── contact/
│   │   │   │   │   └── route.ts
│   │   │   │   ├── jobs/
│   │   │   │   │   └── route.ts
│   │   │   │   └── projects/
│   │   │   │       └── route.ts
│   │   │   ├── layout.tsx             # Root layout
│   │   │   ├── globals.css            # Global styles
│   │   │   ├── not-found.tsx          # 404 page
│   │   │   └── error.tsx              # Error page
│   │   ├── components/                # React components
│   │   │   ├── ui/                    # shadcn/ui components
│   │   │   │   ├── button.tsx
│   │   │   │   ├── card.tsx
│   │   │   │   ├── input.tsx
│   │   │   │   ├── textarea.tsx
│   │   │   │   ├── select.tsx
│   │   │   │   ├── dialog.tsx
│   │   │   │   ├── dropdown-menu.tsx
│   │   │   │   ├── accordion.tsx
│   │   │   │   ├── tabs.tsx
│   │   │   │   ├── pagination.tsx
│   │   │   │   ├── breadcrumb.tsx
│   │   │   │   ├── form.tsx
│   │   │   │   ├── label.tsx
│   │   │   │   ├── checkbox.tsx
│   │   │   │   ├── radio.tsx
│   │   │   │   ├── separator.tsx
│   │   │   │   ├── skeleton.tsx
│   │   │   │   ├── toast.tsx
│   │   │   │   └── navigation-menu.tsx
│   │   │   ├── layout/                # Layout components
│   │   │   │   ├── header.tsx
│   │   │   │   ├── footer.tsx
│   │   │   │   ├── sidebar.tsx
│   │   │   │   └── container.tsx
│   │   │   ├── sections/              # Page sections
│   │   │   │   ├── hero.tsx
│   │   │   │   ├── statistics.tsx
│   │   │   │   ├── services.tsx
│   │   │   │   ├── projects.tsx
│   │   │   │   ├── testimonials.tsx
│   │   │   │   ├── cta.tsx
│   │   │   │   └── newsletter.tsx
│   │   │   ├── cards/                 # Card components
│   │   │   │   ├── article-card.tsx
│   │   │   │   ├── service-card.tsx
│   │   │   │   ├── project-card.tsx
│   │   │   │   ├── job-card.tsx
│   │   │   │   ├── team-card.tsx
│   │   │   │   └── testimonial-card.tsx
│   │   │   ├── forms/                 # Form components
│   │   │   │   ├── contact-form.tsx
│   │   │   │   ├── newsletter-form.tsx
│   │   │   │   └── job-application-form.tsx
│   │   │   ├── navigation/            # Navigation components
│   │   │   │   ├── main-nav.tsx
│   │   │   │   ├── mobile-nav.tsx
│   │   │   │   ├── breadcrumb-nav.tsx
│   │   │   │   └── pagination-nav.tsx
│   │   │   ├── features/              # Feature components
│   │   │   │   ├── search-bar.tsx
│   │   │   │   ├── filter-chips.tsx
│   │   │   │   ├── social-links.tsx
│   │   │   │   ├── theme-toggle.tsx
│   │   │   │   └── language-toggle.tsx
│   │   │   └── providers/             # Context providers
│   │   │       ├── theme-provider.tsx
│   │   │       └── query-provider.tsx
│   │   ├── lib/                       # Utility functions
│   │   │   ├── utils.ts               # General utilities
│   │   │   ├── cn.ts                  # Classname utility
│   │   │   ├── api.ts                 # API client
│   │   │   ├── constants.ts           # Constants
│   │   │   └── helpers.ts             # Helper functions
│   │   ├── hooks/                     # Custom hooks
│   │   │   ├── use-theme.ts
│   │   │   ├── use-media-query.ts
│   │   │   ├── use-scroll.ts
│   │   │   └── use-debounce.ts
│   │   ├── types/                     # TypeScript types
│   │   │   ├── index.ts               # Export all types
│   │   │   ├── article.ts
│   │   │   ├── service.ts
│   │   │   ├── project.ts
│   │   │   ├── job.ts
│   │   │   ├── team.ts
│   │   │   └── contact.ts
│   │   ├── styles/                    # Additional styles
│   │   │   └── animations.css         # Custom animations
│   │   └── config/                    # Configuration files
│   │       ├── site.ts                # Site configuration
│   │       └── navigation.ts          # Navigation configuration
│   ├── .eslintrc.json                 # ESLint configuration
│   ├── .prettierrc                    # Prettier configuration
│   ├── next.config.js                 # Next.js configuration
│   ├── tailwind.config.ts             # Tailwind configuration
│   ├── tsconfig.json                  # TypeScript configuration
│   ├── package.json                   # Dependencies
│   └── README.md                      # Project documentation
├── backend/                           # Backend application (Phase 2)
├── packages/                          # Shared packages
└── plans/                             # Planning documents
    └── rencana-frontend-website-pertambangan.md
```

### 3.2 Penjelasan Struktur Folder

**`app/` - Next.js App Router**
- Menggunakan file-based routing untuk kemudahan navigasi
- Route groups `(auth)` dan `(marketing)` untuk organisasi yang lebih baik
- API routes di folder `api/` untuk backend integration
- Layout files untuk shared layouts

**`components/` - React Components**
- `ui/`: Komponen UI dari shadcn/ui yang reusable
- `layout/`: Komponen layout seperti header, footer, sidebar
- `sections/`: Section components untuk halaman
- `cards/`: Card components yang reusable
- `forms/`: Form components dengan validation
- `navigation/`: Navigation components
- `features/`: Feature components spesifik
- `providers/`: Context providers untuk state management

**`lib/` - Utility Functions**
- Fungsi-fungsi helper yang reusable
- API client untuk data fetching
- Constants dan configuration

**`hooks/` - Custom Hooks**
- Custom React hooks untuk logic yang reusable
- Theme management, media queries, scroll handling

**`types/` - TypeScript Types**
- Type definitions untuk data structures
- Type safety untuk seluruh aplikasi

**`styles/` - Additional Styles**
- Custom CSS untuk animations dan special cases
- Global styles yang tidak bisa di-handle oleh Tailwind

**`config/` - Configuration**
- Site configuration (meta data, SEO)
- Navigation configuration (menu structure)

---

## 4. Daftar Halaman yang Akan Dibuat

### 4.1 Halaman Utama

| Halaman | Route | Deskripsi | Priority |
|---------|-------|-----------|----------|
| Homepage | `/` | Halaman utama dengan hero, statistik, layanan, proyek, dan testimoni | High |
| Tentang Kami | `/about` | Informasi perusahaan, visi misi, nilai, dan tim manajemen | High |
| Layanan Kami | `/services` | Daftar layanan yang ditawarkan perusahaan | High |
| Proyek Kami | `/projects` | Galeri proyek yang telah diselesaikan | High |
| Hubungi Kami | `/contact` | Form kontak dan informasi perusahaan | High |
| Karir | `/careers` | Lowongan pekerjaan dan informasi karir | Medium |
| Blog | `/blog` | Daftar artikel dan berita perusahaan | Medium |
| Detail Artikel | `/blog/[slug]` | Halaman detail artikel blog | Medium |
| Detail Proyek | `/projects/[slug]` | Halaman detail proyek | Low |
| Detail Lowongan | `/careers/[slug]` | Halaman detail lowongan pekerjaan | Low |

### 4.2 Halaman Auth (Opsional)

| Halaman | Route | Deskripsi | Priority |
|---------|-------|-----------|----------|
| Login | `/login` | Halaman login untuk admin | Low |
| Register | `/register` | Halaman registrasi untuk admin | Low |

### 4.3 Halaman Error

| Halaman | Route | Deskripsi |
|---------|-------|-----------|
| 404 Not Found | `/404` | Halaman tidak ditemukan |
| 500 Error | `/500` | Halaman error server |

---

## 5. Komponen Reusable yang Diperlukan

### 5.1 Layout Components

#### 5.1.1 Header Component
**File**: `components/layout/header.tsx`

**Props**:
```typescript
interface HeaderProps {
  transparent?: boolean;
  fixed?: boolean;
}
```

**Features**:
- Logo dengan link ke homepage
- Navigation menu dengan dropdown
- Search bar dengan icon
- CTA button
- Mobile menu toggle
- Sticky behavior (opsional)
- Transparent background (opsional)

**Usage**:
```tsx
<Header transparent fixed />
```

#### 5.1.2 Footer Component
**File**: `components/layout/footer.tsx`

**Props**:
```typescript
interface FooterProps {
  showNewsletter?: boolean;
}
```

**Features**:
- Company information
- Quick links navigation
- Service links
- Contact information
- Social media links
- Newsletter subscription (opsional)
- Copyright notice

**Usage**:
```tsx
<Footer showNewsletter />
```

#### 5.1.3 Container Component
**File**: `components/layout/container.tsx`

**Props**:
```typescript
interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}
```

**Features**:
- Max-width container
- Responsive padding
- Centered content
- Size variants

**Usage**:
```tsx
<Container size="lg" className="py-12">
  <h1>Title</h1>
</Container>
```

#### 5.1.4 Sidebar Component
**File**: `components/layout/sidebar.tsx`

**Props**:
```typescript
interface SidebarProps {
  children: React.ReactNode;
  position?: 'left' | 'right';
  sticky?: boolean;
}
```

**Features**:
- Left or right positioning
- Sticky behavior (opsional)
- Responsive (hidden on mobile)
- Custom content

**Usage**:
```tsx
<Sidebar position="right" sticky>
  <FilterChips />
</Sidebar>
```

### 5.2 Section Components

#### 5.2.1 Hero Section
**File**: `components/sections/hero.tsx`

**Props**:
```typescript
interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  backgroundImage?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'center' | 'overlay';
}
```

**Features**:
- Full-width background image
- Gradient overlay
- Title and subtitle
- Description text
- Primary and secondary CTA buttons
- Multiple layout variants

**Usage**:
```tsx
<Hero
  title="Mining Excellence"
  subtitle="Leading the Industry"
  description="We provide world-class mining services"
  backgroundImage="/images/hero.jpg"
  primaryAction={{ label: 'Learn More', href: '/about' }}
  secondaryAction={{ label: 'Contact Us', href: '/contact' }}
  variant="overlay"
/>
```

#### 5.2.2 Statistics Section
**File**: `components/sections/statistics.tsx`

**Props**:
```typescript
interface StatisticsProps {
  stats: Array<{
    label: string;
    value: string | number;
    icon?: React.ReactNode;
  }>;
  columns?: 2 | 3 | 4;
}
```

**Features**:
- Grid layout (2-4 columns)
- Animated counters
- Icons for each stat
- Responsive design

**Usage**:
```tsx
<Statistics
  columns={4}
  stats={[
    { label: 'Projects Completed', value: '150+' },
    { label: 'Years Experience', value: '25' },
    { label: 'Team Members', value: '500+' },
    { label: 'Countries', value: '12' },
  ]}
/>
```

#### 5.2.3 Services Section
**File**: `components/sections/services.tsx`

**Props**:
```typescript
interface ServicesProps {
  services: Service[];
  showAll?: boolean;
  limit?: number;
}
```

**Features**:
- Grid of service cards
- Limit number of services
- "View All" link
- Responsive layout

**Usage**:
```tsx
<Services
  services={servicesData}
  limit={6}
  showAll
/>
```

#### 5.2.4 Projects Section
**File**: `components/sections/projects.tsx`

**Props**:
```typescript
interface ProjectsProps {
  projects: Project[];
  showAll?: boolean;
  limit?: number;
  variant?: 'grid' | 'masonry';
}
```

**Features**:
- Grid or masonry layout
- Project cards with images
- Filter by category
- "View All" link

**Usage**:
```tsx
<Projects
  projects={projectsData}
  variant="masonry"
  limit={6}
  showAll
/>
```

#### 5.2.5 Testimonials Section
**File**: `components/sections/testimonials.tsx`

**Props**:
```typescript
interface TestimonialsProps {
  testimonials: Testimonial[];
  showAll?: boolean;
  limit?: number;
}
```

**Features**:
- Grid of testimonial cards
- Auto-scroll carousel (opsional)
- Customer photos
- Star ratings

**Usage**:
```tsx
<Testimonials
  testimonials={testimonialsData}
  limit={3}
  showAll
/>
```

#### 5.2.6 CTA Section
**File**: `components/sections/cta.tsx`

**Props**:
```typescript
interface CTAProps {
  title: string;
  description?: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  variant?: 'default' | 'primary' | 'dark';
}
```

**Features**:
- Full-width section
- Multiple color variants
- Primary and secondary actions
- Responsive layout

**Usage**:
```tsx
<CTA
  title="Ready to Start Your Project?"
  description="Contact us today to discuss your mining needs"
  primaryAction={{ label: 'Get Started', href: '/contact' }}
  variant="primary"
/>
```

#### 5.2.7 Newsletter Section
**File**: `components/sections/newsletter.tsx`

**Props**:
```typescript
interface NewsletterProps {
  title?: string;
  description?: string;
  placeholder?: string;
  buttonText?: string;
}
```

**Features**:
- Email input field
- Subscribe button
- Success/error states
- Responsive design

**Usage**:
```tsx
<Newsletter
  title="Subscribe to Our Newsletter"
  description="Get the latest news and updates"
  placeholder="Enter your email"
  buttonText="Subscribe"
/>
```

### 5.3 Card Components

#### 5.3.1 Article Card
**File**: `components/cards/article-card.tsx`

**Props**:
```typescript
interface ArticleCardProps {
  article: {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    category: string;
    image: string;
    date: string;
    author: {
      name: string;
      avatar?: string;
    };
    featured?: boolean;
  };
  variant?: 'default' | 'featured' | 'compact';
}
```

**Features**:
- Image thumbnail
- Category badge
- Title and excerpt
- Date and author
- Hover effects
- Multiple variants

**Usage**:
```tsx
<ArticleCard
  article={articleData}
  variant="featured"
/>
```

#### 5.3.2 Service Card
**File**: `components/cards/service-card.tsx`

**Props**:
```typescript
interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    slug: string;
    description: string;
    icon: React.ReactNode;
    image?: string;
  };
  variant?: 'default' | 'with-image' | 'icon-only';
}
```

**Features**:
- Icon or image
- Title and description
- "Learn More" link
- Hover effects
- Multiple variants

**Usage**:
```tsx
<ServiceCard
  service={serviceData}
  variant="with-image"
/>
```

#### 5.3.3 Project Card
**File**: `components/cards/project-card.tsx`

**Props**:
```typescript
interface ProjectCardProps {
  project: {
    id: string;
    title: string;
    slug: string;
    location: string;
    image: string;
    status: 'completed' | 'ongoing' | 'upcoming';
    category: string;
  };
  variant?: 'default' | 'compact' | 'featured';
}
```

**Features**:
- Project image
- Title and location
- Status badge
- Category tag
- Hover effects
- Multiple variants

**Usage**:
```tsx
<ProjectCard
  project={projectData}
  variant="featured"
/>
```

#### 5.3.4 Job Card
**File**: `components/cards/job-card.tsx`

**Props**:
```typescript
interface JobCardProps {
  job: {
    id: string;
    title: string;
    slug: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'internship';
    department: string;
    postedDate: string;
  };
  variant?: 'default' | 'compact';
}
```

**Features**:
- Job title and department
- Location and type badges
- Posted date
- "Apply Now" button
- Hover effects

**Usage**:
```tsx
<JobCard
  job={jobData}
  variant="default"
/>
```

#### 5.3.5 Team Card
**File**: `components/cards/team-card.tsx`

**Props**:
```typescript
interface TeamCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    image: string;
    bio?: string;
    linkedin?: string;
    email?: string;
  };
  variant?: 'default' | 'compact' | 'minimal';
}
```

**Features**:
- Member photo
- Name and role
- Short bio
- Social links
- Hover effects

**Usage**:
```tsx
<TeamCard
  member={teamMemberData}
  variant="default"
/>
```

#### 5.3.6 Testimonial Card
**File**: `components/cards/testimonial-card.tsx`

**Props**:
```typescript
interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    role: string;
    company?: string;
    image?: string;
    content: string;
    rating?: number;
  };
  variant?: 'default' | 'compact' | 'minimal';
}
```

**Features**:
- Customer photo
- Name and role
- Testimonial content
- Star rating
- Company name (opsional)

**Usage**:
```tsx
<TestimonialCard
  testimonial={testimonialData}
  variant="default"
/>
```

### 5.4 Form Components

#### 5.4.1 Contact Form
**File**: `components/forms/contact-form.tsx`

**Props**:
```typescript
interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
  showSubject?: boolean;
  showPhone?: boolean;
}
```

**Features**:
- Name, email, phone fields
- Subject dropdown (opsional)
- Message textarea
- Validation with Zod
- Success/error states
- Loading state

**Usage**:
```tsx
<ContactForm
  showSubject
  showPhone
  onSubmit={handleSubmit}
/>
```

#### 5.4.2 Newsletter Form
**File**: `components/forms/newsletter-form.tsx`

**Props**:
```typescript
interface NewsletterFormProps {
  onSubmit?: (data: { email: string }) => void;
  placeholder?: string;
  buttonText?: string;
}
```

**Features**:
- Email input field
- Validation
- Success/error states
- Loading state

**Usage**:
```tsx
<NewsletterForm
  placeholder="Enter your email"
  buttonText="Subscribe"
  onSubmit={handleSubscribe}
/>
```

#### 5.4.3 Job Application Form
**File**: `components/forms/job-application-form.tsx`

**Props**:
```typescript
interface JobApplicationFormProps {
  jobId: string;
  onSubmit?: (data: JobApplicationData) => void;
}
```

**Features**:
- Personal information fields
- Resume upload
- Cover letter textarea
- Additional questions
- Validation with Zod
- Success/error states

**Usage**:
```tsx
<JobApplicationForm
  jobId="job-123"
  onSubmit={handleApplication}
/>
```

### 5.5 Navigation Components

#### 5.5.1 Main Navigation
**File**: `components/navigation/main-nav.tsx`

**Props**:
```typescript
interface MainNavProps {
  items: NavItem[];
  className?: string;
}
```

**Features**:
- Desktop navigation menu
- Dropdown support
- Active state highlighting
- Hover effects

**Usage**:
```tsx
<MainNav
  items={navItems}
  className="hidden md:flex"
/>
```

#### 5.5.2 Mobile Navigation
**File**: `components/navigation/mobile-nav.tsx`

**Props**:
```typescript
interface MobileNavProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
}
```

**Features**:
- Slide-in menu
- Accordion for nested items
- Close button
- Backdrop overlay

**Usage**:
```tsx
<MobileNav
  items={navItems}
  isOpen={isMobileMenuOpen}
  onClose={() => setIsMobileMenuOpen(false)}
/>
```

#### 5.5.3 Breadcrumb Navigation
**File**: `components/navigation/breadcrumb-nav.tsx`

**Props**:
```typescript
interface BreadcrumbNavProps {
  items: Array<{
    label: string;
    href?: string;
  }>;
  className?: string;
}
```

**Features**:
- Breadcrumb trail
- Clickable links
- Current page indicator
- Responsive design

**Usage**:
```tsx
<BreadcrumbNav
  items={[
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog' },
    { label: 'Article Title' },
  ]}
/>
```

#### 5.5.4 Pagination Navigation
**File**: `components/navigation/pagination-nav.tsx`

**Props**:
```typescript
interface PaginationNavProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showFirstLast?: boolean;
  showPrevNext?: boolean;
}
```

**Features**:
- Page numbers
- Previous/Next buttons
- First/Last buttons (opsional)
- Active state
- Disabled states

**Usage**:
```tsx
<PaginationNav
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={handlePageChange}
  showFirstLast
  showPrevNext
/>
```

### 5.6 Feature Components

#### 5.6.1 Search Bar
**File**: `components/features/search-bar.tsx`

**Props**:
```typescript
interface SearchBarProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  className?: string;
}
```

**Features**:
- Search input field
- Search icon
- Clear button
- Debounced search
- Responsive design

**Usage**:
```tsx
<SearchBar
  placeholder="Search articles..."
  onSearch={handleSearch}
/>
```

#### 5.6.2 Filter Chips
**File**: `components/features/filter-chips.tsx`

**Props**:
```typescript
interface FilterChipsProps {
  filters: Array<{
    id: string;
    label: string;
    count?: number;
  }>;
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  variant?: 'default' | 'checkbox' | 'dropdown';
}
```

**Features**:
- Filter chips/buttons
- Multiple selection
- Count badges
- Multiple variants
- Responsive design

**Usage**:
```tsx
<FilterChips
  filters={categoryFilters}
  selectedFilters={selectedCategories}
  onFilterChange={handleFilterChange}
  variant="default"
/>
```

#### 5.6.3 Social Links
**File**: `components/features/social-links.tsx`

**Props**:
```typescript
interface SocialLinksProps {
  platforms: Array<{
    name: string;
    url: string;
    icon: React.ReactNode;
  }>;
  variant?: 'default' | 'circle' | 'square';
  size?: 'sm' | 'md' | 'lg';
}
```

**Features**:
- Social media icons
- Multiple variants
- Size options
- Hover effects

**Usage**:
```tsx
<SocialLinks
  platforms={socialPlatforms}
  variant="circle"
  size="md"
/>
```

#### 5.6.4 Theme Toggle
**File**: `components/features/theme-toggle.tsx`

**Props**:
```typescript
interface ThemeToggleProps {
  className?: string;
}
```

**Features**:
- Light/dark mode toggle
- Icon animation
- Persisted preference
- System preference detection

**Usage**:
```tsx
<ThemeToggle className="ml-4" />
```

#### 5.6.5 Language Toggle
**File**: `components/features/language-toggle.tsx`

**Props**:
```typescript
interface LanguageToggleProps {
  languages: Array<{
    code: string;
    label: string;
  }>;
  currentLanguage: string;
  onLanguageChange: (language: string) => void;
  variant?: 'dropdown' | 'toggle';
}
```

**Features**:
- Language selection
- Dropdown or toggle variant
- Persisted preference
- RTL support (opsional)

**Usage**:
```tsx
<LanguageToggle
  languages={[
    { code: 'id', label: 'Indonesia' },
    { code: 'en', label: 'English' },
  ]}
  currentLanguage={currentLanguage}
  onLanguageChange={handleLanguageChange}
  variant="dropdown"
/>
```

### 5.7 Provider Components

#### 5.7.1 Theme Provider
**File**: `components/providers/theme-provider.tsx`

**Props**:
```typescript
interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: 'light' | 'dark' | 'system';
  storageKey?: string;
}
```

**Features**:
- Theme context
- System preference detection
- Local storage persistence
- SSR support

**Usage**:
```tsx
<ThemeProvider defaultTheme="system" storageKey="mining-theme">
  {children}
</ThemeProvider>
```

#### 5.7.2 Query Provider
**File**: `components/providers/query-provider.tsx`

**Props**:
```typescript
interface QueryProviderProps {
  children: React.ReactNode;
}
```

**Features**:
- SWR configuration
- Global fetcher
- Error handling
- Loading states

**Usage**:
```tsx
<QueryProvider>
  {children}
</QueryProvider>
```

---

## 6. Routing dan Navigasi

### 6.1 Struktur Routing

```
/                              → Homepage
/about                         → Tentang Kami
/services                      → Layanan Kami
/projects                      → Proyek Kami
/projects/[slug]              → Detail Proyek
/contact                       → Hubungi Kami
/careers                       → Karir
/careers/[slug]               → Detail Lowongan
/blog                          → Blog
/blog/[slug]                  → Detail Artikel
/login                         → Login (Opsional)
/register                      → Register (Opsional)
```

### 6.2 Navigasi Utama

**Menu Structure:**
```
Home
About
  - Company Overview
  - Vision & Mission
  - Our Team
Services
  - Mining Services
  - Consulting
  - Equipment
Projects
  - All Projects
  - Completed
  - Ongoing
Careers
  - Open Positions
  - Culture
Blog
  - Latest News
  - Industry Insights
Contact
```

### 6.3 User Flow

**Primary User Flows:**

1. **Information Seeking Flow:**
   - Homepage → Services → Contact
   - Homepage → Projects → Contact
   - Homepage → About → Contact

2. **Job Application Flow:**
   - Homepage → Careers → Job Detail → Application Form

3. **Content Consumption Flow:**
   - Homepage → Blog → Article Detail → Related Articles

4. **Project Inquiry Flow:**
   - Homepage → Projects → Project Detail → Contact Form

### 6.4 Dynamic Routes

**Dynamic Routes yang Akan Dibuat:**

1. **Blog Articles:**
   - Route: `/blog/[slug]`
   - Data: Article content, related articles, comments
   - SEO: Dynamic meta tags, structured data

2. **Project Details:**
   - Route: `/projects/[slug]`
   - Data: Project info, gallery, team, timeline
   - SEO: Dynamic meta tags, structured data

3. **Job Listings:**
   - Route: `/careers/[slug]`
   - Data: Job description, requirements, benefits
   - SEO: Dynamic meta tags

### 6.5 Route Groups

**Route Groups untuk Organisasi:**

1. **(marketing) Group:**
   - Halaman publik yang tidak memerlukan auth
   - Shared layout untuk marketing pages

2. **(auth) Group:**
   - Halaman login dan register
   - Shared layout untuk auth pages

3. **(admin) Group (Opsional):**
   - Halaman admin dashboard
   - Protected routes dengan middleware

### 6.6 Middleware

**Middleware yang Akan Dibuat:**

1. **Auth Middleware:**
   - Protect admin routes
   - Redirect unauthenticated users

2. **Locale Middleware (Opsional):**
   - Handle language routing
   - Redirect to correct locale

3. **Redirect Middleware:**
   - Handle old URL redirects
   - Canonical URL enforcement

---

## 7. Integrasi dengan PostgreSQL (Backend Phase)

### 7.1 Schema Database

**Tables yang Akan Dibuat:**

```sql
-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Articles Table
CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  featured_image VARCHAR(500),
  category_id UUID REFERENCES categories(id),
  author_id UUID REFERENCES users(id),
  status VARCHAR(50) DEFAULT 'draft',
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Services Table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  icon VARCHAR(100),
  image VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Projects Table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  content TEXT NOT NULL,
  location VARCHAR(255),
  status VARCHAR(50) DEFAULT 'ongoing',
  category VARCHAR(100),
  featured_image VARCHAR(500),
  gallery JSONB,
  start_date DATE,
  end_date DATE,
  client VARCHAR(255),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Jobs Table
CREATE TABLE jobs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT NOT NULL,
  requirements TEXT,
  benefits TEXT,
  location VARCHAR(255),
  type VARCHAR(50),
  department VARCHAR(100),
  salary_range VARCHAR(100),
  status VARCHAR(50) DEFAULT 'open',
  posted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Team Members Table
CREATE TABLE team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  bio TEXT,
  image VARCHAR(500),
  linkedin VARCHAR(500),
  email VARCHAR(255),
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Testimonials Table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  role VARCHAR(100),
  company VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  image VARCHAR(500),
  featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact Submissions Table
CREATE TABLE contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(255),
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Job Applications Table
CREATE TABLE job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID REFERENCES jobs(id),
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  resume_url VARCHAR(500),
  cover_letter TEXT,
  status VARCHAR(50) DEFAULT 'received',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter Subscriptions Table
CREATE TABLE newsletter_subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  unsubscribed_at TIMESTAMP
);

-- Settings Table
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key VARCHAR(100) UNIQUE NOT NULL,
  value TEXT,
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 7.2 API Endpoints

**API Routes yang Akan Dibuat:**

1. **Articles API:**
   - `GET /api/articles` - List all articles
   - `GET /api/articles/[slug]` - Get single article
   - `GET /api/articles/category/[category]` - Get articles by category
   - `POST /api/articles` - Create article (admin)
   - `PUT /api/articles/[id]` - Update article (admin)
   - `DELETE /api/articles/[id]` - Delete article (admin)

2. **Services API:**
   - `GET /api/services` - List all services
   - `GET /api/services/[slug]` - Get single service
   - `POST /api/services` - Create service (admin)
   - `PUT /api/services/[id]` - Update service (admin)
   - `DELETE /api/services/[id]` - Delete service (admin)

3. **Projects API:**
   - `GET /api/projects` - List all projects
   - `GET /api/projects/[slug]` - Get single project
   - `GET /api/projects/status/[status]` - Get projects by status
   - `POST /api/projects` - Create project (admin)
   - `PUT /api/projects/[id]` - Update project (admin)
   - `DELETE /api/projects/[id]` - Delete project (admin)

4. **Jobs API:**
   - `GET /api/jobs` - List all jobs
   - `GET /api/jobs/[slug]` - Get single job
   - `POST /api/jobs` - Create job (admin)
   - `PUT /api/jobs/[id]` - Update job (admin)
   - `DELETE /api/jobs/[id]` - Delete job (admin)

5. **Contact API:**
   - `POST /api/contact` - Submit contact form
   - `GET /api/contact` - List submissions (admin)
   - `PUT /api/contact/[id]` - Update submission (admin)

6. **Job Applications API:**
   - `POST /api/applications` - Submit job application
   - `GET /api/applications` - List applications (admin)
   - `PUT /api/applications/[id]` - Update application (admin)

7. **Newsletter API:**
   - `POST /api/newsletter` - Subscribe to newsletter
   - `GET /api/newsletter` - List subscribers (admin)

8. **Auth API:**
   - `POST /api/auth/login` - Login
   - `POST /api/auth/register` - Register
   - `POST /api/auth/logout` - Logout
   - `GET /api/auth/me` - Get current user

### 7.3 Data Fetching Strategy

**Server-Side Data Fetching:**
- Use `fetch` in Server Components for initial data
- Use `generateStaticParams` for static generation
- Use `revalidate` for ISR (Incremental Static Regeneration)

**Client-Side Data Fetching:**
- Use SWR for client-side data fetching
- Implement caching and revalidation
- Handle loading and error states

**Example:**
```typescript
// Server Component
async function getArticles() {
  const res = await fetch(`${process.env.API_URL}/api/articles`, {
    next: { revalidate: 3600 }, // Revalidate every hour
  });
  return res.json();
}

// Client Component
function useArticles() {
  const { data, error, isLoading } = useSWR('/api/articles', fetcher);
  return { articles: data, error, isLoading };
}
```

---

## 8. Langkah-langkah Implementasi

### 8.1 Phase 1: Project Setup (Foundation)

**Tasks:**
1. Initialize Next.js project with TypeScript
2. Install and configure Tailwind CSS
3. Set up shadcn/ui components
4. Configure ESLint and Prettier
5. Set up Git repository
6. Create folder structure
7. Configure environment variables
8. Set up Prisma (for backend phase)

**Estimated Deliverables:**
- ✅ Next.js project initialized
- ✅ Tailwind CSS configured
- ✅ shadcn/ui components installed
- ✅ Folder structure created
- ✅ Development environment ready

### 8.2 Phase 2: Core Components (Building Blocks)

**Tasks:**
1. Create layout components (Header, Footer, Container)
2. Create navigation components (MainNav, MobileNav, Breadcrumb)
3. Create UI components from shadcn/ui
4. Create card components (Article, Service, Project, Job, Team, Testimonial)
5. Create form components (Contact, Newsletter, Job Application)
6. Create feature components (Search, Filter, Social, Theme Toggle)
7. Create provider components (Theme, Query)
8. Test all components in isolation

**Estimated Deliverables:**
- ✅ All layout components created
- ✅ All navigation components created
- ✅ All UI components installed
- ✅ All card components created
- ✅ All form components created
- ✅ All feature components created
- ✅ All provider components created
- ✅ Components tested and documented

### 8.3 Phase 3: Page Implementation (Pages)

**Tasks:**
1. Create homepage with all sections
2. Create about page
3. Create services page
4. Create projects page
5. Create project detail page
6. Create contact page
7. Create careers page
8. Create blog listing page
9. Create blog detail page
10. Create error pages (404, 500)

**Estimated Deliverables:**
- ✅ Homepage implemented
- ✅ About page implemented
- ✅ Services page implemented
- ✅ Projects page implemented
- ✅ Project detail page implemented
- ✅ Contact page implemented
- ✅ Careers page implemented
- ✅ Blog listing page implemented
- ✅ Blog detail page implemented
- ✅ Error pages implemented

### 8.4 Phase 4: Styling and Polish (Visual Design)

**Tasks:**
1. Apply consistent color scheme
2. Implement typography system
3. Add animations and transitions
4. Optimize responsive design
5. Add hover effects
6. Implement dark mode
7. Optimize images
8. Add loading states
9. Add error states
10. Test cross-browser compatibility

**Estimated Deliverables:**
- ✅ Consistent design system applied
- ✅ Animations implemented
- ✅ Responsive design optimized
- ✅ Dark mode implemented
- ✅ Images optimized
- ✅ Loading and error states added
- ✅ Cross-browser tested

### 8.5 Phase 5: Performance Optimization (Speed)

**Tasks:**
1. Optimize images with Next.js Image component
2. Implement lazy loading
3. Add code splitting
4. Optimize bundle size
5. Implement caching strategies
6. Add service worker (PWA)
7. Optimize fonts
8. Minimize JavaScript
9. Implement CDN for static assets
10. Run Lighthouse audit

**Estimated Deliverables:**
- ✅ Images optimized
- ✅ Lazy loading implemented
- ✅ Bundle size optimized
- ✅ Caching strategies implemented
- ✅ Fonts optimized
- ✅ Lighthouse score > 90

### 8.6 Phase 6: SEO and Accessibility (Reach)

**Tasks:**
1. Add meta tags to all pages
2. Implement structured data (JSON-LD)
3. Create sitemap.xml
4. Create robots.txt
5. Optimize page titles
6. Add alt text to images
7. Implement ARIA labels
8. Test with screen readers
9. Check color contrast
10. Validate with WAVE tool

**Estimated Deliverables:**
- ✅ Meta tags added
- ✅ Structured data implemented
- ✅ Sitemap created
- ✅ Robots.txt created
- ✅ Accessibility optimized
- ✅ WCAG 2.1 AA compliant

### 8.7 Phase 7: Testing (Quality Assurance)

**Tasks:**
1. Write unit tests for components
2. Write integration tests for pages
3. Write E2E tests with Playwright
4. Test responsive design
5. Test cross-browser compatibility
6. Test form submissions
7. Test error handling
8. Test loading states
9. Perform manual testing
10. Fix bugs and issues

**Estimated Deliverables:**
- ✅ Unit tests written
- ✅ Integration tests written
- ✅ E2E tests written
- ✅ All tests passing
- ✅ Bugs fixed

### 8.8 Phase 8: Deployment (Production)

**Tasks:**
1. Set up production environment
2. Configure environment variables
3. Set up database (PostgreSQL)
4. Run database migrations
5. Build production bundle
6. Deploy to Vercel/Netlify
7. Set up custom domain
8. Configure SSL certificate
9. Set up monitoring
10. Set up error tracking

**Estimated Deliverables:**
- ✅ Production environment configured
- ✅ Database set up
- ✅ Application deployed
- ✅ Custom domain configured
- ✅ SSL certificate installed
- ✅ Monitoring set up
- ✅ Error tracking set up

### 8.9 Phase 9: Backend Integration (API & Database)

**Tasks:**
1. Set up Prisma ORM
2. Create database schema
3. Run database migrations
4. Create API routes
5. Implement CRUD operations
6. Add authentication
7. Add authorization
8. Test API endpoints
9. Integrate with frontend
10. Deploy backend

**Estimated Deliverables:**
- ✅ Prisma configured
- ✅ Database schema created
- ✅ API routes created
- ✅ Authentication implemented
- ✅ Frontend integrated with backend
- ✅ Backend deployed

### 8.10 Phase 10: Documentation and Handoff (Knowledge Transfer)

**Tasks:**
1. Write README.md
2. Document component API
3. Create deployment guide
4. Create developer guide
5. Document API endpoints
6. Create user guide
7. Record demo video
8. Create troubleshooting guide
9. Set up code review process
10. Handoff to team

**Estimated Deliverables:**
- ✅ README.md written
- ✅ Component documentation created
- ✅ Deployment guide created
- ✅ Developer guide created
- ✅ API documentation created
- ✅ User guide created
- ✅ Demo video recorded
- ✅ Project handed off

---

## 9. Best Practices dan Guidelines

### 9.1 Code Style

**TypeScript Guidelines:**
- Use strict mode
- Define interfaces for all props
- Use type inference where possible
- Avoid `any` type
- Use proper typing for API responses

**React Guidelines:**
- Use functional components
- Use hooks for state and side effects
- Keep components small and focused
- Use proper key props for lists
- Avoid inline functions in render

**CSS Guidelines:**
- Use Tailwind utility classes
- Avoid custom CSS when possible
- Use responsive prefixes
- Follow mobile-first approach
- Use semantic HTML

### 9.2 Performance

**Optimization Strategies:**
- Use Next.js Image component for images
- Implement lazy loading for images
- Use dynamic imports for heavy components
- Optimize bundle size with code splitting
- Use caching strategies
- Minimize JavaScript
- Optimize fonts
- Use CDN for static assets

### 9.3 Security

**Security Best Practices:**
- Validate all user inputs
- Sanitize data from API
- Use HTTPS in production
- Implement rate limiting
- Use environment variables for secrets
- Keep dependencies updated
- Implement CORS properly
- Use secure cookies

### 9.4 Accessibility

**Accessibility Guidelines:**
- Use semantic HTML
- Add ARIA labels where needed
- Ensure keyboard navigation
- Check color contrast
- Add alt text to images
- Use proper heading hierarchy
- Test with screen readers
- Follow WCAG 2.1 AA guidelines

### 9.5 SEO

**SEO Best Practices:**
- Use descriptive meta tags
- Create unique page titles
- Use proper heading structure
- Optimize images with alt text
- Create sitemap.xml
- Create robots.txt
- Implement structured data
- Use canonical URLs
- Optimize page load speed
- Create quality content

---

## 10. Risiko dan Mitigasi

### 10.1 Risiko Teknis

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Kompatibilitas browser | Sedang | Test di semua browser utama, gunakan polyfills |
| Performance issues | Sedang | Optimasi bundle, implement lazy loading, gunakan CDN |
| Integrasi backend | Tinggi | Plan integrasi sejak awal, buat API contract |
| Scalability | Sedang | Gunakan arsitektur yang scalable, optimasi database |

### 10.2 Risiko Proyek

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Scope creep | Tinggi | Definisikan scope dengan jelas, prioritaskan fitur |
| Timeline delay | Sedang | Buat timeline realistis, monitor progress |
| Resource constraints | Sedang | Plan resources dengan baik, prioritaskan tasks |
| Quality issues | Sedang | Implement testing, code review, QA process |

### 10.3 Risiko Bisnis

| Risiko | Dampak | Mitigasi |
|--------|--------|----------|
| Requirement changes | Sedang | Flexible architecture, modular components |
| Budget overrun | Sedang | Monitor budget, prioritaskan fitur penting |
| Stakeholder feedback | Sedang | Regular communication, iterative development |

---

## 11. Kesimpulan

Rencana arsitektur frontend ini menyajikan pendekatan yang komprehensif dan terstruktur untuk membangun website pertambangan yang modern, scalable, dan performant. Dengan menggunakan teknologi-teknologi terbaru seperti Next.js 14, Tailwind CSS, shadcn/ui, dan PostgreSQL, kita dapat menciptakan website yang tidak hanya visually appealing tetapi juga robust dan maintainable.

### Poin-poin Utama:

1. **Teknologi Modern**: Menggunakan Next.js 14 dengan App Router untuk performa optimal dan SEO yang baik
2. **Component-Based Architecture**: Struktur komponen yang modular dan reusable untuk maintainability
3. **Type Safety**: TypeScript untuk kode yang lebih robust dan less error-prone
4. **Responsive Design**: Mobile-first approach dengan Tailwind CSS untuk konsistensi desain
5. **Performance Optimization**: Berbagai strategi optimasi untuk kecepatan dan user experience
6. **SEO Friendly**: Struktur yang optimal untuk search engine optimization
7. **Accessibility**: Mengikuti WCAG 2.1 AA guidelines untuk inclusivity
8. **Scalability**: Arsitektur yang scalable untuk future growth
9. **Database Integration**: Siap untuk integrasi dengan PostgreSQL pada tahap backend
10. **Best Practices**: Mengikuti industry best practices untuk code quality dan maintainability

### Next Steps:

1. Review dan approve rencana ini
2. Mulai implementasi dengan Phase 1 (Project Setup)
3. Ikuti roadmap implementasi secara bertahap
4. Regular review dan adjustment sesuai kebutuhan
5. Testing dan quality assurance di setiap phase
6. Deployment ke production setelah semua phase selesai

Dengan rencana ini, kita memiliki roadmap yang jelas untuk membangun website pertambangan yang excellent dan sesuai dengan referensi UI/UX yang telah dianalisis.

---

## Appendix

### A. Referensi dan Resources

**Documentation:**
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Prisma Documentation](https://www.prisma.io/docs)

**Tools:**
- [Vercel](https://vercel.com) - Deployment platform
- [PostgreSQL](https://www.postgresql.org) - Database
- [Prisma](https://www.prisma.io) - ORM
- [Framer Motion](https://www.framer.com/motion) - Animation library
- [Lucide](https://lucide.dev) - Icon library

**Design Resources:**
- [Tailwind UI](https://tailwindui.com) - Component templates
- [Heroicons](https://heroicons.com) - Icon set
- [Google Fonts](https://fonts.google.com) - Font library
- [Coolors](https://coolors.co) - Color palette generator

### B. Glossary

- **SSR (Server-Side Rendering)**: Rendering halaman di server sebelum dikirim ke client
- **SSG (Static Site Generation)**: Generating halaman statis pada build time
- **ISR (Incremental Static Regeneration)**: Updating halaman statis secara berkala
- **CSR (Client-Side Rendering)**: Rendering halaman di browser menggunakan JavaScript
- **JIT (Just-In-Time)**: Compile CSS on-demand saat development
- **Tree-shaking**: Menghapus code yang tidak digunakan dari bundle
- **Lazy Loading**: Loading component atau resource hanya saat dibutuhkan
- **Code Splitting**: Memecah bundle menjadi smaller chunks
- **Type Safety**: Memastikan type correctness pada compile time
- **Accessibility**: Kemudahan akses untuk semua user termasuk yang memiliki disabilitas

### C. Kontak dan Support

Untuk pertanyaan atau clarifications mengenai rencana ini, silakan hubungi:

- **Project Lead**: [Nama]
- **Email**: [Email]
- **Slack**: [Channel]

---

**Dokumen ini dibuat pada**: 3 Januari 2026
**Versi**: 1.0
**Status**: Draft - Menunggu Approval