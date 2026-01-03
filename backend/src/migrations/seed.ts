import { query } from '../config/database';

/**
 * Seed database with initial data
 */
export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('Starting database seeding...');

    // Seed Categories
    console.log('Seeding categories...');
    await query(`
      INSERT INTO categories (name, slug, description) VALUES
      ('Berita', 'berita', 'Berita terkini seputar industri pertambangan'),
      ('Artikel', 'artikel', 'Artikel mendalam tentang pertambangan'),
      ('Press Release', 'press-release', 'Rilis pers resmi perusahaan'),
      ('Insight', 'insight', 'Wawasan dan analisis industri')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // Seed Services
    console.log('Seeding services...');
    await query(`
      INSERT INTO services (title, slug, description, content, icon, featured, order_index) VALUES
      ('Eksplorasi Tambang', 'eksplorasi-tambang', 'Layanan eksplorasi tambang yang komprehensif', 'Kami menyediakan layanan eksplorasi tambang yang komprehensif mulai dari survei geologi, pemetaan, hingga analisis sampel untuk menentukan potensi mineral.', 'pickaxe', true, 1),
      ('Pertambangan Terbuka', 'pertambangan-terbuka', 'Operasi pertambangan terbuka yang efisien', 'Operasi pertambangan terbuka kami menggunakan teknologi terkini untuk memastikan efisiensi dan keamanan dalam setiap tahap produksi.', 'mountain', true, 2),
      ('Pertambangan Bawah Tanah', 'pertambangan-bawah-tanah', 'Solusi pertambangan bawah tanah yang aman', 'Kami memiliki keahlian dalam pertambangan bawah tanah dengan standar keamanan tertinggi dan metode yang teruji.', 'hard-hat', true, 3),
      ('Pengolahan Mineral', 'pengolahan-mineral', 'Fasilitas pengolahan mineral modern', 'Fasilitas pengolahan mineral kami dilengkapi dengan teknologi canggih untuk memaksimalkan pemulihan mineral.', 'factory', false, 4),
      ('Konsultasi Tambang', 'konsultasi-tambang', 'Jasa konsultasi pertambangan profesional', 'Tim ahli kami siap memberikan konsultasi komprehensif untuk berbagai aspek operasional pertambangan.', 'users', false, 5),
      ('Logistik Tambang', 'logistik-tambang', 'Solusi logistik pertambangan terintegrasi', 'Kami menyediakan solusi logistik terintegrasi untuk mendukung operasional pertambangan dari hulu ke hilir.', 'truck', false, 6)
      ON CONFLICT (slug) DO NOTHING;
    `);

    // Seed Projects
    console.log('Seeding projects...');
    await query(`
      INSERT INTO projects (title, slug, description, content, location, status, category, featured_image, featured, start_date, end_date, client) VALUES
      ('Proyek Tambang Emas Kalimantan', 'proyek-tambang-emas-kalimantan', 'Proyek eksplorasi dan penambangan emas di Kalimantan', 'Proyek ini mencakup eksplorasi komprehensif dan operasi penambangan emas di wilayah Kalimantan dengan kapasitas produksi 500 ton per bulan.', 'Kalimantan Tengah', 'ongoing', 'Emas', '/images/projects/gold-mine.jpg', true, '2023-01-15', '2025-12-31', 'PT Mining Indonesia'),
      ('Proyek Tambang Batubara Sumatera', 'proyek-tambang-batubara-sumatera', 'Operasi penambangan batubara skala besar di Sumatera', 'Proyek penambangan batubara dengan kapasitas produksi 2 juta ton per tahun, menggunakan teknologi ramah lingkungan.', 'Sumatera Selatan', 'ongoing', 'Batubara', '/images/projects/coal-mine.jpg', true, '2022-06-01', '2026-05-31', 'PT Coal Resources'),
      ('Proyek Tambang Nikel Sulawesi', 'proyek-tambang-nikel-sulawesi', 'Pengembangan tambang nikel di Sulawesi', 'Proyek pengembangan tambang nikel dengan fokus pada produksi nikel berkualitas tinggi untuk pasar ekspor.', 'Sulawesi Tenggara', 'completed', 'Nikel', '/images/projects/nickel-mine.jpg', false, '2021-03-01', '2023-12-31', 'PT Nickel Corp'),
      ('Proyek Tambang Tembaga Papua', 'proyek-tambang-tembaga-papua', 'Eksplorasi dan penambangan tembaga di Papua', 'Proyek eksplorasi tembaga dengan potensi cadangan besar di wilayah Papua.', 'Papua', 'ongoing', 'Tembaga', '/images/projects/copper-mine.jpg', false, '2023-08-01', '2027-07-31', 'PT Copper Mining'),
      ('Proyek Tambang Bauksit Riau', 'proyek-tambang-bauksit-riau', 'Operasi penambangan bauksit di Riau', 'Proyek penambangan bauksit dengan kapasitas produksi 300 ribu ton per tahun.', 'Riau', 'completed', 'Bauksit', '/images/projects/bauxite-mine.jpg', false, '2020-01-01', '2022-12-31', 'PT Bauxite Resources')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // Seed Jobs
    console.log('Seeding jobs...');
    await query(`
      INSERT INTO jobs (title, slug, description, requirements, benefits, location, type, department, salary_range, status, posted_at, expires_at) VALUES
      ('Mining Engineer', 'mining-engineer', 'Kami mencari Mining Engineer berpengalaman untuk bergabung dengan tim kami.', 'Minimal 5 tahun pengalaman di industri pertambangan, Sarjana Teknik Pertambangan, Mampu bekerja dalam tim, Bersedia ditempatkan di site.', 'Gaji kompetitif, Asuransi kesehatan, Tunjangan transport, Cuti tahunan 14 hari, Program pengembangan karir', 'Kalimantan', 'full-time', 'Engineering', 'Rp 15.000.000 - Rp 25.000.000', 'open', NOW(), NOW() + INTERVAL '30 days'),
      ('Geologist', 'geologist', 'Posisi Geologist untuk proyek eksplorasi mineral.', 'Minimal 3 tahun pengalaman, Sarjana Geologi, Mampu menganalisis data geologi, Bersedia melakukan field work.', 'Gaji kompetitif, Asuransi kesehatan, Tunjangan field, Cuti tahunan 14 hari', 'Sumatera', 'full-time', 'Exploration', 'Rp 12.000.000 - Rp 20.000.000', 'open', NOW(), NOW() + INTERVAL '30 days'),
      ('Safety Officer', 'safety-officer', 'Safety Officer untuk memastikan kepatuhan standar K3.', 'Minimal 3 tahun pengalaman di K3 pertambangan, Sertifikasi K3, Mampu melakukan training K3, Detail oriented.', 'Gaji kompetititf, Asuransi kesehatan, Tunjangan K3, Cuti tahunan 14 hari', 'Site Indonesia', 'full-time', 'HSE', 'Rp 10.000.000 - Rp 15.000.000', 'open', NOW(), NOW() + INTERVAL '30 days'),
      ('Heavy Equipment Operator', 'heavy-equipment-operator', 'Operator alat berat berpengalaman untuk operasional tambang.', 'Minimal 2 tahun pengalaman, Sertifikasi operator alat berat, Mampu mengoperasikan berbagai jenis alat berat, Disiplin dan bertanggung jawab.', 'Gaji kompetitif, Asuransi kesehatan, Tunjangan operasional, Cuti tahunan 14 hari', 'Site Indonesia', 'full-time', 'Operations', 'Rp 8.000.000 - Rp 12.000.000', 'open', NOW(), NOW() + INTERVAL '30 days'),
      ('Environmental Specialist', 'environmental-specialist', 'Environmental Specialist untuk memastikan kepatuhan lingkungan.', 'Minimal 3 tahun pengalaman di lingkungan pertambangan, Sarjana Teknik Lingkungan, Memahami regulasi lingkungan, Mampu membuat laporan AMDAL.', 'Gaji kompetitif, Asuransi kesehatan, Tunjangan lingkungan, Cuti tahunan 14 hari', 'Head Office Jakarta', 'full-time', 'Environment', 'Rp 12.000.000 - Rp 18.000.000', 'open', NOW(), NOW() + INTERVAL '30 days')
      ON CONFLICT (slug) DO NOTHING;
    `);

    // Seed Team Members
    console.log('Seeding team members...');
    await query(`
      INSERT INTO team_members (first_name, last_name, role, bio, image, linkedin, email, order_index) VALUES
      ('Ahmad', 'Santoso', 'CEO', 'Ahmad Santoso memiliki pengalaman lebih dari 20 tahun di industri pertambangan. Beliau memimpin perusahaan dengan visi untuk menjadi pemimpin industri pertambangan di Indonesia.', '/images/team/ceo.jpg', 'linkedin.com/in/ahmadsantoso', 'ahmad.santoso@mining.co.id', 1),
      ('Siti', 'Rahayu', 'COO', 'Siti Rahayu adalah ahli operasional dengan pengalaman 15 tahun di manajemen operasional pertambangan. Beliau bertanggung jawab atas efisiensi operasional perusahaan.', '/images/team/coo.jpg', 'linkedin.com/in/sitirahayu', 'siti.rahayu@mining.co.id', 2),
      ('Budi', 'Pratama', 'CTO', 'Budi Pratama adalah teknologi informasi dengan spesialisasi dalam sistem manajemen pertambangan. Beliau memimpin transformasi digital perusahaan.', '/images/team/cto.jpg', 'linkedin.com/in/budipratama', 'budi.pratama@mining.co.id', 3),
      ('Dewi', 'Lestari', 'CFO', 'Dewi Lestari adalah profesional keuangan dengan pengalaman 12 tahun di industri pertambangan. Beliau bertanggung jawab atas manajemen keuangan perusahaan.', '/images/team/cfo.jpg', 'linkedin.com/in/dewilestari', 'dewi.lestari@mining.co.id', 4),
      ('Eko', 'Wibowo', 'VP Engineering', 'Eko Wibowo adalah insinyur pertambangan senior dengan pengalaman 18 tahun di berbagai proyek pertambangan.', '/images/team/vp-engineering.jpg', 'linkedin.com/in/ekowibowo', 'eko.wibowo@mining.co.id', 5)
      ON CONFLICT DO NOTHING;
    `);

    // Seed Testimonials
    console.log('Seeding testimonials...');
    await query(`
      INSERT INTO testimonials (name, role, company, content, rating, image, featured) VALUES
      ('John Smith', 'Project Director', 'Global Mining Corp', 'Kerjasama dengan perusahaan ini sangat profesional. Tim mereka sangat berpengalaman dan proyek selesai tepat waktu dengan kualitas yang excellent.', 5, '/images/testimonials/john-smith.jpg', true),
      ('Maria Garcia', 'Operations Manager', 'Mineral Resources Ltd', 'Layanan pertambangan yang mereka berikan sangat komprehensif. Dari eksplorasi hingga produksi, semuanya ditangani dengan sangat baik.', 5, '/images/testimonials/maria-garcia.jpg', true),
      ('Tanaka Kenji', 'CEO', 'Asia Pacific Mining', 'Kami telah bekerja sama selama 5 tahun dan selalu puas dengan hasilnya. Standar keamanan dan kualitas mereka sangat tinggi.', 5, '/images/testimonials/tanaka-kenji.jpg', false),
      ('Sarah Johnson', 'Environmental Consultant', 'Green Earth Solutions', 'Sangat mengesankan! Perusahaan ini sangat memperhatikan aspek lingkungan dalam setiap operasional mereka.', 4, '/images/testimonials/sarah-johnson.jpg', false)
      ON CONFLICT DO NOTHING;
    `);

    // Seed Articles
    console.log('Seeding articles...');
    const categoryResult = await query("SELECT id FROM categories WHERE slug = 'berita' LIMIT 1");
    const categoryId = categoryResult.rows[0]?.id;

    if (categoryId) {
      await query(`
        INSERT INTO articles (title, slug, excerpt, content, featured_image, category_id, status, published_at) VALUES
        ('Inovasi Teknologi dalam Industri Pertambangan', 'inovasi-teknologi-dalam-industri-pertambangan', 'Teknologi terbaru mengubah cara kita melakukan pertambangan dengan lebih efisien dan ramah lingkungan.', 'Industri pertambangan terus bertransformasi dengan adopsi teknologi terbaru. Dari penggunaan AI untuk analisis data geologi hingga otomatisasi alat berat, inovasi ini meningkatkan efisiensi dan mengurangi dampak lingkungan. Artikel ini membahas berbagai teknologi yang sedang mengubah wajah industri pertambangan di Indonesia dan dunia.', '/images/articles/tech-innovation.jpg', $1, 'published', NOW()),
        ('Tren Pasar Mineral Global 2024', 'tren-pasar-mineral-global-2024', 'Analisis mendalam tentang tren pasar mineral global dan dampaknya bagi Indonesia.', 'Pasar mineral global mengalami perubahan signifikan pada tahun 2024. Permintaan untuk mineral strategis seperti litium, kobalt, dan nikel terus meningkat seiring dengan perkembangan industri kendaraan listrik. Artikel ini menganalisis tren pasar dan peluang bagi Indonesia sebagai produsen mineral penting.', '/images/articles/market-trends.jpg', $1, 'published', NOW()),
        ('Keberlanjutan dalam Pertambangan: Tantangan dan Peluang', 'keberlanjutan-dalam-pertambangan-tantangan-dan-peluang', 'Bagaimana industri pertambangan dapat beroperasi secara berkelanjutan?', 'Keberlanjutan menjadi fokus utama industri pertambangan modern. Perusahaan harus menyeimbangkan kebutuhan produksi dengan perlindungan lingkungan dan kesejahteraan masyarakat. Artikel ini membahas berbagai strategi dan inisiatif keberlanjutan yang diterapkan oleh perusahaan pertambangan terkemuka.', '/images/articles/sustainability.jpg', $1, 'published', NOW())
        ON CONFLICT (slug) DO NOTHING;
      `, [categoryId]);
    }

    // Seed Settings
    console.log('Seeding settings...');
    await query(`
      INSERT INTO settings (key, value, description) VALUES
      ('site_name', 'PT Mining Indonesia', 'Nama website'),
      ('site_description', 'Perusahaan pertambangan terkemuka di Indonesia', 'Deskripsi website'),
      ('contact_email', 'info@mining.co.id', 'Email kontak'),
      ('contact_phone', '+62 21 1234 5678', 'Nomor telepon kontak'),
      ('contact_address', 'Jl. Sudirman No. 123, Jakarta, Indonesia', 'Alamat kantor'),
      ('social_facebook', 'https://facebook.com/miningindonesia', 'URL Facebook'),
      ('social_twitter', 'https://twitter.com/miningindonesia', 'URL Twitter'),
      ('social_linkedin', 'https://linkedin.com/company/miningindonesia', 'URL LinkedIn'),
      ('social_instagram', 'https://instagram.com/miningindonesia', 'URL Instagram')
      ON CONFLICT (key) DO NOTHING;
    `);

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Database seeding failed:', error);
    throw error;
  }
};

/**
 * Run this function to seed the database
 */
if (require.main === module) {
  seedDatabase()
    .then(() => {
      console.log('Seeding completed. Exiting...');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seeding failed:', error);
      process.exit(1);
    });
}